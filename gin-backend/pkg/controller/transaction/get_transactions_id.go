package transaction

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllTransactionsById 		godoc
// @Summary			Get All transactions by Id.
// @Description		Return list of transactions by Id.
// @Tags			transactions
// @Success			200  "Transactions successfully recovered."
// @Router			/transactions [get]
func GetTransactionsID(c *gin.Context) {
	id := c.Param("id")
	var Transactions []models.Transaction

	if result := db.DB.Preload("Transaction_details.Product.Category").Preload("Users", "company_id = ?", id).Preload("Users2.Company.Devices.Binnacles").Find(&Transactions); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Transactions)
}
