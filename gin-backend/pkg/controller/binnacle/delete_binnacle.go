package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteBinnacles		godoc
// @Summary			Delete binnacles
// @Param			id path string true "get binnacles by id"
// @Description		Remove binnacles data by id.
// @Produce			application/json
// @Tags		    binnacles
// @Success			200  "Binnacle successfully erased."
// @Router			/binnacles/{id} [delete]
func DeleteBinnacle(c *gin.Context) {
	id := c.Param("id")

	var Binnacle models.Binnacle

	if result := db.DB.First(&Binnacle, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Binancle).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Binnacle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
