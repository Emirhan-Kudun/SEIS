# SEIS Plugin AI Assistance Orchestration

- Generated: 2026-06-03
- Unique plugins: 300
- Assistant orchestration plugins: 300
- AI helper count: 8
- Orchestration step records: 2100
- All plugins assigned helpers: 300
- Multi-assistant review plugins: 300
- Task scope required plugins: 300
- Human review required plugins: 300
- Live AI invocation allowed plugins: 0
- Live plugin invocation allowed plugins: 0
- Autonomous AI action allowed plugins: 0
- Prompt payload recording plugins: 0
- AI output auto-commit plugins: 0

## AI Helpers

| helper | role | availability | invocation policy |
| --- | --- | --- | --- |
| codex | local_repo_executor | current_session_runtime | not_invoked_by_source_generation |
| claude | architecture_and_review_partner | configured_external_ai_helper_reference | requires_explicit_task_scope |
| gemini | cross_model_reviewer | configured_external_ai_helper_reference | requires_explicit_task_scope |
| openai | product_and_api_reasoning_partner | configured_external_ai_helper_reference | requires_explicit_task_scope |
| cortex | data_governance_and_analytics_partner | configured_reference_connection_required | requires_snowflake_connection |
| local-skill-runtime | installed_skill_reference | local_skill_manifest_reference | not_invoked_by_source_generation |
| plugin-runtime-router | connector_and_mcp_surface_router | runtime_surface_manifest_reference | requires_authenticated_connector_scope |
| human-review | approval_and_acceptance_gate | always_required | manual_review_required |

## Plugins

