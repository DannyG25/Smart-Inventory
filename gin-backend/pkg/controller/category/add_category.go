package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddCategoryBody struct {
	Cat_name string
}

// CreateCategorys		godoc
// @Summary			Create categories
// @Description		Save categories data in Db.
// @Param			categories body AddCategoryBody{} true "Create categorys"
// @Produce			application/json
// @Tags			categories
// @Success			200 {object} AddCategoryBody{} "successfully created category."
// @Router			/categories [post]
func AddCategory(c *gin.Context) {
	body := AddCategoryBody{}
	var Category models.Category
	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record

	Category.Cat_name = body.Cat_name

	if result := db.DB.Create(&Category); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
