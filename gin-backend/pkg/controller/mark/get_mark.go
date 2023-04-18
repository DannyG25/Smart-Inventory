package mark

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdMarks 		godoc
// @Summary				Get Single Marks by id.
// @Param				id path string true "get marks by id"
// @Description			Return the mark whose marId value matches id.
// @Produce				application/json
// @Tags			marks
// @Success				200  "Mark found successfully."
// @Router				/marks/{id} [get]
func GetMark(c *gin.Context) {
	id := c.Param("id")

	var Mark models.Mark

	if result := db.DB.First(&Mark, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Mark)
}
