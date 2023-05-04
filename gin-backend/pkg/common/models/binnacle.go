package models

import (
	"gorm.io/gorm"
)

type Binnacle struct {
	gorm.Model
	Bin_lenght      float64
	Bin_latitude    float64
	Bin_description string
	Device_id       uint
}
