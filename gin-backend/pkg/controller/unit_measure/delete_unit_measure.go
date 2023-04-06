package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteUnit_Measures		godoc
// @Summary			Delete unit_measures
// @Param			id path string true "get unit_measures by id"
// @Description		Remove unit_measures data by id.
// @Produce			application/json
// @Tags		    unit_measures
// @Success			200 {object} models.Unit_Measure "Unit_Measure successfully erased."
// @Router			/unit_measures/{id} [delete]
func DeleteUnit_Measure(c *gin.Context) {
	id := c.Param("id")

	var Unit_Measure models.Unit_Measure

	if result := db.DB.Table("unit_measure").Where("uni_id", id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Table("unit_measure").Model(&Unit_Measure).Where("uni_id", id).Delete(&Unit_Measure).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
