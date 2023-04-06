package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateMarkBody struct {
	models.Mark
}

// UpdateMarks		godoc
// @Summary			Update marks
// @Description		Update marks data.
// @Param			marks body UpdateMarkBody{} true  "Update tags"
// @Tags			marks
// @Produce			application/json
// @Success			200 {object} models.Mark "Mark updated successfully."
// @Router			/marks [put]
func UpdateMark(c *gin.Context) {

	body := UpdateMarkBody{}
	marks := models.Mark{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Table("mark").Where("mar_id", body.Mar_id).First(&marks); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Table("mark").Model(&body).Where("mar_id", body.Mar_id).Updates(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &body)
	}

}
