package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllCompany_detailsById 		godoc
// @Summary			Get All company_details by Id.
// @Description		Return list of company_details.
// @Tags			company_details
// @Success			200  "Company_details successfully recovered."
// @Router			/company_details [get]
func GetCompany_detailsID(c *gin.Context) {
	id := c.Param("id")
	var Company_details []models.Company_detail

	if result := db.DB.Preload("Product").Where("company_id  = ?", id).Find(&Company_details); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Company_details)
}
