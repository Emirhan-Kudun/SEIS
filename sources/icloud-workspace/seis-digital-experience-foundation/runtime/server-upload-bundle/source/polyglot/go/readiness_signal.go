package main

type ReadinessSignal struct {
	Lane   string `json:"lane"`
	Status string `json:"status"`
	Score  int    `json:"score"`
}

func BuildReadinessSignal() ReadinessSignal {
	return ReadinessSignal{Lane: "go", Status: "reference", Score: 72}
}
