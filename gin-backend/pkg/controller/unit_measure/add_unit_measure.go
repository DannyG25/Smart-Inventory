package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddUnit_MeasureBody struct {
	models.Unit_Measure
}

// CreateUnit_Measures		godoc
// @Summary			Create unit_measures
// @Description		Save unit_measures data in Db.
// @Param			unit_measures body AddUnit_MeasureBody{} true "Create unit_measures"
// @Produce			application/json
// @Tags			unit_measures
// @Success			200 {object} models.Unit_Measure "successfully created unit_measure."
// @Router			/unit_measures [post]
func AddUnit_Measure(c *gin.Context) {
	body := AddUnit_MeasureBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// retrieve last id
	var lastRecord models.Unit_Measure
	err := db.DB.Table("unit_measure").Last(&lastRecord).Error
	if err != nil {
		body.Uni_id = 1
	} else {
		body.Uni_id = lastRecord.Uni_id + 1
	}

	// Insertion of new record
	if result := db.DB.Table("unit_measure").Create(&body); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
