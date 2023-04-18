package company

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllCompanies 		godoc
// @Summary			Get All companies.
// @Description		Return list of companies.
// @Tags			companies
// @Success			200  "Companies successfully recovered."
// @Router			/companies [get]
func GetCompanies(c *gin.Context) {
	var Companies []models.Company

	if result := db.DB.Table("company").Find(&Companies); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Companies)
}
