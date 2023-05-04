package device

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteDevices		godoc
// @Summary			Delete devices
// @Param			id path string true "get devices by id"
// @Description		Remove devices data by id.
// @Produce			application/json
// @Tags		    devices
// @Success			200  "Device successfully erased."
// @Router			/devices/{id} [delete]
func DeleteDevice(c *gin.Context) {
	id := c.Param("id")

	var Device models.Device

	if result := db.DB.Preload("Binnacles").First(&Device, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Device).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Unscoped().Delete(&Device.Binnacles).Error; err != nil {

	}

	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Device).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
