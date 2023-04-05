package impuesto

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteImpuestos		godoc
// @Summary			Delete Impuestos
// @Param			id path string true "get Impuestos by id"
// @Description		Remove Impuestos data by id.
// @Produce			application/json
// @Tags		    impuestos
// @Success			200 {object} models.Impuesto "Impuesto borrada exitosamente."
// @Router			/impuestos/{id} [delete]
func DeleteImpuesto(c *gin.Context) {
	id := c.Param("id")

	var Impuesto models.Impuesto

	if result := db.DB.Table("impuesto").Where("imp_id", id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Table("impuesto").Model(&Impuesto).Where("imp_id", id).Delete(&Impuesto).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar el registro"})
		return
	}

	c.Status(http.StatusOK)
}
