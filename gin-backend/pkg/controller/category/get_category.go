package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdCategories 		godoc
// @Summary				Get Single Categories by id.
// @Param				id path string true "get categories by id"
// @Description			Return the category whose catId value matches id.
// @Produce				application/json
// @Tags			categories
// @Success				200 "Category found successfully."
// @Router				/categories/{id} [get]
func GetCategory(c *gin.Context) {
	id := c.Param("id")

	var Category models.Category

	if result := db.DB.Table("category").First(&Category, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Category)
}
