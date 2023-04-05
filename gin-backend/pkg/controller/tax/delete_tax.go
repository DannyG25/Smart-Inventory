package impuesto

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteTaxs		godoc
// @Summary			Delete taxs
// @Param			id path string true "get taxs by id"
// @Description		Remove taxs data by id.
// @Produce			application/json
// @Tags		    taxs
// @Success			200 {object} models.Tax "Tax successfully erased."
// @Router			/taxs/{id} [delete]
func DeleteTax(c *gin.Context) {
	id := c.Param("id")

	var Tax models.Tax

	if result := db.DB.Table("tax").Where("tax_id", id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Table("tax").Model(&Tax).Where("tax_id", id).Delete(&Tax).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
