package models

import "gorm.io/gorm"

type Company_detail struct {
	gorm.Model
	Comp_det_stock         int
	Comp_det_maximum_mount int
	Comp_det_minimun_moun  int
	Product_id             *uint
	Company_id             *uint
	Product                *Product
	Company                *Company
}
