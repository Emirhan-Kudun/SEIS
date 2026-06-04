pub struct Guardrail<'a> {
    pub name: &'a str,
    pub active: bool,
}

pub fn passing_guardrails(guardrails: &[Guardrail]) -> usize {
    guardrails.iter().filter(|guardrail| guardrail.active).count()
}

