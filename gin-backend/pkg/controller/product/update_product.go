package product

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateProductBody struct {
	Id              uint
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

// UpdateProducts		godoc
// @Summary			Update products
// @Description		Update products data.
// @Param			products body UpdateProductBody{} true  "Update tags"
// @Tags			products
// @Produce			application/json
// @Success			200 {object} UpdateProductBody "Product updated successfully."
// @Router			/products [put]
func UpdateProduct(c *gin.Context) {

	body := UpdateProductBody{}
	var Product models.Product

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&Product); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
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

	if err := db.DB.Where("id", Product.ID).Updates(&Product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &Product)
	}

}
