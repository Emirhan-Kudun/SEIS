import { contactQa, siteMeta, socialLinks, type LocalizedDictionary } from "@seis/content";

type ContactHubProps = {
  dictionary: LocalizedDictionary;
};

export function ContactHub({ dictionary }: ContactHubProps) {
  const behanceLink = socialLinks.find((link) => link.id === "behance");
  const directLinks = [
    {
      id: "email",
      href: `mailto:${siteMeta.email}`,
      title: siteMeta.email,
      detail: `${siteMeta.city}, ${siteMeta.country}`,
      external: false
    },
    behanceLink ? {
      id: behanceLink.id,
      href: behanceLink.href,
      title: behanceLink.label,
      detail: dictionary.behanceVisualsEyebrow,
      external: true
    } : null,
    {
      id: "brief",
      href: "#brief-form",
      title: dictionary.briefTitle,
      detail: dictionary.briefReady,
      external: false
    }
  ].filter(Boolean) as Array<{
    id: string;
    href: string;
    title: string;
    detail: string;
    external: boolean;
  }>;

  return (
    <div className="contact-hub">
      <div className="contact-direct">
        <p className="eyebrow">{dictionary.contactDirectEyebrow}</p>
        <h3 className="contact-direct-title">{siteMeta.city}, {siteMeta.country}</h3>
        <p className="contact-direct-lead">{dictionary.briefReady}</p>
        <div className="contact-direct-actions">
          <a className="primary-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          <a className="secondary-link" href="#brief-form">{dictionary.briefTitle}</a>
        </div>
        <ul className="contact-direct-grid" aria-label={dictionary.contactTitle}>
          {directLinks.map((item) => (
            <li key={item.id}>
              <a
                className="contact-direct-card"
                href={item.href}
                rel={item.external ? "noopener noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
                aria-label={item.external ? `${item.title}. ${dictionary.externalLinkLabel}` : item.title}
              >
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
                {item.external ? <span className="sr-only">{dictionary.externalLinkLabel}</span> : null}
              </a>
            </li>
          ))}
        </ul>
        <div className="social-block" aria-label={dictionary.socialTitle}>
          <h3>{dictionary.socialTitle}</h3>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a
                className="social-icon-link"
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={link.href.startsWith("mailto:") ? link.label : `${link.label}. ${dictionary.externalLinkLabel}`}
                key={link.id}
              >
                <span className="social-mark" aria-hidden="true">{link.mark}</span>
                <span>{link.label}</span>
                {!link.href.startsWith("mailto:") ? <span className="sr-only">{dictionary.externalLinkLabel}</span> : null}
              </a>
            ))}
          </div>
        </div>
      </div>
      <section className="qa-panel" aria-label={dictionary.qaTitle}>
        <p className="eyebrow">Q&A</p>
        <h3>{dictionary.qaTitle}</h3>
        <p>{dictionary.qaLead}</p>
        <div className="qa-list" role="list">
          {contactQa.map((item, index) => (
            <details className="qa-card" key={item.id} open={index === 0} name="contact-qa">
              <summary>
                <span>{item.question}</span>
                <span className="qa-toggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
