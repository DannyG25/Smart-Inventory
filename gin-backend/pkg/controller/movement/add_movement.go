package movement

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddMovementBody struct {
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
func AddMovement(c *gin.Context) {
	body := AddMovementBody{}
	var Movement models.Movement

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	Movement.Mov_type = body.Mov_type
	Movement.Mov_description = body.Mov_description

	// Insertion of new record
	if result := db.DB.Create(&Movement); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
