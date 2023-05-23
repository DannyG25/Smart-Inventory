package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateUnit_MeasureBody struct {
	Id               uint
	Uni_measure      string
	Uni_abbreviation string
}

// UpdateUnit_Measures		godoc
// @Summary			Update unit_measures
// @Description		Update unit_measures data.
// @Param			unit_measures body UpdateUnit_MeasureBody{} true  "Update tags"
// @Tags			unit_measures
// @Produce			application/json
// @Success			200 {object} UpdateUnit_MeasureBody "Unit_Measure updated successfully."
// @Router			/unit_measures [put]
func UpdateUnit_Measure(c *gin.Context) {

	body := UpdateUnit_MeasureBody{}
	var Unit_Measure models.Unit_measure

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&Unit_Measure); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	Unit_Measure.Uni_measure = body.Uni_measure
	Unit_Measure.Uni_abbreviation = body.Uni_abbreviation

	if err := db.DB.Where("id", Unit_Measure.ID).Updates(&Unit_Measure).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &body)
	}

}
