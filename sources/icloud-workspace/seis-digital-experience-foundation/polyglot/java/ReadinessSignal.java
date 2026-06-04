public final class ReadinessSignal {
    private final int languageCount;
    private final boolean remoteBlocked;

    public ReadinessSignal(int languageCount, boolean remoteBlocked) {
        this.languageCount = languageCount;
        this.remoteBlocked = remoteBlocked;
    }

    public boolean ok() {
        return languageCount >= 12;
    }

    public String status() {
        if (remoteBlocked) {
            return "ready-with-blocker";
        }
        return ok() ? "ready" : "needs-work";
    }
}
