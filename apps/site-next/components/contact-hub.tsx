import { contactQa, siteMeta, socialLinks, type LocalizedDictionary } from "@seis/content";

type ContactHubProps = {
  dictionary: LocalizedDictionary;
};

export function ContactHub({ dictionary }: ContactHubProps) {
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
        <div className="social-block" aria-label={dictionary.socialTitle}>
          <h3>{dictionary.socialTitle}</h3>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a className="social-icon-link" href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" key={link.id}>
                <span className="social-mark" aria-hidden="true">{link.mark}</span>
                <span>{link.label}</span>
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
            <details className="qa-card" key={item.id} open={index === 0}>
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
