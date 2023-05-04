package movement

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdMovements 		godoc
// @Summary				Get Single Movements by id.
// @Param				id path string true "get movements by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			movements
// @Success				200  "Movement found successfully."
// @Router				/movements/{id} [get]
func GetMovement(c *gin.Context) {
	id := c.Param("id")

	var Movement models.Movement

	if result := db.DB.Preload("Devices").Where("id  = ?", id).First(&Movement); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Movement)
}
