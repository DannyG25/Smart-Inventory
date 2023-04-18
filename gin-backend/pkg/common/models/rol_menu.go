package models

import "gorm.io/gorm"

type Rol_menu struct {
	gorm.Model
	Rol_id  uint
	Menu_id uint
}
