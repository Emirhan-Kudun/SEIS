#include <string>

struct SeisMissionGate {
  std::string name;
  bool checksPassing;
  bool credentialsReady;
};

std::string statusFor(const SeisMissionGate& gate) {
  if (!gate.checksPassing) {
    return "blocked";
  }
  return gate.credentialsReady ? "ready" : "watch";
}

