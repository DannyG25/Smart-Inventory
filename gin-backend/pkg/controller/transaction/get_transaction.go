package transaction

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdTransactions		godoc
// @Summary				Get Single Transactionsby id.
// @Param				id path string true "get transactions by id"
// @Description			Return the tax whose taxId value matches id.
// @Produce				application/json
// @Tags			transactions
// @Success				200  "Transaction found successfully."
// @Router				/transactions/{id} [get]
func GetTransaction(c *gin.Context) {
	id := c.Param("id")

	var Transaction models.Transaction

	if result := db.DB.Preload("Users").Preload("Transaction_details.Product.Category").Preload("Transaction_details.Product.Tax").Preload("Users2").Where("id  = ?", id).First(&Transaction); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Transaction)
}
