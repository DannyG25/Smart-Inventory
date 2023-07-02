package transaction

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateTransactionStatusBody struct {
	Id          uint
	Tran_date   time.Time
	Tran_Total  float32
	Tran_status string
	Device_id   uint
	Users_id    uint
	Users2_id   uint
}

// UpdateTransactionStatus		godoc
// @Summary			Update transaction status
// @Description		Update transaction status .
// @Param			transactions body UpdateTransactionStatusBody{} true "Update transaction status"
// @Produce			application/json
// @Tags			transactions
// @Success			200 {object} UpdateTransactionStatusBody{} "successfully update transaction status."
// @Router			/transactions [put]
func UpdateTransactionStatus(c *gin.Context) {
	body := UpdateTransactionStatusBody{}
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

	transactions.Tran_status = body.Tran_status

	if err := db.DB.Where("id", transactions.ID).Updates(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &transactions)
	}
}
