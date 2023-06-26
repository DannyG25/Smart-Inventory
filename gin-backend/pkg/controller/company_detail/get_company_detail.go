package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdCompany_Details		godoc
// @Summary				Get Single Company_Detailsby id.
// @Param				id path string true "get company_detailsby id"
// @Description			Return the company_detail whose catId value matches id.
// @Produce				application/json
// @Tags			company_details
// @Success				200 "Company_Detail found successfully."
// @Router				/company_details/{id} [get]
func GetCompany_Detail(c *gin.Context) {
	id := c.Param("id")

	var Company_Detail models.Company_detail

	if result := db.DB.Where("id  = ?", id).First(&Company_Detail); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Company_Detail)
}
