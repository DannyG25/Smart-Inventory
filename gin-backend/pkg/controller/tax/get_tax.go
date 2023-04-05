package tax

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdTaxs 		godoc
// @Summary				Get Single Taxs by id.
// @Param				id path string true "get taxs by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			taxs
// @Success				200 {object} models.Tax "Tax found successfully."
// @Router				/taxs/{id} [get]
func GetTax(c *gin.Context) {
	id := c.Param("id")

	var Tax models.Tax

	if result := db.DB.Table("tax").First(&Tax, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Tax)
}
