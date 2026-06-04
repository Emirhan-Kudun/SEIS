# SEIS Plugin Source Rollout Policy

- Generated: 2026-06-03
- Unique plugins: 300
- Rollout policy plugins: 300
- Rollout gate records: 2100
- Blocked until auth plugins: 280
- Session-runtime rollout plugins: 20
- Pull request required plugins: 300
- Environment gate required plugins: 300
- Auto promotion allowed plugins: 0
- Credential commit allowed plugins: 0
- Vendor payload commit allowed plugins: 0
- Runtime payload commit allowed plugins: 0

## Rollout State

| state | plugins |
| --- | ---: |
| blocked_until_authenticated_task_scope | 280 |
| session_runtime_ready_for_scoped_task | 20 |

## Rollout Targets

| target | plugins |
| --- | ---: |
| authenticated_connector_runtime | 138 |
| current_session_runtime | 20 |
| local_skill_or_mcp_runtime | 142 |

## Plugins

| # | plugin | lane | rollout | target | publish |
| ---: | --- | --- | --- | --- | --- |
| 1 | base44 | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 2 | wix | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 3 | fal | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 4 | picsart | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 5 | posthog | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 6 | nvidia | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 7 | lovable | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 8 | replit | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 9 | shutterstock | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 10 | convex | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 11 | hg-insights | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 12 | rox | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 13 | calendly | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 14 | clay | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 15 | thoughtspot | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 16 | meticulate | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 17 | apollo | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 18 | mixpanel-headless | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 19 | close | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 20 | mixpanel | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 21 | docusign | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 22 | zoominfo | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 23 | datasite | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 24 | similarweb | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 25 | zoom | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 26 | datadog | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 27 | asana | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 28 | openai-developers | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 29 | twilio-developer-kit | platform-native-and-polyglot | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 30 | codex-security | security-quality-and-governance | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 31 | supabase | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 32 | heygen | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 33 | hyperframes | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 34 | temporal | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 35 | render | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 36 | yepcode | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 37 | windsor-ai | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 38 | waldo | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 39 | vantage | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 40 | streak | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 41 | statsig | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 42 | skywatch | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 43 | signnow | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 44 | semrush | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 45 | responsive | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 46 | readwise | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 47 | read-ai | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 48 | razorpay | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 49 | ranked-ai | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 50 | quicknode | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 51 | quartr | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 52 | pylon | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 53 | policynote | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 54 | pitchbook | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 55 | particl-market-research | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 56 | otter-ai | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 57 | omni-analytics | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 58 | network-solutions | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 59 | mt-newswires | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 60 | motherduck | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 61 | moody-s | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 62 | monday-com | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 63 | mem | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 64 | marcopolo | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 65 | keybid-puls | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 66 | hubspot | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 67 | hostinger | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 68 | highlevel | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 69 | help-scout | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 70 | happenstance | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 71 | granola | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 72 | fyxer | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 73 | govtribe | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 74 | fireflies | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 75 | egnyte | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 76 | circleback | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 77 | channel99 | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 78 | cb-insights | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 79 | carta-crm | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 80 | brex | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 81 | brand24 | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 82 | biorender | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 83 | binance | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 84 | attio | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 85 | alpaca | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 86 | plugin-eval | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 87 | remotion | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 88 | neon-postgres | backend-data-and-api | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 89 | coderabbit | security-quality-and-governance | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 90 | expo | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 91 | zotero | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 92 | life-science-research | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 93 | test-android-apps | platform-native-and-polyglot | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 94 | build-web-data-visualization | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 95 | build-web-apps | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 96 | build-macos-apps | platform-native-and-polyglot | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 97 | build-ios-apps | platform-native-and-polyglot | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 98 | sentry | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 99 | cloudflare | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 100 | notion | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 101 | deepnote | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 102 | google-drive | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 103 | circleci | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 104 | github | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 105 | box | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 106 | superpowers | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 107 | game-studio | builder-and-prototyping | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 108 | vercel | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 109 | netlify | cloud-devops-and-release | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 110 | jam | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 111 | hugging-face | specialized-domain-and-research | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 112 | figma | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 113 | canva | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 114 | outlook-email | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 115 | gmail | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 116 | slack | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 117 | google-calendar | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 118 | linear | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 119 | atlassian-rovo | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 120 | azure-sdk-rust | cloud-devops-and-release | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 121 | azure-sdk-java | cloud-devops-and-release | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 122 | azure-sdk-dotnet | cloud-devops-and-release | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 123 | azure-sdk-python | cloud-devops-and-release | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 124 | deep-wiki | ai-workflow-docs-and-knowledge | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 125 | codex | ai-workflow-docs-and-knowledge | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 126 | zscaler | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 127 | zoominfo | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 128 | zoom-plugin | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 129 | zilliz | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 130 | zapier | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 131 | workos | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 132 | windsor-ai | analytics-observability-and-growth | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 133 | vercel | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 134 | ui5-typescript-conversion | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 135 | ui5 | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 136 | twilio-developer-kit | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 137 | togetherai-skills | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 138 | terraform | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 139 | teamcity-cli | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 140 | superpowers | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 141 | supabase | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 142 | sumup | finance-investing-and-payments | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 143 | stripe | finance-investing-and-payments | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 144 | sonatype-guide | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 145 | sourcegraph | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 146 | sonarqube | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 147 | snowflake-cortex-code | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 148 | slack | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 149 | skill-creator | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 150 | serena | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 151 | sentry-cli | analytics-observability-and-growth | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 152 | semgrep | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 153 | security-guidance | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 154 | sanity | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 155 | sagemaker-ai | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 156 | runway-api | creative-production-and-design | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 157 | rootly | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 158 | remember | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 159 | redis-development | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 160 | railway | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 161 | qt-development-skills | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 162 | qodo-skills | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 163 | prisma | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 164 | postman | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 165 | pr-review-toolkit | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 166 | posthog | analytics-observability-and-growth | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 167 | plugin-dev | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 168 | playwright | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 169 | planetscale | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 170 | playground | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 171 | oracle-ai-data-platform-workbench-spark-connectors | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 172 | nvidia-skills | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 173 | nightvision | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 174 | netlify-skills | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 175 | neon | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 176 | mongodb | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 177 | miro | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 178 | microsoft-docs | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 179 | mercadopago | finance-investing-and-payments | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 180 | mcp-tunnels | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 181 | mcp-server-dev | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 182 | mcp-apps | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 183 | math-olympiad | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 184 | mapbox | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 185 | logfire | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 186 | liquid-skills | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 187 | liquid-lsp | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 188 | linear | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 189 | legalzoom | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 190 | learning-output-style | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 191 | laravel-boost | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 192 | intercom | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 193 | imessage | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 194 | hunter | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 195 | huggingface-skills | specialized-domain-and-research | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 196 | hookify | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 197 | greptile | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 198 | gitlab | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 199 | github | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 200 | frontend-design | creative-production-and-design | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 201 | firebase | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 202 | forge-skills | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 203 | figma | creative-production-and-design | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 204 | feature-dev | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 205 | fastly-agent-toolkit | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 206 | fakechat | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 207 | expo | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 208 | explanatory-output-style | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 209 | duckdb-skills | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 210 | dominodatalab | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 211 | discord | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 212 | deploy-on-aws | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 213 | dataverse | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 214 | datarobot-agent-skills | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 215 | datahub-skills | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 216 | datadog | analytics-observability-and-growth | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 217 | databases-on-aws | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 218 | data-agent-kit-starter-pack | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 219 | cwc-makers | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 220 | crowdstrike-falcon-foundry | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 221 | convex | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 222 | context7 | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 223 | commit-commands | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 224 | coderabbit | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 225 | code-simplifier | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 226 | cloudinary | creative-production-and-design | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 227 | code-modernization | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 228 | cloudflare | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 229 | cloud-sql-postgresql | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 230 | clickhouse | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 231 | claude-md-management | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 232 | claude-code-setup | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 233 | circleback | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 234 | cds-mcp | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 235 | buildkite | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 236 | brightdata-plugin | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 237 | box | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 238 | bigdata-com | finance-investing-and-payments | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 239 | base44 | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 240 | azure | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 241 | aws-serverless | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 242 | aws-dev-toolkit | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 243 | aws-core | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 244 | aws-amplify | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 245 | aws-agents | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 246 | auth0 | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 247 | atomic-agents | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 248 | atlassian | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 249 | atlan | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 250 | asana | collaboration-calendar-and-support | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 251 | appwrite | builder-and-prototyping | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 252 | apollo-skills | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 253 | apollo | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 254 | amplitude | analytics-observability-and-growth | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 255 | amazon-location-service | platform-native-and-polyglot | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 256 | alloydb | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 257 | airtable | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 258 | aikido | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 259 | ai-plugins | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 260 | agentforce-adlc | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 261 | agent-sdk-dev | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 262 | adobe-for-creativity | creative-production-and-design | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 263 | 42crunch-api-security-testing | security-quality-and-governance | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 264 | azure | cloud-devops-and-release | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 265 | adobe-cja | analytics-observability-and-growth | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 266 | adobe-analytics | analytics-observability-and-growth | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 267 | aem-6-5-lts | specialized-domain-and-research | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 268 | aem-cloud-service | specialized-domain-and-research | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 269 | aem-edge-delivery-services | specialized-domain-and-research | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 270 | stardust | builder-and-prototyping | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 271 | adobe-for-creativity | creative-production-and-design | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 272 | latex | specialized-domain-and-research | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 273 | chrome | ai-workflow-docs-and-knowledge | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 274 | browser | ai-workflow-docs-and-knowledge | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 275 | presentations | collaboration-calendar-and-support | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 276 | spreadsheets | collaboration-calendar-and-support | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 277 | documents | collaboration-calendar-and-support | session_runtime_ready_for_scoped_task | current_session_runtime | pull_request_environment_gate_and_generated_checks_required |
| 278 | pinecone | backend-data-and-api | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 279 | pigment | finance-investing-and-payments | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 280 | pagerduty | cloud-devops-and-release | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 281 | outputai | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | local_skill_or_mcp_runtime | pull_request_environment_gate_and_generated_checks_required |
| 282 | dow-jones-factiva | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 283 | dovetail | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 284 | domotz-preview | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 285 | docket | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 286 | demandbase | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 287 | daloopa | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 288 | coveo | ai-workflow-docs-and-knowledge | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 289 | cube | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 290 | coupler-io | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 291 | conductor | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 292 | common-room | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 293 | cloudinary | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 294 | clickup | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 295 | public-equity-investing | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 296 | product-design | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 297 | investment-banking | finance-investing-and-payments | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 298 | creative-production | creative-production-and-design | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 299 | sales | sales-gtm-and-market-intelligence | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |
| 300 | data-analytics | analytics-observability-and-growth | blocked_until_authenticated_task_scope | authenticated_connector_runtime | pull_request_environment_gate_and_generated_checks_required |

## Governance

- Plugin source rollout is separated from acquisition so downloaded or cached sources are not automatically promoted.
- Every submitted plugin requires task scope, generated checks, pull-request review, and an environment gate before live use.
- Rollback stays commit-based and manifest-based; no vendor payloads, runtime logs, or credentials are materialized in the repo.
