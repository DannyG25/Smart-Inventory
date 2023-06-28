package inventory

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdInventories		godoc
// @Summary				Get Single Inventoriesby id.
// @Param				id path string true "get inventories by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			inventories
// @Success				200  "Inventory found successfully."
// @Router				/inventories/{id} [get]
func GetInventory(c *gin.Context) {
	id := c.Param("id")

	var Inventory models.Inventory_header

	if result := db.DB.Preload("Users").Preload("Inventory_details.Product.Category").Preload("Inventory_details.Product.Tax").Preload("Company").Where("id  = ?", id).First(&Inventory); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Inventory)
}
