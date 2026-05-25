import type { BehanceVisualItem, DrawingItem, LocalizedDictionary, WorkItem } from "@seis/content";

type PortfolioDiscoveryFlowProps = {
  dictionary: LocalizedDictionary;
  behanceVisuals: BehanceVisualItem[];
  drawings: DrawingItem[];
  works: WorkItem[];
  compact?: boolean;
};

type FlowLane = {
  id: "behance" | "drawings" | "works";
  title: string;
  summary: string;
  href: string;
  metric: string;
  visuals: Array<{ id: string; title: string; image?: string }>;
};

export function PortfolioDiscoveryFlow({
  dictionary,
  behanceVisuals,
  drawings,
  works,
  compact = false
}: PortfolioDiscoveryFlowProps) {
  const featuredBehance = behanceVisuals.filter((item) => item.featured).slice(0, compact ? 3 : 4);
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, compact ? 3 : 4);
  const featuredWorks = works.slice(0, 3);
  const lanes: FlowLane[] = [
    {
      id: "behance",
      title: dictionary.behanceVisualsTitle,
      summary: dictionary.portfolioFlowBehanceLead,
      href: "/portfolio",
      metric: `${behanceVisuals.length} Behance`,
      visuals: featuredBehance.map((item) => ({ id: item.id, title: item.title, image: item.image }))
    },
    {
      id: "drawings",
      title: dictionary.drawingsTitle,
      summary: dictionary.portfolioFlowDrawingsLead,
      href: "/drawings",
      metric: `${drawings.length} ${dictionary.portfolioSourceDrawing}`,
      visuals: featuredDrawings.map((drawing) => ({ id: drawing.id, title: drawing.title, image: drawing.src }))
    },
    {
      id: "works",
      title: dictionary.worksTitle,
      summary: dictionary.portfolioFlowWorksLead,
      href: "/portfolio",
      metric: `${works.length} ${dictionary.portfolioSourceWork}`,
      visuals: featuredWorks.map((work) => ({ id: work.id, title: work.title }))
    }
  ];

  return (
    <section className="portfolio-flow" data-compact={compact} aria-labelledby="portfolio-flow-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{dictionary.portfolioFlowEyebrow}</p>
          <h2 id="portfolio-flow-title">{dictionary.portfolioFlowTitle}</h2>
        </div>
        <p>{dictionary.portfolioFlowLead}</p>
      </div>

      <div className="portfolio-flow-grid">
        {lanes.map((lane, index) => (
          <article className="portfolio-flow-card" data-lane={lane.id} key={lane.id}>
            <div className="portfolio-flow-card-head">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{lane.metric}</small>
            </div>
            <div className="portfolio-flow-visuals" aria-hidden="true">
              {lane.visuals.map((visual) => (
                visual.image ? (
                  <img src={visual.image} alt="" loading="lazy" decoding="async" key={visual.id} />
                ) : (
                  <span className="portfolio-flow-monogram" key={visual.id}>{visual.title.slice(0, 2)}</span>
                )
              ))}
            </div>
            <div className="portfolio-flow-copy">
              <h3>{lane.title}</h3>
              <p>{lane.summary}</p>
              <a className="text-link" href={lane.href}>{dictionary.portfolioFlowAction}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
