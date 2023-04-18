package models

import "gorm.io/gorm"

type Menu struct {
	gorm.Model
	Men_Name     string
	Men_link     string
	MenuID       *uint
	Children_men []Menu
	Rol_menus    []Rol_menu
}
