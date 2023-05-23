package product

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddProductBody struct {
	Pro_name        string
	Pro_description string
	Pro_price       float32
	Pro_photo       string
	Pro_experydate  time.Time
	Pro_marca       string
	Category_id     *uint
	Tax_id          *uint
	UnitMeasure_id  *uint
	ProductID       *uint
}

// CreateProducts	godoc
// @Summary			Create products
// @Description		Save products data in Db.
// @Param			products body AddProductBody{} true "Create products"
// @Produce			application/json
// @Tags			products
// @Success			200 {object} AddProductBody "successfully created product."
// @Router			/products [post]
func AddProduct(c *gin.Context) {
	body := AddProductBody{}
	var Product models.Product

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	Product.Pro_name = body.Pro_name
	Product.Pro_description = body.Pro_description
	Product.Pro_experydate = body.Pro_experydate
	Product.Pro_marca = body.Pro_marca
	Product.Pro_photo = body.Pro_photo
	Product.Pro_price = body.Pro_price
	Product.ProductID = body.ProductID
	Product.Category_id = body.Category_id
	Product.Tax_id = body.Tax_id
	Product.UnitMeasure_id = body.UnitMeasure_id

	// Insertion of new record
	if result := db.DB.Create(&Product); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
