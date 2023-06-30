package transaction

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllTransactions 		godoc
// @Summary			Get All transactions
// @Description		Return list of transactions.
// @Tags			transactions
// @Success			200  "Transactions successfully recovered."
// @Router			/transactions [get]
func GetTransactions(c *gin.Context) {
	var Transactions []models.Transaction

	if result := db.DB.Preload("Transaction_details").Preload("Users").Preload("Users2.Company.Devices.Binnacles").Find(&Transactions); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Transactions)
}
