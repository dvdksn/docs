#!/usr/bin/env bash
#
# sync-upstream.sh — fetch vendored content from upstream repos at pinned versions.
# Replaces Hugo module vendoring for the Astro Starlight migration.
#
# Usage:
#   ./scripts/sync-upstream.sh              # sync all repos
#   ./scripts/sync-upstream.sh moby/buildkit # sync one repo
#
# Reads upstream-versions.json for repo refs and mount mappings.
# Requires: git, jq

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VERSIONS_FILE="$PROJECT_ROOT/upstream-versions.json"
WORK_DIR="$PROJECT_ROOT/.upstream-cache"

if ! command -v jq &>/dev/null; then
  echo "error: jq is required. Install it with: apt-get install jq / brew install jq" >&2
  exit 1
fi

if [[ ! -f "$VERSIONS_FILE" ]]; then
  echo "error: $VERSIONS_FILE not found" >&2
  exit 1
fi

FILTER_REPO="${1:-}"

# Read repo list from JSON
REPOS=$(jq -r '.repos | keys[]' "$VERSIONS_FILE")

sync_repo() {
  local repo="$1"
  local ref
  ref=$(jq -r ".repos[\"$repo\"].ref" "$VERSIONS_FILE")
  local clone_dir="$WORK_DIR/$repo"

  echo "==> $repo @ $ref"

  # Clean previous cache for this repo
  rm -rf "$clone_dir"
  mkdir -p "$clone_dir"

  # Determine sparse paths to fetch
  local sparse_paths
  sparse_paths=$(jq -r ".repos[\"$repo\"].sparse[]" "$VERSIONS_FILE")

  # Clone with sparse checkout for efficiency
  git clone \
    --quiet \
    --depth 1 \
    --branch "$ref" \
    --filter=blob:none \
    --sparse \
    "https://github.com/$repo.git" \
    "$clone_dir" 2>/dev/null || {
      # Some repos use submodule-style tags (e.g., api/v1.54.1)
      echo "    retrying with full clone at ref $ref..."
      rm -rf "$clone_dir"
      mkdir -p "$clone_dir"
      git clone --quiet --depth 1 --filter=blob:none --sparse \
        "https://github.com/$repo.git" "$clone_dir"
      cd "$clone_dir"
      git fetch --quiet --depth 1 origin "$ref"
      git checkout --quiet FETCH_HEAD
      cd "$PROJECT_ROOT"
    }

  # Set up sparse checkout
  cd "$clone_dir"
  for sp in $sparse_paths; do
    git sparse-checkout add "$sp" 2>/dev/null || true
  done
  cd "$PROJECT_ROOT"

  # Process mounts
  local mount_count
  mount_count=$(jq ".repos[\"$repo\"].mounts | length" "$VERSIONS_FILE")

  for ((i = 0; i < mount_count; i++)); do
    local source target include exclude
    source=$(jq -r ".repos[\"$repo\"].mounts[$i].source" "$VERSIONS_FILE")
    target=$(jq -r ".repos[\"$repo\"].mounts[$i].target" "$VERSIONS_FILE")
    include=$(jq -r ".repos[\"$repo\"].mounts[$i].include // empty" "$VERSIONS_FILE")
    exclude=$(jq -r ".repos[\"$repo\"].mounts[$i].exclude // [] | .[]" "$VERSIONS_FILE")

    local src_path="$clone_dir/$source"
    local dst_path="$PROJECT_ROOT/$target"

    if [[ ! -e "$src_path" ]]; then
      echo "    WARN: source not found: $source"
      continue
    fi

    if [[ -f "$src_path" ]]; then
      # Single file mount
      mkdir -p "$(dirname "$dst_path")"
      cp "$src_path" "$dst_path"
      echo "    $source -> $target"
    elif [[ -d "$src_path" ]]; then
      # Directory mount
      mkdir -p "$dst_path"
      local files_copied=0

      for f in "$src_path"/*; do
        [[ -f "$f" ]] || continue
        local basename
        basename=$(basename "$f")

        # Apply include filter
        if [[ -n "$include" ]]; then
          case "$basename" in
            ${include}) ;; # matches glob
            *) continue ;;
          esac
        fi

        # Apply exclude filter
        local skip=false
        for ex in $exclude; do
          if [[ "$basename" == "$ex" ]]; then
            skip=true
            break
          fi
        done
        if $skip; then
          echo "    skip (excluded): $basename"
          continue
        fi

        cp "$f" "$dst_path/$basename"
        files_copied=$((files_copied + 1))
      done

      echo "    $source/ -> $target/ ($files_copied files)"
    fi
  done

  echo ""
}

# Main
echo "Syncing upstream content..."
echo "Config: $VERSIONS_FILE"
echo ""

for repo in $REPOS; do
  if [[ -n "$FILTER_REPO" && "$repo" != "$FILTER_REPO" ]]; then
    continue
  fi
  sync_repo "$repo"
done

echo "Done. Review changes with: git diff --stat"
