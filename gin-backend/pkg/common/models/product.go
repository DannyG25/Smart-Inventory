package models

import (
	"time"
)

type Product struct {
	Pro_id              int
	Pro_name            string
	Pro_description     string
	Pro_price           int
	Pro_photo           string
	Pro_experydate      time.Time
	Mark_mar_id         Mark
	Category_cat_id     Category
	Tax_tax_id          Tax
	Unit_measure_uni_id Unit_Measure
	Product_pro_id      *Product
}
