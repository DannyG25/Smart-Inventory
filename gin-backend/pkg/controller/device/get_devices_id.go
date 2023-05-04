package device

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllDevices 		godoc
// @Summary			Get All devices.
// @Description		Return list of devices.
// @Tags			devices
// @Success			200  "Devices successfully recovered."
// @Router			/devices [get]
func GetDevicesID(c *gin.Context) {
	id := c.Param("id")
	var Devices []models.Device

	if result := db.DB.Where("company_id  = ?", id).Find(&Devices); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Devices)
}
