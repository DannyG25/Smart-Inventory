package impuesto

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllImpuestos		godoc
// @Summary			Get All impuestos.
// @Description		Return list of impuestos.
// @Tags			impuestos
// @Success			200 {obejct} models.Impuesto "Impuestos recuperados exitosamente."
// @Router			/impuestos [get]
func GetImpuestos(c *gin.Context) {
	var Impuestos []models.Impuesto

	if result := db.DB.Table("impuesto").Find(&Impuestos); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Impuestos)
}
