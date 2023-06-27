package transaction

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateTransactionBody struct {
	Id         uint
	Tran_date  time.Time
	Tran_Total float32
	Device_id  uint
	Users_id   uint
	Users2_id  uint
}

// UpdateTransactions		godoc
// @Summary			Update transactions
// @Description		Update transactions .
// @Param			transactions body AddTransactionBody{} true "Create transactions"
// @Produce			application/json
// @Tags			transactions
// @Success			200 {object} AddTransactionBody{} "successfully created transaction."
// @Router			/transactions [put]
func UpdateTransaction(c *gin.Context) {
	body := UpdateTransactionBody{}
	transactions := models.Transaction{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&transactions); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	transactions.Tran_date = body.Tran_date
	transactions.Tran_Total = body.Tran_Total
	transactions.Users2_id = body.Users2_id
	transactions.Users_id = body.Users_id

	if err := db.DB.Where("id", transactions.ID).Updates(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &transactions)
	}
}
