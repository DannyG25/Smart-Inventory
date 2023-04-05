package impuesto

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdImpuestos 		godoc
// @Summary				Get Single Impuestos by id.
// @Param				id path string true "get impuestos by id"
// @Description			Return the tahs whoes marId valu mathes id.
// @Produce				application/json
// @Tags			impuestos
// @Success				200 {object} models.Impuesto "Impuesto encontrada exitosamente."
// @Router				/impuestos/{id} [get]
func GetImpuesto(c *gin.Context) {
	id := c.Param("id")

	var Impuesto models.Impuesto

	if result := db.DB.Table("impuesto").First(&Impuesto, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Impuesto)
}
