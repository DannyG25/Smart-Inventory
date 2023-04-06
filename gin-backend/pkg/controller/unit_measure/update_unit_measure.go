package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateUnit_MeasureBody struct {
	models.Unit_Measure
}

// UpdateUnit_Measures		godoc
// @Summary			Update unit_measures
// @Description		Update unit_measures data.
// @Param			unit_measures body UpdateUnit_MeasureBody{} true  "Update tags"
// @Tags			unit_measures
// @Produce			application/json
// @Success			200 {object} models.Unit_Measure "Unit_Measure updated successfully."
// @Router			/unit_measures [put]
func UpdateUnit_Measure(c *gin.Context) {

	body := UpdateUnit_MeasureBody{}
	unit_measures := models.Unit_Measure{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Table("unit_measure").Where("uni_id", body.Uni_id).First(&unit_measures); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Table("unit_measure").Model(&body).Where("uni_id", body.Uni_id).Updates(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &body)
	}

}
