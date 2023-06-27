package models

import "gorm.io/gorm"

type Transaction_detail struct {
	gorm.Model
	Tran_det_mount    int
	Tran_det_subtotal float32
	Product_id        uint
	Transaction_id    uint
	Product           *Product
}
