package transaction

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteTransactions		godoc
// @Summary			Delete transactions
// @Param			id path string true "get transactions by id"
// @Description		Remove transactions data by id.
// @Produce			application/json
// @Tags		    transactions
// @Success			200  "Transaction successfully erased."
// @Router			/transactions/{id} [delete]
func DeleteTransaction(c *gin.Context) {
	id := c.Param("id")

	var Transaction models.Transaction

	if result := db.DB.Preload("Transaction_details").First(&Transaction, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	// if err := db.DB.Delete(&Transaction).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
	// 	return
	// }

	if err := db.DB.Unscoped().Delete(&Transaction.Transaction_details).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete records associate"})
		return
	}

	if err := db.DB.Unscoped().Where("id = ?", id).Delete(&Transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
