package movement

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllMovements		godoc
// @Summary			Get All movements.
// @Description		Return list of movements.
// @Tags			movements
// @Success			200  "Movements successfully recovered."
// @Router			/movements [get]
func GetMovements(c *gin.Context) {
	var Movements []models.Movement

	if result := db.DB.Preload("Devices").Find(&Movements); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Movements)
}
