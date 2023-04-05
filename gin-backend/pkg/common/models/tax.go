package models

type Tax struct {
	Tax_id   int
	Tax_name string
	Tax_rate float32
}

func (Tax) TableNameTax() string {
	return "Tax"
}
