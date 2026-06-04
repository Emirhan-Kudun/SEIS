package seis

type HealthSignal struct {
	Name   string
	Status string
}

func Ready(signals []HealthSignal) bool {
	for _, signal := range signals {
		if signal.Status == "blocked" {
			return false
		}
	}
	return true
}

