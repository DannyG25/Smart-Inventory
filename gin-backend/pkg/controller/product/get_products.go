package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllProducts 		godoc
// @Summary			Get All products.
// @Description		Return list of products.
// @Tags			products
// @Success			200  "Products successfully recovered."
// @Router			/products [get]
func GetProducts(c *gin.Context) {
	var Products []models.Product

	if result := db.DB.Preload("Category").Preload("Tax").Preload("Unit_measure").Find(&Products); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Products)
}
