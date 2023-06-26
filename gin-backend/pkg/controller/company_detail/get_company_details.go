package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllCompany_Details 		godoc
// @Summary			Get All company_details.
// @Description		Return list of company_details.
// @Tags			company_details
// @Success			200  "Company_Details successfully recovered."
// @Router			/company_details [get]
func GetCompany_Details(c *gin.Context) {
	var Company_Details []models.Company_detail

	if result := db.DB.Preload("Product").Preload("Company").Find(&Company_Details); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	c.JSON(http.StatusOK, &Company_Details)
}
