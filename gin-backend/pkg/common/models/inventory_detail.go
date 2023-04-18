package models

import "gorm.io/gorm"

type Inventory_detail struct {
	gorm.Model
	Inv_det_count       int
	Inventory_header_id uint
	Product_id          uint
	Device_id           uint
}
