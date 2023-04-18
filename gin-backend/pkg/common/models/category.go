package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Cat_name string
	Products []Product
}
