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
// @Success			200  "Unit_Measure successfully erased."
// @Router			/unit_measures/{id} [delete]
func DeleteUnit_Measure(c *gin.Context) {
	id := c.Param("id")

	var Unit_Measure models.Unit_measure

	if result := db.DB.First(&Unit_Measure, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Unit_Measure).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
