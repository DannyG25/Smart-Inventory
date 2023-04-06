package category

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddCategoryBody struct {
	models.Category
}

// CreateCategorys		godoc
// @Summary			Create categories
// @Description		Save categories data in Db.
// @Param			categories body AddCategoryBody{} true "Create categorys"
// @Produce			application/json
// @Tags			categories
// @Success			200 {object} models.Category "successfully created category."
// @Router			/categories [post]
func AddCategory(c *gin.Context) {
	body := AddCategoryBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// retrieve last id
	var lastRecord models.Category
	err := db.DB.Table("category").Last(&lastRecord).Error
	if err != nil {
		body.Cat_id = 1
	} else {
		body.Cat_id = lastRecord.Cat_id + 1
	}

	// Insertion of new record
	if result := db.DB.Table("category").Create(&body); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
