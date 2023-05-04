package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteCategories		godoc
// @Summary			Delete categories
// @Param			id path string true "get categorys by id"
// @Description		Remove categories data by id.
// @Produce			application/json
// @Tags		    categories
// @Success			200  "Category successfully erased."
// @Router			/categories/{id} [delete]
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")

	var Category models.Category

	if result := db.DB.First(&Category, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Category).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
