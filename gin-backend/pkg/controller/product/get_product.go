package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdProducts 		godoc
// @Summary				Get Single Products by id.
// @Param				id path string true "get products by id"
// @Description			Return the product whose productId value matches id.
// @Produce				application/json
// @Tags			products
// @Success				200  "Product found successfully."
// @Router				/products/{id} [get]
func GetProduct(c *gin.Context) {
	id := c.Param("id")

	var Product models.Product
	var children []*models.Product

	if result := db.DB.Preload("Company_details.Inventory_details.Transaction_details").Where("id  = ?", id).First(&Product); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Model(&Product).Association("Children_pro ").Find(&children); err != nil {
		// manejar error
	}

	Product.Children_pro = children

	c.JSON(http.StatusOK, &Product)
}
