package device

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateDeviceBody struct {
	Id          uint
	Dev_antenna string
	Company_id  *uint
	Movement_id *uint
}

// UpdateDevices		godoc
// @Summary			Update devices
// @Description		Update devices data .
// @Param			devices body AddDeviceBody{} true "Create devices"
// @Produce			application/json
// @Tags			devices
// @Success			200 {object} AddDeviceBody{} "successfully created device."
// @Router			/devices [put]
func UpdateDevice(c *gin.Context) {
	body := UpdateDeviceBody{}
	devices := models.Device{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&devices); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	devices.Dev_antenna = body.Dev_antenna
	devices.Company_id = body.Company_id
	devices.Movement_id = body.Movement_id

	if err := db.DB.Where("id", devices.ID).Updates(&devices).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &devices)
	}
}
