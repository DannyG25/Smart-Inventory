package models

import "gorm.io/gorm"

type Tax struct {
	gorm.Model
	Tax_name string
	Tax_rate float32
	Products []Product
}
