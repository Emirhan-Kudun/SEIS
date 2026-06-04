data class ReadinessSignal(
    val lane: String,
    val status: String,
    val score: Int
)

fun buildReadinessSignal(): ReadinessSignal {
    return ReadinessSignal(lane = "kotlin", status = "reference", score = 72)
}
