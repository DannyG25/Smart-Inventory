package binnacle

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateBinnacleBody struct {
	Id              uint
	Bin_lenght      float64
	Bin_latitude    float64
	Bin_description string
}

// CreateBinnacles		godoc
// @Summary			Create binnacles
// @Description		Save binnacles data in Db.
// @Param			binnacles body AddBinnacleBody{} true "Create binnacles"
// @Produce			application/json
// @Tags			binnacles
// @Success			200 {object} AddBinnacleBody{} "successfully created binnacle."
// @Router			/binnacles [post]
func UpdateBinnacle(c *gin.Context) {
	body := UpdateBinnacleBody{}
	binnacles := models.Binnacle{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&binnacles); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	binnacles.Bin_description = body.Bin_description
	binnacles.Bin_latitude = body.Bin_latitude
	binnacles.Bin_lenght = body.Bin_lenght

	if err := db.DB.Where("id", binnacles.ID).Updates(&binnacles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &binnacles)
	}
}
