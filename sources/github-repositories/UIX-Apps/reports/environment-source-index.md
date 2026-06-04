# SEIS Environment Source Index

- Generated: 2026-06-03
- Indexed sources: 24
- Visible sources: 24
- Validation commands: 24
- Plugins: 300
- Full-stack languages: 108
- External sources bound: 300
- Cached plugins: 299
- Missing cache plugins: 1
- Runtime available plugins: 300
- Runtime surfaces: 7
- Activation gate plugins: 300
- Account auth gated plugins: 280
- Observability plugins: 300
- Account-scoped audit plugins: 280
- Execution pipeline plugins: 300
- Execution pipeline stage records: 3000
- Execution pipeline blocked-until-auth plugins: 280
- Source acquisition plan plugins: 300
- Source acquisition phase records: 2400
- Source acquisition manifest download plugins: 300
- Source materialization plan plugins: 300
- Source materialization step records: 2100
- Source materialization repo-allowed plugins: 0
- Source materialization live-download allowed plugins: 0
- Source connection matrix plugins: 300
- Source connection step records: 2100
- Source connection live-connection allowed plugins: 0
- Source connection external-data read allowed plugins: 0
- AI assistance orchestration plugins: 300
- AI assistance orchestration step records: 2100
- AI assistance live-AI invocation allowed plugins: 0
- AI assistance live-plugin invocation allowed plugins: 0
- Assisted development queue plugins: 300
- Assisted development action records: 1500
- Assisted development local-bounded ready plugins: 20
- Assisted development queued-until-auth plugins: 280
- Assisted sprint plan plugins: 300
- Assisted sprint waves: 4
- Assisted sprint lane plans: 12
- Assisted sprint phase records: 48
- Assisted execution ledger plugins: 300
- Assisted execution wave records: 4
- Assisted execution lane records: 12
- Assisted execution plugin records: 300
- Assisted action board plugins: 300
- Assisted action board ready cards: 20
- Assisted action board auth-blocked cards: 280
- Assisted action board gate records: 1500
- Assisted review matrix plugins: 300
- Assisted review matrix ready items: 20
- Assisted review matrix auth-blocked items: 280
- Assisted review matrix gate records: 2400
- Assisted risk register plugins: 300
- Assisted risk register controlled local items: 20
- Assisted risk register auth-blocked items: 280
- Assisted risk register control records: 2400
- Assisted publish gate ledger plugins: 300
- Assisted publish gate local candidates: 20
- Assisted publish gate auth-blocked items: 280
- Assisted publish gate records: 2400
- Source rollout policy plugins: 300
- Source rollout gate records: 2100
- Source rollout pull-request required plugins: 300
- Source compliance plugins: 300
- Source compliance coverage records: 6300
- Source compliance full-coverage plugins: 300

## Sources

