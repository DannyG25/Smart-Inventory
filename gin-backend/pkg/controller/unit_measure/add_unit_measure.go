package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddUnit_MeasureBody struct {
	Uni_measure      string
	Uni_abbreviation string
}

// CreateUnit_Measures		godoc
// @Summary			Create unit_measures
// @Description		Save unit_measures data in Db.
// @Param			unit_measures body AddUnit_MeasureBody{} true "Create unit_measures"
// @Produce			application/json
// @Tags			unit_measures
// @Success			200 {object} AddUnit_MeasureBody{} "successfully created unit_measure."
// @Router			/unit_measures [post]
func AddUnit_Measure(c *gin.Context) {
	body := AddUnit_MeasureBody{}
	var Unit_Measure models.Unit_measure

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	Unit_Measure.Uni_measure = body.Uni_measure
	Unit_Measure.Uni_abbreviation = body.Uni_abbreviation

	// Insertion of new record
	if result := db.DB.Create(&Unit_Measure); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
