package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllMarks 		godoc
// @Summary			Get All marks.
// @Description		Return list of marks.
// @Tags			marks
// @Success			200  "Marks successfully recovered."
// @Router			/marks [get]
func GetMarks(c *gin.Context) {
	var Marks []models.Mark

	if result := db.DB.Table("mark").Find(&Marks); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Marks)
}
