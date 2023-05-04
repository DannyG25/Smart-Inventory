package company

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateCompanyBody struct {
	Id           uint
	Comp_name    string
	Comp_address string
	Comp_phone   string
	Comp_ruc     string
	Comp_mail    string
	CompanyID    *uint
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

	body := UpdateCompanyBody{}
	companies := models.Company{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&companies); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	companies.Comp_name = body.Comp_name
	companies.Comp_address = body.Comp_address
	companies.Comp_phone = body.Comp_phone
	companies.Comp_ruc = body.Comp_ruc
	companies.Comp_ruc = body.Comp_ruc
	companies.CompanyID = body.CompanyID

	if err := db.DB.Where("id", companies.ID).Updates(&companies).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &companies)
	}

}
