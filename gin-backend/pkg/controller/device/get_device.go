package device

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdDevices 		godoc
// @Summary				Get Single Devices by id.
// @Param				id path string true "get devices by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			devices
// @Success				200  "Device found successfully."
// @Router				/devices/{id} [get]
func GetDevice(c *gin.Context) {
	id := c.Param("id")

	var Device models.Device

	if result := db.DB.Preload("Inventory_details.Binnacles").Where("id  = ?", id).First(&Device); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Device)
}
