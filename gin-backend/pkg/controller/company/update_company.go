package company

import (
	"github.com/gin-gonic/gin"
)

type UpdateCompanyBody struct {
}

// UpdateCompanies		godoc
// @Summary			Update companies
// @Description		Update companies data.
// @Param			companies body UpdateCompanyBody{} true  "Update tags"
// @Tags			companies
// @Produce			application/json
// @Success			200 {object} UpdateCompanyBody{} "Company updated successfully."
// @Router			/companies [put]
func UpdateCompany(c *gin.Context) {

	// body := UpdateCompanyBody{}
	// companies := models.Company{}
	// if err := c.BindJSON(&body); err != nil {
	// 	c.AbortWithError(http.StatusBadRequest, err)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

	// 	return
	// }

	// if result := db.DB.Table("company").Where("comp_id", body.Comp_id).First(&companies); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	// if err := db.DB.Table("company").Model(&body).Where("comp_id", body.Comp_id).Updates(&body).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
	// 	return
	// } else {
	// 	c.JSON(http.StatusOK, &body)
	// }

}
