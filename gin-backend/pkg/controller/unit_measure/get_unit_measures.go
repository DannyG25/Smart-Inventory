package unit_measure

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllUnit_Measures 		godoc
// @Summary			Get All unit_measures.
// @Description		Return list of unit_measures.
// @Tags			unit_measures
// @Success			200 {obejct} models.Unit_Measure "Unit_Measures recuperadas exitosamente."
// @Router			/unit_measures [get]
func GetUnit_Measures(c *gin.Context) {
	var Unit_Measures []models.Unit_Measure

	if result := db.DB.Table("unit_measure").Find(&Unit_Measures); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Unit_Measures)
}
