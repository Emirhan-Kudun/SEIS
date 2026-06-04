import type {
  DigitalLabAudience,
  DigitalLabCapability,
  DigitalLabCopy,
  DigitalLabEngagement,
  DigitalLabSurface,
  DigitalLabWorkflowStep
} from "@seis/content";

type DigitalLabMatrixProps = {
  copy: DigitalLabCopy;
  surfaces: DigitalLabSurface[];
  capabilities: DigitalLabCapability[];
  workflow: DigitalLabWorkflowStep[];
  audiences?: DigitalLabAudience[];
  engagements?: DigitalLabEngagement[];
};

export function DigitalLabMatrix({
  copy,
  surfaces,
  capabilities,
  workflow,
  audiences = [],
  engagements = []
}: DigitalLabMatrixProps) {
  return (
    <div className="digital-lab-matrix">
      <div className="section-heading digital-lab-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
        </div>
        <p>{copy.lead}</p>
      </div>

      <div className="digital-lab-layout">
        <section className="digital-lab-panel" aria-labelledby="digital-lab-surfaces">
          <div className="panel-heading">
            <p className="kicker">01 / Surface map</p>
            <h3 id="digital-lab-surfaces">{copy.surfacesLabel}</h3>
          </div>
          <div className="surface-list">
            {surfaces.map((surface) => (
              <article className="surface-card" key={surface.id}>
                <h4>{surface.label}</h4>
                <p>{surface.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="digital-lab-panel" aria-labelledby="digital-lab-capabilities">
          <div className="panel-heading">
            <p className="kicker">02 / Capability stack</p>
            <h3 id="digital-lab-capabilities">{copy.capabilitiesLabel}</h3>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.id}>
                <span>{capability.stage}</span>
                <h4>{capability.title}</h4>
                <p>{capability.summary}</p>
                <ul aria-label={`${capability.title} signals`}>
                  {capability.signals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="digital-lab-workflow" aria-labelledby="digital-lab-workflow">
        <div className="panel-heading">
          <p className="kicker">03 / Workflow</p>
          <h3 id="digital-lab-workflow">{copy.workflowLabel}</h3>
        </div>
        <ol>
          {workflow.map((step) => (
            <li key={step.id}>
              <strong>{step.label}</strong>
              <span>{step.summary}</span>
            </li>
          ))}
        </ol>
      </section>

      {audiences.length > 0 && (
        <section className="digital-lab-audiences" aria-labelledby="digital-lab-audiences">
          <div className="panel-heading">
            <p className="kicker">04 / Product fit</p>
            <h3 id="digital-lab-audiences">{copy.audiencesLabel}</h3>
          </div>
          <div className="audience-grid">
            {audiences.map((audience) => (
              <article className="audience-card" key={audience.id}>
                <p className="kicker">{audience.name}</p>
                <h4>{audience.need}</h4>
                <p>{audience.labResponse}</p>
                <ul aria-label={`${audience.name} deliverables`}>
                  {audience.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {engagements.length > 0 && (
        <section className="digital-lab-engagements" aria-labelledby="digital-lab-engagements">
          <div className="panel-heading">
            <p className="kicker">05 / Engagement</p>
            <h3 id="digital-lab-engagements">{copy.engagementsLabel}</h3>
          </div>
          <div className="engagement-grid">
            {engagements.map((engagement) => (
              <article className="engagement-card" key={engagement.id}>
                <span>{engagement.pace}</span>
                <h4>{engagement.title}</h4>
                <p>{engagement.bestFor}</p>
                <ul aria-label={`${engagement.title} scope`}>
                  {engagement.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <strong>{engagement.qualityGate}</strong>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
