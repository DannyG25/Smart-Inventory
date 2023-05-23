package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdBinnacles 		godoc
// @Summary				Get Single Binnacles by id.
// @Param				id path string true "get binnacles by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			binnacles
// @Success				200  "Binnacle found successfully."
// @Router				/binnacles/{id} [get]
func GetBinnacle(c *gin.Context) {
	id := c.Param("id")

	var Binnacle models.Binnacle

	if result := db.DB.Where("id  = ?", id).First(&Binnacle); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Binnacle)
}
