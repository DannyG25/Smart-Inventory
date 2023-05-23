package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllBinnacles 		godoc
// @Summary			Get All binnacles.
// @Description		Return list of binnacles.
// @Tags			binnacles
// @Success			200  "Binnacles successfully recovered."
// @Router			/binnacles [get]
func GetBinnacles(c *gin.Context) {
	var Binnacles []models.Binnacle

	if result := db.DB.Find(&Binnacles); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Binnacles)
}
