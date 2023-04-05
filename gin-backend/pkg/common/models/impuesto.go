package models

type Impuesto struct {
	Imp_id     int
	Imp_nombre string
	Imp_tasa   float32
}

func (Impuesto) TableNameImpuesto() string {
	return "impuesto"
}
