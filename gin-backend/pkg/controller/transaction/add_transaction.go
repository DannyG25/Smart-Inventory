package transaction

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddTransactionBody struct {
	Tran_date           time.Time
	Tran_Total          float32
	Tran_status         string
	Device_id           uint
	Users_id            uint
	Users2_id           uint
	Transaction_details []models.Transaction_detail
}

// CreateTransactions	godoc
// @Summary			Create transactions
// @Description		Save transactions data in Db.
// @Param			transactions body AddTransactionBody{} true "Create transactions"
// @Produce			application/json
// @Tags			transactions
// @Success			200 {object} AddTransactionBody{} "successfully created transaction."
// @Router			/transactions [post]
func AddTransaction(c *gin.Context) {
	body := AddTransactionBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record
	var Transaction models.Transaction
	Transaction.Tran_date = body.Tran_date
	Transaction.Tran_Total = body.Tran_Total
	Transaction.Users2_id = body.Users2_id
	Transaction.Users_id = body.Users_id
	Transaction.Tran_status = body.Tran_status
	Transaction.Transaction_details = body.Transaction_details

	if result := db.DB.Create(&Transaction); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
