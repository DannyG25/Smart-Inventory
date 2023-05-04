package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateCategoryBody struct {
	Id       uint
	Cat_name string
}

// UpdateCategories		godoc
// @Summary			Update categories
// @Description		Update categories data.
// @Param			categories body UpdateCategoryBody{} true  "Update tags"
// @Tags			categories
// @Produce			application/json
// @Success			200 {object} UpdateCategoryBody{} "Category updated successfully."
// @Router			/categories [put]
func UpdateCategory(c *gin.Context) {

	body := UpdateCategoryBody{}
	category := models.Category{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&category); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	category.Cat_name = body.Cat_name

	if err := db.DB.Where("id", category.ID).Updates(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &category)
	}

}
