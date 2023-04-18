package tax

import (
	"github.com/gin-gonic/gin"
)

type UpdateTaxBody struct {
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

	// body := UpdateTaxBody{}
	// taxs := models.Tax{}

	// if err := c.BindJSON(&body); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

	// 	return
	// }

	// if result := db.DB.Table("tax").Where("tax_id", body.Tax_id).First(&taxs); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// if err := db.DB.Table("tax").Model(&body).Where("tax_id", body.Tax_id).Updates(&body).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
	// 	return
	// } else {
	// 	c.JSON(http.StatusOK, &body)

	// }

}
