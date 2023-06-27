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
	Users_id            uint `gorm:"foreignKey:Users"`
	Users2_id           uint `gorm:"foreignKey:Users2"`
	Transaction_details []Transaction_detail
	Users               *Users `gorm:"foreignKey:Users_id;references:ID"`
	Users2              *Users `gorm:"foreignKey:Users2_id;references:ID"`
}
