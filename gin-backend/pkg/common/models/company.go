package models

import "gorm.io/gorm"

type Company struct {
	gorm.Model
	Comp_name         string
	Comp_address      string
	Comp_phone        int
	Comp_ruc          int
	Comp_mail         string
	CompanyID         *int
	Children_comp     []Company
	Parent_comp       *Company
	Company_details   []Company_detail
	Devices           []Device
	Users             []Users
	Inventory_headers []Inventory_header
}
