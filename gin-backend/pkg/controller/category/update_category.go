package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateCategoryBody struct {
	models.Category
}

// UpdateCategories		godoc
// @Summary			Update categories
// @Description		Update categories data.
// @Param			categories body UpdateCategoryBody{} true  "Update tags"
// @Tags			categories
// @Produce			application/json
// @Success			200 {object} models.Category "Category updated successfully."
// @Router			/categories [put]
func UpdateCategory(c *gin.Context) {

	body := UpdateCategoryBody{}
	categories := models.Category{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Table("category").Where("cat_id", body.Cat_id).First(&categories); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Table("category").Model(&body).Where("cat_id", body.Cat_id).Updates(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &body)
	}

}
