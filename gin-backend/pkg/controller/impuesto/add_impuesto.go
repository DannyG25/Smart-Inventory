package impuesto

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddImpuestoRequestBody struct {
	Imp_nombre string
	Imp_tasa   float32
}

// CreateImpuestos	godoc
// @Summary			Create impuestos
// @Description		Save impuestos data in Db.
// @Param			impuestos body AddImpuestoRequestBody{} true "Create impuestos"
// @Produce			application/json
// @Tags			impuestos
// @Success			200 {object} models.Impuesto "Impuesto creada exitosamente."
// @Router			/impuestos [post]
func AddImpuesto(c *gin.Context) {
	body := AddImpuestoRequestBody{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	var Impuesto models.Impuesto
	Impuesto.Imp_nombre = body.Imp_nombre
	Impuesto.Imp_tasa = body.Imp_tasa

	if result := db.DB.Table("impuesto").Create(&body); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &Impuesto)
}
