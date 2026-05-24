import { contactQa, siteMeta, socialLinks, type LocalizedDictionary } from "@seis/content";

type ContactHubProps = {
  dictionary: LocalizedDictionary;
};

export function ContactHub({ dictionary }: ContactHubProps) {
  return (
    <div className="contact-hub">
      <div className="contact-direct">
        <a className="primary-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
        <p>{dictionary.briefReady}</p>
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
      <div className="qa-panel" aria-label={dictionary.qaTitle}>
        <p className="eyebrow">Q&A</p>
        <h3>{dictionary.qaTitle}</h3>
        <p>{dictionary.qaLead}</p>
        <div className="qa-list">
          {contactQa.map((item) => (
            <article className="qa-card" key={item.id}>
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
