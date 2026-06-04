struct ReadinessSignal {
    let lane: String
    let status: String
    let score: Int
}

func buildReadinessSignal() -> ReadinessSignal {
    ReadinessSignal(lane: "swift", status: "reference", score: 72)
}
