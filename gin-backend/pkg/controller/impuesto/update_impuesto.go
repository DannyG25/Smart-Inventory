package impuesto

import (
	"net/http"
	"strconv"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateImpuestoRequestBody struct {
	Imp_nombre string
	Imp_tasa   float32
}

// UpdateImpuestos		godoc
// @Summary			Update impuestos
// @Description		Update impuestos data.
// @Param			id path string true "update Impuestos by id"
// @Param			impuestos body UpdateImpuestoRequestBody{} true  "Update tags"
// @Tags			impuestos
// @Produce			application/json
// @Success			200 {object} models.Impuesto "Impuesto actualizada exitosamente."
// @Router			/impuestos/{id} [put]
func UpdateImpuesto(c *gin.Context) {
	id := c.Param("id")
	body := UpdateImpuestoRequestBody{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Los datos son inválidos"})

		return
	}

	var Impuesto models.Impuesto

	if result := db.DB.Table("impuesto").Where("imp_id", id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	intVar, err := strconv.Atoi(id)

	Impuesto.Imp_id = intVar
	Impuesto.Imp_nombre = body.Imp_nombre
	Impuesto.Imp_tasa = body.Imp_tasa

	if err != nil {

		return
	}

	if err := db.DB.Table("impuesto").Model(&Impuesto).Where("imp_id", id).Updates(&Impuesto).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el registro"})
		return
	}

	c.JSON(http.StatusOK, &Impuesto)
}
