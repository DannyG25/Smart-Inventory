package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllBinnaclesById 		godoc
// @Summary			Get All binnacles by Id.
// @Description		Return list of binnacles.
// @Tags			binnacles
// @Success			200  "Binnacles successfully recovered."
// @Router			/binnacles [get]
func GetBinnaclesID(c *gin.Context) {
	id := c.Param("id")
	var Binnacles []models.Binnacle

	if result := db.DB.Where("device_id  = ?", id).Find(&Binnacles); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Binnacles)
}
