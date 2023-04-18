package mark

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateMarkBody struct {
	Id       int
	Mar_name string
}

// UpdateMarks		godoc
// @Summary			Update marks
// @Description		Update marks data.
// @Param			marks body UpdateMarkBody{} true  "Update marks"
// @Tags			marks
// @Produce			application/json
// @Success			200 {object} UpdateMarkBody{} "Mark updated successfully."
// @Router			/marks [put]
func UpdateMark(c *gin.Context) {

	body := UpdateMarkBody{}
	marks := models.Mark{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&marks); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	marks.ID = uint(body.Id)
	marks.Mar_name = body.Mar_name

	if err := db.DB.Where("id", marks.ID).Updates(&marks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &marks)
	}

}
