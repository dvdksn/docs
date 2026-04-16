/**
 * Site-wide version constants.
 * Extracted from hugo.yaml params — used by the <Version> component.
 *
 * In Hugo content these were accessed with {{% param "key" %}}.
 * In MDX they become <Version name="key" />.
 */
export const versions: Record<string, string> = {
  // Docker Engine
  latest_engine_api_version: "1.54",
  docker_ce_version: "29.4.0",
  docker_ce_version_prev: "29.3.1",

  // Compose & BuildKit
  compose_version: "v5.1.2",
  buildkit_version: "0.28.0",

  // GitHub Actions
  bake_action_version: "v7",
  build_push_action_version: "v7",
  login_action_version: "v4",
  metadata_action_version: "v6",
  setup_buildx_action_version: "v4",
  setup_compose_action_version: "v2",
  setup_docker_action_version: "v5",
  setup_qemu_action_version: "v4",
  github_builder_version: "v1",
  checkout_action_version: "v6",
  cache_action_version: "v5",

  // Example runtime versions
  example_go_version: "1.25",
  example_alpine_version: "3.23",
  example_node_version: "24",
};
