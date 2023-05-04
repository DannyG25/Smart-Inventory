package tax

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllTaxs		godoc
// @Summary			Get All taxs.
// @Description		Return list of taxs.
// @Tags			taxs
// @Success			200  "Taxs successfully recovered."
// @Router			/taxs [get]
func GetTaxs(c *gin.Context) {
	var Taxs []models.Tax

	if result := db.DB.Find(&Taxs); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Taxs)
}
