package models

import "gorm.io/gorm"

type Mark struct {
	gorm.Model
	Mar_name string
	Products []Product
}
