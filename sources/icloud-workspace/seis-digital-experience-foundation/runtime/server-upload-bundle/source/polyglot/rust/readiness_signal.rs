pub struct ReadinessSignal {
    pub lane: &'static str,
    pub status: &'static str,
    pub score: u8,
}

pub fn build_readiness_signal() -> ReadinessSignal {
    ReadinessSignal {
        lane: "rust",
        status: "reference",
        score: 72,
    }
}
