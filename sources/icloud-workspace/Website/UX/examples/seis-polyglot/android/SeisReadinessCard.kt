data class SeisReadinessState(
    val title: String,
    val status: String,
    val reducedMotion: Boolean = true
)

fun SeisReadinessState.accessibilityLabel(): String {
    val motion = if (reducedMotion) "reduced motion" else "standard motion"
    return "$title, $status, $motion"
}

