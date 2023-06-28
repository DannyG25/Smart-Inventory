package models

import (
	"time"

	"gorm.io/gorm"
)

type Inventory_header struct {
	gorm.Model
	Inv_head_date     time.Time
	Company_id        uint
	Users_id          uint
	Inventory_details []Inventory_detail
	Company           *Company
	Users             *Users
}
