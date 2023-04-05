package models

type Mark struct {
	Mar_id   int
	Mar_name string
}

func (Mark) TableNameMark() string {
	return "mark"
}
