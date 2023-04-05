package mark

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddMarkBody struct {
	models.Mark
}

// CreateMarks		godoc
// @Summary			Create marks
// @Description		Save marks data in Db.
// @Param			marks body AddMarkBody{} true "Create marks"
// @Produce			application/json
// @Tags			marks
// @Success			200 {object} models.Mark "successfully created mark."
// @Router			/marks [post]
func Addmark(c *gin.Context) {
	body := AddMarkBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// retrieve last id
	var lastRecord models.Mark
	err := db.DB.Table("mark").Last(&lastRecord).Error
	if err != nil {
		body.Mar_id = 1
	} else {
		body.Mar_id = lastRecord.Mar_id + 1
	}

	// Insertion of new record
	if result := db.DB.Table("mark").Create(&body); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
