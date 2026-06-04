namespace Seis.Polyglot;

public sealed record SeisReleaseGate(string Name, bool IsPassing)
{
    public string Status => IsPassing ? "ready" : "watch";
}