| # | plugin | lane | role | helpers | state |
| ---: | --- | --- | --- | --- | --- |
| 1 | base44 | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 2 | wix | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 3 | fal | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 4 | picsart | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 5 | posthog | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 6 | nvidia | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 7 | lovable | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 8 | replit | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 9 | shutterstock | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 10 | convex | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 11 | hg-insights | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 12 | rox | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 13 | calendly | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 14 | clay | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 15 | thoughtspot | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 16 | meticulate | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 17 | apollo | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 18 | mixpanel-headless | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 19 | close | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 20 | mixpanel | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 21 | docusign | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 22 | zoominfo | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 23 | datasite | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 24 | similarweb | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 25 | zoom | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 26 | datadog | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 27 | asana | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 28 | openai-developers | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 29 | twilio-developer-kit | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 30 | codex-security | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 31 | supabase | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 32 | heygen | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 33 | hyperframes | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 34 | temporal | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 35 | render | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 36 | yepcode | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 37 | windsor-ai | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 38 | waldo | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 39 | vantage | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 40 | streak | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 41 | statsig | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 42 | skywatch | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 43 | signnow | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 44 | semrush | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 45 | responsive | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 46 | readwise | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 47 | read-ai | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 48 | razorpay | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 49 | ranked-ai | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 50 | quicknode | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 51 | quartr | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 52 | pylon | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 53 | policynote | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 54 | pitchbook | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 55 | particl-market-research | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 56 | otter-ai | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 57 | omni-analytics | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 58 | network-solutions | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 59 | mt-newswires | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 60 | motherduck | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 61 | moody-s | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 62 | monday-com | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 63 | mem | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 64 | marcopolo | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 65 | keybid-puls | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 66 | hubspot | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 67 | hostinger | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 68 | highlevel | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 69 | help-scout | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 70 | happenstance | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 71 | granola | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 72 | fyxer | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 73 | govtribe | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 74 | fireflies | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 75 | egnyte | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 76 | circleback | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 77 | channel99 | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 78 | cb-insights | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 79 | carta-crm | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 80 | brex | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 81 | brand24 | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 82 | biorender | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 83 | binance | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 84 | attio | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 85 | alpaca | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 86 | plugin-eval | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 87 | remotion | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 88 | neon-postgres | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 89 | coderabbit | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 90 | expo | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 91 | zotero | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 92 | life-science-research | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 93 | test-android-apps | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 94 | build-web-data-visualization | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 95 | build-web-apps | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 96 | build-macos-apps | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 97 | build-ios-apps | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 98 | sentry | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 99 | cloudflare | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 100 | notion | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 101 | deepnote | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 102 | google-drive | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 103 | circleci | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 104 | github | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 105 | box | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 106 | superpowers | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 107 | game-studio | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 108 | vercel | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 109 | netlify | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 110 | jam | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 111 | hugging-face | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 112 | figma | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 113 | canva | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 114 | outlook-email | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 115 | gmail | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 116 | slack | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 117 | google-calendar | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 118 | linear | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 119 | atlassian-rovo | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 120 | azure-sdk-rust | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | session_runtime_multi_assistant_reference_ready |
| 121 | azure-sdk-java | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | session_runtime_multi_assistant_reference_ready |
| 122 | azure-sdk-dotnet | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | session_runtime_multi_assistant_reference_ready |
| 123 | azure-sdk-python | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | session_runtime_multi_assistant_reference_ready |
| 124 | deep-wiki | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | session_runtime_multi_assistant_reference_ready |
| 125 | codex | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | session_runtime_multi_assistant_reference_ready |
| 126 | zscaler | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 127 | zoominfo | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 128 | zoom-plugin | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 129 | zilliz | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 130 | zapier | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 131 | workos | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 132 | windsor-ai | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 133 | vercel | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 134 | ui5-typescript-conversion | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 135 | ui5 | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 136 | twilio-developer-kit | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 137 | togetherai-skills | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 138 | terraform | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 139 | teamcity-cli | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 140 | superpowers | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 141 | supabase | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 142 | sumup | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 143 | stripe | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 144 | sonatype-guide | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 145 | sourcegraph | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 146 | sonarqube | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 147 | snowflake-cortex-code | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 148 | slack | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 149 | skill-creator | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 150 | serena | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 151 | sentry-cli | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 152 | semgrep | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 153 | security-guidance | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 154 | sanity | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 155 | sagemaker-ai | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 156 | runway-api | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 157 | rootly | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 158 | remember | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 159 | redis-development | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 160 | railway | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 161 | qt-development-skills | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 162 | qodo-skills | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 163 | prisma | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 164 | postman | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 165 | pr-review-toolkit | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 166 | posthog | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 167 | plugin-dev | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 168 | playwright | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 169 | planetscale | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 170 | playground | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 171 | oracle-ai-data-platform-workbench-spark-connectors | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 172 | nvidia-skills | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 173 | nightvision | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 174 | netlify-skills | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 175 | neon | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 176 | mongodb | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 177 | miro | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 178 | microsoft-docs | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 179 | mercadopago | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 180 | mcp-tunnels | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 181 | mcp-server-dev | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 182 | mcp-apps | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 183 | math-olympiad | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 184 | mapbox | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 185 | logfire | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 186 | liquid-skills | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 187 | liquid-lsp | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 188 | linear | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 189 | legalzoom | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 190 | learning-output-style | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 191 | laravel-boost | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 192 | intercom | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 193 | imessage | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 194 | hunter | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 195 | huggingface-skills | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 196 | hookify | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 197 | greptile | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 198 | gitlab | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 199 | github | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 200 | frontend-design | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 201 | firebase | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 202 | forge-skills | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 203 | figma | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 204 | feature-dev | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 205 | fastly-agent-toolkit | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 206 | fakechat | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 207 | expo | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 208 | explanatory-output-style | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 209 | duckdb-skills | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 210 | dominodatalab | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 211 | discord | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 212 | deploy-on-aws | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 213 | dataverse | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 214 | datarobot-agent-skills | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 215 | datahub-skills | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 216 | datadog | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 217 | databases-on-aws | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 218 | data-agent-kit-starter-pack | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 219 | cwc-makers | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 220 | crowdstrike-falcon-foundry | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 221 | convex | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 222 | context7 | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 223 | commit-commands | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 224 | coderabbit | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 225 | code-simplifier | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 226 | cloudinary | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 227 | code-modernization | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 228 | cloudflare | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 229 | cloud-sql-postgresql | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 230 | clickhouse | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 231 | claude-md-management | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 232 | claude-code-setup | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 233 | circleback | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 234 | cds-mcp | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 235 | buildkite | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 236 | brightdata-plugin | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 237 | box | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 238 | bigdata-com | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 239 | base44 | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 240 | azure | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 241 | aws-serverless | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 242 | aws-dev-toolkit | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 243 | aws-core | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 244 | aws-amplify | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 245 | aws-agents | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 246 | auth0 | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 247 | atomic-agents | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 248 | atlassian | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 249 | atlan | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 250 | asana | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 251 | appwrite | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | blocked_until_authenticated_multi_assistant_task_scope |
| 252 | apollo-skills | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 253 | apollo | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 254 | amplitude | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 255 | amazon-location-service | platform-native-and-polyglot | polyglot_runtime_reviewer | codex, claude, local-skill-runtime, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 256 | alloydb | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 257 | airtable | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 258 | aikido | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 259 | ai-plugins | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 260 | agentforce-adlc | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 261 | agent-sdk-dev | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 262 | adobe-for-creativity | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 263 | 42crunch-api-security-testing | security-quality-and-governance | security_governance_reviewer | codex, claude, gemini, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 264 | azure | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | session_runtime_multi_assistant_reference_ready |
| 265 | adobe-cja | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | session_runtime_multi_assistant_reference_ready |
| 266 | adobe-analytics | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | session_runtime_multi_assistant_reference_ready |
| 267 | aem-6-5-lts | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 268 | aem-cloud-service | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 269 | aem-edge-delivery-services | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 270 | stardust | builder-and-prototyping | product_builder_reviewer | codex, claude, gemini, openai | session_runtime_multi_assistant_reference_ready |
| 271 | adobe-for-creativity | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 272 | latex | specialized-domain-and-research | domain_research_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 273 | chrome | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | session_runtime_multi_assistant_reference_ready |
| 274 | browser | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | session_runtime_multi_assistant_reference_ready |
| 275 | presentations | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 276 | spreadsheets | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 277 | documents | collaboration-calendar-and-support | collaboration_workflow_reviewer | claude, gemini, openai, human-review | session_runtime_multi_assistant_reference_ready |
| 278 | pinecone | backend-data-and-api | backend_api_reviewer | codex, claude, cortex, local-skill-runtime | blocked_until_authenticated_multi_assistant_task_scope |
| 279 | pigment | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 280 | pagerduty | cloud-devops-and-release | cloud_release_reviewer | codex, cortex, claude, plugin-runtime-router | blocked_until_authenticated_multi_assistant_task_scope |
| 281 | outputai | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 282 | dow-jones-factiva | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 283 | dovetail | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 284 | domotz-preview | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 285 | docket | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 286 | demandbase | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 287 | daloopa | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 288 | coveo | ai-workflow-docs-and-knowledge | ai_workflow_knowledge_reviewer | codex, claude, gemini, cortex | blocked_until_authenticated_multi_assistant_task_scope |
| 289 | cube | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 290 | coupler-io | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 291 | conductor | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |
| 292 | common-room | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 293 | cloudinary | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 294 | clickup | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 295 | public-equity-investing | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 296 | product-design | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 297 | investment-banking | finance-investing-and-payments | research_compliance_reviewer | codex, claude, cortex, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 298 | creative-production | creative-production-and-design | creative_design_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 299 | sales | sales-gtm-and-market-intelligence | gtm_research_reviewer | claude, gemini, openai, human-review | blocked_until_authenticated_multi_assistant_task_scope |
| 300 | data-analytics | analytics-observability-and-growth | analytics_observability_reviewer | codex, cortex, claude, gemini | blocked_until_authenticated_multi_assistant_task_scope |

## Governance

- AI assistants are represented as advisory routing references, not as live model calls.
- Every submitted plugin receives a helper route so the environment sources panel can expose broad assistance coverage.
- Prompt payloads, credentials, connector results, and AI outputs remain uncommitted until explicit task scope and human review exist.