| key | contract | report | check | visibility |
| --- | --- | --- | --- | --- |
| submittedPluginInventory | content/development/requested-plugin-inventory.json | reports/requested-plugin-trace.json | npm run check:plugin-environment-sources | all_submitted_plugin_uris |
| submittedPluginCapabilityLanes | content/development/plugin-capability-lanes.json | reports/plugin-capability-lanes.json | npm run check:plugin-capability-lanes | plugin_lanes_and_remote_plugin_groups |
| pluginDownloadReadiness | content/development/plugin-download-readiness.json | reports/plugin-download-readiness.json | npm run check:plugin-download-readiness | download_install_and_use_readiness |
| pluginCacheEvidence | content/development/plugin-cache-evidence.json | reports/plugin-cache-evidence.json | npm run check:plugin-cache-evidence | local_plugin_cache_and_download_evidence |
| pluginRuntimeAvailability | content/development/plugin-runtime-availability.json | reports/plugin-runtime-availability.json | npm run check:plugin-runtime-availability | runtime_callable_surface_and_auth_scope_manifest |
| pluginActivationGates | content/development/plugin-activation-gates.json | reports/plugin-activation-gates.json | npm run check:plugin-activation-gates | task_scoped_activation_and_auth_gate_manifest |
| pluginObservabilityReadiness | content/development/plugin-observability-readiness.json | reports/plugin-observability-readiness.json | npm run check:plugin-observability-readiness | audit_trace_health_and_monitoring_manifest |
| pluginExecutionPipeline | content/development/plugin-execution-pipeline.json | reports/plugin-execution-pipeline.json | npm run check:plugin-execution-pipeline | task_scoped_execution_pipeline_manifest |
| pluginSourceAcquisitionPlan | content/development/plugin-source-acquisition-plan.json | reports/plugin-source-acquisition-plan.json | npm run check:plugin-source-acquisition-plan | manifest_download_and_cache_acquisition_plan |
| pluginSourceMaterializationPlan | content/development/plugin-source-materialization-plan.json | reports/plugin-source-materialization-plan.json | npm run check:plugin-source-materialization-plan | safe_plugin_source_materialization_and_connection_plan |
| pluginSourceConnectionMatrix | content/development/plugin-source-connection-matrix.json | reports/plugin-source-connection-matrix.json | npm run check:plugin-source-connection-matrix | scoped_plugin_connection_and_access_matrix |
| pluginAiAssistanceOrchestration | content/development/plugin-ai-assistance-orchestration.json | reports/plugin-ai-assistance-orchestration.json | npm run check:plugin-ai-assistance-orchestration | multi_ai_plugin_assistance_orchestration_plan |
| pluginAssistedDevelopmentQueue | content/development/plugin-assisted-development-queue.json | reports/plugin-assisted-development-queue.json | npm run check:plugin-assisted-development-queue | all_connected_plugin_assisted_development_queue |
| pluginAssistedSprintPlan | content/development/plugin-assisted-sprint-plan.json | reports/plugin-assisted-sprint-plan.json | npm run check:plugin-assisted-sprint-plan | all_connected_plugin_sprint_wave_plan |
| pluginAssistedExecutionLedger | content/development/plugin-assisted-execution-ledger.json | reports/plugin-assisted-execution-ledger.json | npm run check:plugin-assisted-execution-ledger | all_connected_plugin_execution_ledger |
| pluginAssistedActionBoard | content/development/plugin-assisted-action-board.json | reports/plugin-assisted-action-board.json | npm run check:plugin-assisted-action-board | all_connected_plugin_action_board |
| pluginAssistedReviewMatrix | content/development/plugin-assisted-review-matrix.json | reports/plugin-assisted-review-matrix.json | npm run check:plugin-assisted-review-matrix | all_connected_plugin_review_matrix |
| pluginAssistedRiskRegister | content/development/plugin-assisted-risk-register.json | reports/plugin-assisted-risk-register.json | npm run check:plugin-assisted-risk-register | all_connected_plugin_risk_register |
| pluginAssistedPublishGateLedger | content/development/plugin-assisted-publish-gate-ledger.json | reports/plugin-assisted-publish-gate-ledger.json | npm run check:plugin-assisted-publish-gate-ledger | all_connected_plugin_publish_gate_ledger |
| pluginSourceRolloutPolicy | content/development/plugin-source-rollout-policy.json | reports/plugin-source-rollout-policy.json | npm run check:plugin-source-rollout-policy | reviewed_plugin_source_rollout_policy |
| pluginSourceComplianceEvidence | content/development/plugin-source-compliance-evidence.json | reports/plugin-source-compliance-evidence.json | npm run check:plugin-source-compliance-evidence | generated_plugin_source_compliance_evidence |
| externalSourceBindings | content/development/external-source-bindings.json | reports/external-source-bindings.json | npm run check:external-source-bindings | external_connection_and_download_manifest |
| requestedSoftwareStack | content/development/requested-software-stack.json | reports/requested-software-stack.json | npm run check:requested-software-stack | requested_core_fullstack_stack |
| fullstackLanguageMatrix | content/development/fullstack-language-matrix.json | reports/fullstack-language-matrix.json | npm run check:fullstack-language-matrix | all_fullstack_language_surfaces |

## Governance

- Environment source visibility is indexed from generated contracts instead of chat text.
- Each indexed source points to its contract, report, and validation command.
- The index summarizes full-stack language coverage and plugin external-source readiness without duplicating every payload.
