package unit_measure

import (
	"github.com/gin-gonic/gin"
)

// FindAllUnit_Measures 		godoc
// @Summary			Get All unit_measures.
// @Description		Return list of unit_measures.
// @Tags			unit_measures
// @Success			200  "Unit_Measures successfully recovered."
// @Router			/unit_measures [get]
func GetUnit_Measures(c *gin.Context) {
	// var Unit_Measures []models.Unit_measure

	// if result := db.DB.Table("unit_measure").Find(&Unit_Measures); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// c.JSON(http.StatusOK, &Unit_Measures)
}
