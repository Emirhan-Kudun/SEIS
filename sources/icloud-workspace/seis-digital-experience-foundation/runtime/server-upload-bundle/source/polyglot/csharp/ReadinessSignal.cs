namespace UIXApps.Polyglot;

public sealed record ReadinessSignal(int LanguageCount, bool RemoteBlocked)
{
    public bool Ok => LanguageCount >= 12;

    public string Status => RemoteBlocked
        ? "ready-with-blocker"
        : Ok ? "ready" : "needs-work";
}
