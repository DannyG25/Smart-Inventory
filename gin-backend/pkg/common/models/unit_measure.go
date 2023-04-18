package models

import "gorm.io/gorm"

type Unit_measure struct {
	gorm.Model
	Uni_measure      string
	Uni_abbreviation string
	Products         []Product
}
