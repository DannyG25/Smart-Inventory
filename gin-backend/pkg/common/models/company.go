package models

import "gorm.io/gorm"

type Company struct {
	gorm.Model
	Comp_name         string
	Comp_address      string
	Comp_phone        string
	Comp_ruc          string
	Comp_mail         string
	CompanyID         *uint
	Children_comp     []*Company `gorm:"foreignKey:CompanyID"`
	Parent_comp       *Company
	Company_details   []Company_detail
	Devices           []Device
	Users             []Users
	Inventory_headers []Inventory_header
}
