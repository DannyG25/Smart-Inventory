package movement

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteMovements		godoc
// @Summary			Delete movements
// @Param			id path string true "get movements by id"
// @Description		Remove movements data by id.
// @Produce			application/json
// @Tags		    movements
// @Success			200  "Movement successfully erased."
// @Router			/movements/{id} [delete]
func DeleteMovement(c *gin.Context) {
	id := c.Param("id")

	var Movement models.Movement

	if result := db.DB.First(&Movement, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Movement).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Movement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
