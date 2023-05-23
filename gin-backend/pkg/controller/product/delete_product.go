package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteProducts		godoc
// @Summary			Delete products
// @Param			id path string true "get products by id"
// @Description		Remove products data by id.
// @Produce			application/json
// @Tags		    products
// @Success			200  "Product successfully erased."
// @Router			/products/{id} [delete]
func DeleteProduct(c *gin.Context) {
	id := c.Param("id")

	var Product models.Product

	if result := db.DB.First(&Product, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Delete(&Product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
