package product

import (
	"github.com/gin-gonic/gin"
)

type UpdateProductBody struct {
}

// UpdateProducts		godoc
// @Summary			Update products
// @Description		Update products data.
// @Param			products body UpdateProductBody{} true  "Update tags"
// @Tags			products
// @Produce			application/json
// @Success			200 {object} UpdateProductBody "Product updated successfully."
// @Router			/products [put]
func UpdateMark(c *gin.Context) {

	// body := UpdateMarkBody{}
	// marks := models.Mark{}
	// if err := c.BindJSON(&body); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

	// 	return
	// }

	// if result := db.DB.Table("mark").Where("mar_id", body.Mar_id).First(&marks); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// if err := db.DB.Table("mark").Model(&body).Where("mar_id", body.Mar_id).Updates(&body).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
	// 	return
	// } else {
	// 	c.JSON(http.StatusOK, &body)
	// }

}
