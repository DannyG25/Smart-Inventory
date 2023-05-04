package models

import "gorm.io/gorm"

type Device struct {
	gorm.Model
	Dev_antenna       string
	Company_id        *uint
	Movement_id       *uint
	Inventory_details []Inventory_detail
	Binnacles         []Binnacle
}
