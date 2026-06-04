#include <string>

struct ReadinessSignal {
  int languageCount;
  bool remoteBlocked;

  bool ok() const {
    return languageCount >= 12;
  }

  std::string status() const {
    if (remoteBlocked) {
      return "ready-with-blocker";
    }
    return ok() ? "ready" : "needs-work";
  }
};
