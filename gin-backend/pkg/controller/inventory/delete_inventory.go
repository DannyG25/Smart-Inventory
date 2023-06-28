package inventory

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteInventories		godoc
// @Summary			Delete inventories
// @Param			id path string true "get inventories by id"
// @Description		Remove inventories data by id.
// @Produce			application/json
// @Tags		    inventories
// @Success			200  "Inventory successfully erased."
// @Router			/inventories/{id} [delete]
func DeleteInventory(c *gin.Context) {
	id := c.Param("id")

	var Inventory models.Inventory_header

	if result := db.DB.Preload("Inventory_details").First(&Inventory, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Inventory).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Delete(&Inventory.Inventory_details).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete records associate"})
		return
	}

	if err := db.DB.Where("id = ?", id).Delete(&Inventory).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
