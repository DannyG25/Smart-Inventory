package models

import "gorm.io/gorm"

type Users struct {
	gorm.Model
	User_username       string
	User_password       string
	User_identification int
	User_names          string
	User_lastnames      string
	User_address        string
	User_phone          int
	Company_id          *uint
	Users_Rols          []Users_Rol
	Inventory_headers   []Inventory_header
	Employees           []Transaction
	Beneficiary         []Transaction
}
