package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	Tran_date           time.Time
	Tran_Total          float32
	Device_id           uint
	Users_id            uint
	Users2_id           uint
	Transaction_details []Transaction_detail
}
