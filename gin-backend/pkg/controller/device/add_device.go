package device

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddDeviceBody struct {
	Dev_antenna string
	Company_id  *uint
	Movement_id *uint
	Binnacles   []models.Binnacle
}

// CreateDevices	godoc
// @Summary			Create devices
// @Description		Save devices data in Db.
// @Param			devices body AddDeviceBody{} true "Create devices"
// @Produce			application/json
// @Tags			devices
// @Success			200 {object} AddDeviceBody{} "successfully created device."
// @Router			/devices [post]
func AddDevice(c *gin.Context) {
	body := AddDeviceBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// // retrieve last id
	// var lastRecord models.Device
	// err := db.DB.Table("device").Last(&lastRecord).Error
	// if err != nil {
	// 	body.Comp_id = 1
	// } else {
	// 	body.Comp_id = lastRecord.Comp_id + 1
	// }

	// // Look up the supervisor in the database if an ID was provided
	// if body.Comp_comp != nil && body.Comp_comp.Comp_id != 0 {
	// 	var supervisor models.Device
	// 	if err := db.DB.Preload("Comp_comp").First(&supervisor, body.Comp_comp.Comp_id); err.Error != nil {
	// 		c.AbortWithError(http.StatusNotFound, err.Error)
	// 		return
	// 	}
	// 	body.Comp_comp = &supervisor
	// } else {
	// 	body.Comp_comp = nil
	// }

	// Insertion of new record
	var Device models.Device
	Device.Dev_antenna = body.Dev_antenna
	Device.Binnacles = body.Binnacles
	Device.Company_id = body.Company_id
	Device.Movement_id = body.Movement_id

	if result := db.DB.Create(&Device); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
