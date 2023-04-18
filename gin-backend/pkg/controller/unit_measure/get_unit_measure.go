package unit_measure

import (
	"github.com/gin-gonic/gin"
)

// FindByIdUnit_Measures 		godoc
// @Summary				Get Single Unit_Measures by id.
// @Param				id path string true "get unit_Measures by id"
// @Description			Return the unit_measure whose uniId value matches id.
// @Produce				application/json
// @Tags			unit_measures
// @Success				200  "Unit_Measure found successfully."
// @Router				/unit_measures/{id} [get]
func GetUnit_Measure(c *gin.Context) {
	// id := c.Param("id")

	// var Unit_Measure models.Unit_measure

	// if result := db.DB.Table("unit_measure").First(&Unit_Measure, id); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// c.JSON(http.StatusOK, &Unit_Measure)
}
