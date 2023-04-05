package tax

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateTaxBody struct {
	models.Tax
}

// UpdateTaxs		godoc
// @Summary			Update taxs
// @Description		Update taxs data.
// @Param			taxs body UpdateTaxBody{} true  "Update tags"
// @Tags			taxs
// @Produce			application/json
// @Success			200 {object} models.Tax "Tax updated successfully."
// @Router			/taxs [put]
func UpdateTax(c *gin.Context) {

	body := UpdateTaxBody{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Table("tax").Where("tax_id", body.Tax_id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	if err := db.DB.Table("tax").Model(&body).Where("tax_id", body.Tax_id).Updates(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el registro"})
		return
	}

	c.JSON(http.StatusOK, &body)

}
