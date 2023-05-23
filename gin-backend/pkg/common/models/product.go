package models

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Pro_name            string
	Pro_description     string
	Pro_price           float32
	Pro_photo           string
	Pro_experydate      time.Time
	Pro_marca           string
	Category_id         *uint
	Tax_id              *uint
	UnitMeasure_id      *uint
	ProductID           *uint
	Children_pro        []*Product
	Parent_pro          *Product
	Company_details     []Company_detail
	Inventory_details   []Inventory_detail
	Transaction_details []Transaction_detail

	Category     *Category
	Tax          *Tax
	Unit_measure *Unit_measure
}
