package company

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteCompanies		godoc
// @Summary			Delete companies
// @Param			id path string true "get companies by id"
// @Description		Remove companies data by id.
// @Produce			application/json
// @Tags		    companies
// @Success			200  "Company successfully erased."
// @Router			/companies/{id} [delete]
func DeleteCompany(c *gin.Context) {
	id := c.Param("id")

	var Company models.Company

	if result := db.DB.First(&Company, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Delete(&Company).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
