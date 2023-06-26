package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteCompany_Detail	godoc
// @Summary			Delete company_detail
// @Param			id path string true "get company_detail by id"
// @Description		Remove company_detail data by id.
// @Produce			application/json
// @Tags		    company_detail
// @Success			200  "Company_Detail successfully erased."
// @Router			/company_details/{id} [delete]
func DeleteCompany_Detail(c *gin.Context) {
	id := c.Param("id")

	var Company_Detail models.Company_detail

	if result := db.DB.First(&Company_Detail, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Delete(&Company_Detail).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}