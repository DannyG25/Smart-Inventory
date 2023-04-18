package tax

import (
	"github.com/gin-gonic/gin"
)

type AddTaxBody struct {
}

// CreateTaxs		godoc
// @Summary			Create taxs
// @Description		Save taxs data in Db.
// @Param			taxs body AddTaxBody{} true "Create taxs"
// @Produce			application/json
// @Tags			taxs
// @Success			200 {object} AddTaxBody{} "successfully created tax."
// @Router			/taxs [post]
func AddTax(c *gin.Context) {
	// body := AddTaxBody{}

	// //Check data in json format
	// if err := c.BindJSON(&body); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	return
	// }

	// // retrieve last id
	// var lastRecord models.Tax
	// err := db.DB.Table("tax").Last(&lastRecord).Error
	// if err != nil {
	// 	body.Tax_id = 1
	// } else {
	// 	body.Tax_id = lastRecord.Tax_id + 1
	// }

	// // Insertion of new record
	// if result := db.DB.Table("tax").Create(&body); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// c.JSON(http.StatusCreated, &body)
}
