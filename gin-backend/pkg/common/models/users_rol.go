package models

import "gorm.io/gorm"

type Users_Rol struct {
	gorm.Model
	Rol_id   uint
	Users_id uint
}
