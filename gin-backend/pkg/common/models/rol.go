package models

import "gorm.io/gorm"

type Rol struct {
	gorm.Model
	Rol_name  string
	Rol_menus []Rol_menu
	Users     []Users
}
