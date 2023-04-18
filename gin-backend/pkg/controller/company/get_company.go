package company

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdCompanies 		godoc
// @Summary				Get Single Companies by id.
// @Param				id path string true "get companies by id"
// @Description			Return the company whose marId value matches id.
// @Produce				application/json
// @Tags			companies
// @Success				200  "Company found successfully."
// @Router				/companies/{id} [get]
func GetCompany(c *gin.Context) {
	id := c.Param("id")

	var Company models.Company

	if result := db.DB.Table("company").First(&Company, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Company)
}
