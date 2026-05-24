import { getDecisionQuestionCount, getDecisionQuestionPreview } from "@seis/content/decision-questions";

export function DecisionQuestionsPanel() {
  const previewQuestions = getDecisionQuestionPreview(12);

  return (
    <section className="ops-block decision-panel" aria-label="Decision questions">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Decision Ledger / 100 Questions</p>
          <h2>Kararlar kaybolmasin diye soru sistemi artik kodda.</h2>
        </div>
        <p>
          Toplam {getDecisionQuestionCount()} soru API, docs ve UI tarafinda saklanir. Netlestikce cevaplar brief,
          icerik ve deployment kararlarina donusebilir.
        </p>
      </div>
      <div className="question-grid">
        {previewQuestions.map((item, index) => (
          <article className="question-card" key={`${item.groupId}-${item.question}`}>
            <p className="kicker">{String(index + 1).padStart(2, "0")} / {item.groupTitle}</p>
            <h3>{item.question}</h3>
          </article>
        ))}
      </div>
      <a className="secondary-link" href="/api/decision-questions">/api/decision-questions</a>
    </section>
  );
}
