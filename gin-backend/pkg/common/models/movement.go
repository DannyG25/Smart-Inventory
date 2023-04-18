package models

import "gorm.io/gorm"

type Movement struct {
	gorm.Model
	Mov_type        string
	Mov_description string
	Devices         []Device
}
