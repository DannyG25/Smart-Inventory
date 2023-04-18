package models

import (
	"time"

	"gorm.io/gorm"
)

type Binnacle struct {
	gorm.Model
	Bin_date        time.Time
	Bin_lenght      float64
	Bin_latitude    float64
	Bin_description string
}
