package tax

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateTaxBody struct {
	Id       uint
	Tax_name string
	Tax_rate float32
}

// UpdateTaxs		godoc
// @Summary			Update taxs
// @Description		Update taxs data.
// @Param			taxs body UpdateTaxBody{} true  "Update tags"
// @Tags			taxs
// @Produce			application/json
// @Success			200 {object} UpdateTaxBody{} "Tax updated successfully."
// @Router			/taxs [put]
func UpdateTax(c *gin.Context) {

	body := UpdateTaxBody{}
	taxs := models.Tax{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&taxs); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	taxs.ID = body.Id
	taxs.Tax_name = body.Tax_name
	taxs.Tax_rate = body.Tax_rate

	if err := db.DB.Where("id", taxs.ID).Updates(&taxs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &taxs)
	}

}
