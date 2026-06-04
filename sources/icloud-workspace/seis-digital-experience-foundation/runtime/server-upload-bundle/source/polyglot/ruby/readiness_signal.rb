ReadinessSignal = Struct.new(:lane, :status, :score, keyword_init: true)

def build_readiness_signal
  ReadinessSignal.new(lane: "ruby", status: "reference", score: 72)
end
