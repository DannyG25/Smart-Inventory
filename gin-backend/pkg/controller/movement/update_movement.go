package movement

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateMovementBody struct {
	Id              uint
	Mov_type        string
	Mov_description string
}

// CreateMovements		godoc
// @Summary			Create movements
// @Description		Save movements data in Db.
// @Param			movements body AddMovementBody{} true "Create movements"
// @Produce			application/json
// @Tags			movements
// @Success			200 {object} AddMovementBody{} "successfully created movement."
// @Router			/movements [post]
func UpdateMovement(c *gin.Context) {
	body := UpdateMovementBody{}
	movements := models.Movement{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&movements); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	movements.Mov_type = body.Mov_type
	movements.Mov_description = body.Mov_description

	if err := db.DB.Where("id", movements.ID).Updates(&movements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &movements)
	}
}
