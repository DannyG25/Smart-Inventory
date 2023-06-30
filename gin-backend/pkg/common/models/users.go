package models

import "gorm.io/gorm"

type Users struct {
	gorm.Model
	User_username       string
	User_password       string
	User_identification string
	User_names          string
	User_lastnames      string
	User_address        string
	User_phone          string
	Company_id          *uint
	Rol_id              *uint
	Inventory_headers   []Inventory_header
	Employees           []Transaction
	Beneficiary         []Transaction
	Company             *Company
}
