from dataclasses import dataclass


@dataclass(frozen=True)
class ReadinessSignal:
    language_count: int
    remote_blocked: bool

    @property
    def status(self) -> str:
        if self.remote_blocked:
            return "ready-with-blocker"
        return "ready" if self.language_count >= 12 else "needs-work"


def build_signal(language_count: int = 14, remote_blocked: bool = True) -> dict[str, object]:
    signal = ReadinessSignal(language_count=language_count, remote_blocked=remote_blocked)
    return {
        "ok": language_count >= 12,
        "status": signal.status,
        "languageCount": language_count,
    }


if __name__ == "__main__":
    print(build_signal())
