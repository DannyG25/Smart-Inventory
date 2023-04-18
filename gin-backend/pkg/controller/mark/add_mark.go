package mark

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddMarkBody struct {
	Mar_name string
}

// CreateMarks		godoc
// @Summary			Create marks
// @Description		Save marks data in Db.
// @Param			marks body AddMarkBody{} true "Create marks"
// @Produce			application/json
// @Tags			marks
// @Success			200 {object} AddMarkBody{} "successfully created mark."
// @Router			/marks [post]
func AddMark(c *gin.Context) {
	body := AddMarkBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// // retrieve last id
	// var lastRecord models.Mark
	// err := db.DB.Table("mark").Last(&lastRecord).Error
	// if err != nil {
	// 	body.Mar_id = 1
	// } else {
	// 	body.Mar_id = lastRecord.Mar_id + 1
	// }

	// Insertion of new record
	var Mark models.Mark
	Mark.Mar_name = body.Mar_name
	if result := db.DB.Create(&Mark); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &Mark)
}
