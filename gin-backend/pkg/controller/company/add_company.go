package company

import (
	"github.com/gin-gonic/gin"
)

type AddCompanyBody struct {
}

// CreateCompanies	godoc
// @Summary			Create companies
// @Description		Save companies data in Db.
// @Param			companies body AddCompanyBody{} true "Create companies"
// @Produce			application/json
// @Tags			companies
// @Success			200 {object} AddCompanyBody{} "successfully created company."
// @Router			/companies [post]
func AddCompany(c *gin.Context) {
	// body := AddCompanyBody{}

	// //Check data in json format
	// if err := c.BindJSON(&body); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	return
	// }

	// // retrieve last id
	// var lastRecord models.Company
	// err := db.DB.Table("company").Last(&lastRecord).Error
	// if err != nil {
	// 	body.Comp_id = 1
	// } else {
	// 	body.Comp_id = lastRecord.Comp_id + 1
	// }

	// // Look up the supervisor in the database if an ID was provided
	// if body.Comp_comp != nil && body.Comp_comp.Comp_id != 0 {
	// 	var supervisor models.Company
	// 	if err := db.DB.Preload("Comp_comp").First(&supervisor, body.Comp_comp.Comp_id); err.Error != nil {
	// 		c.AbortWithError(http.StatusNotFound, err.Error)
	// 		return
	// 	}
	// 	body.Comp_comp = &supervisor
	// } else {
	// 	body.Comp_comp = nil
	// }

	// // Insertion of new record
	// if result := db.DB.Table("company").Create(&body); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// c.JSON(http.StatusCreated, &body)
}
