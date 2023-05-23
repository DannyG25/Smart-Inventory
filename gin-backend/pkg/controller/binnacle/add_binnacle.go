package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddBinnacleBody struct {
	Bin_lenght      float64
	Bin_latitude    float64
	Bin_description string
	Device_id       uint
}

// CreateBinnacles	godoc
// @Summary			Create binnacles
// @Description		Save binnacles data in Db.
// @Param			binnacles body AddBinnacleBody{} true "Create binnacles"
// @Produce			application/json
// @Tags			binnacles
// @Success			200 {object} AddBinnacleBody{} "successfully created binnacle."
// @Router			/binnacles [post]
func AddBinnacle(c *gin.Context) {
	body := AddBinnacleBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record
	var Binnacle models.Binnacle
	Binnacle.Bin_description = body.Bin_description
	Binnacle.Bin_latitude = body.Bin_latitude
	Binnacle.Bin_lenght = body.Bin_lenght
	Binnacle.Device_id = body.Device_id

	if result := db.DB.Create(&Binnacle); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
