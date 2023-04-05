package mark

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteMarks		godoc
// @Summary			Delete marks
// @Param			id path string true "get marks by id"
// @Description		Remove marks data by id.
// @Produce			application/json
// @Tags		    marks
// @Success			200 {object} models.Mark "Mark successfully erased."
// @Router			/marks/{id} [delete]
func DeleteMark(c *gin.Context) {
	id := c.Param("id")

	var Mark models.Mark

	if result := db.DB.Table("mark").Where("mar_id", id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Table("mark").Model(&Mark).Where("mar_id", id).Delete(&Mark).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
