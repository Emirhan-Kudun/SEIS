from dataclasses import dataclass


@dataclass(frozen=True)
class SeisPreflight:
    branch: str
    checks_passed: bool
    credentials_ready: bool

    def status(self) -> str:
        if not self.checks_passed:
            return "blocked"
        return "ready" if self.credentials_ready else "watch"

