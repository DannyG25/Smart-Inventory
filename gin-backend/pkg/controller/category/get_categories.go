package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllCategories		godoc
// @Summary			Get All categories.
// @Description		Return list of categories.
// @Tags			categories
// @Success			200 {obejct} models.Category "Categories successfully recovered."
// @Router			/categories [get]
func GetCategories(c *gin.Context) {
	var Categorys []models.Category

	if result := db.DB.Table("category").Find(&Categorys); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Categorys)
}
