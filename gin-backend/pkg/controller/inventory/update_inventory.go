package inventory

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateInventoryBody struct {
	Id                uint
	Inv_head_date     time.Time
	Company_id        uint
	Users_id          uint
	Inventory_details []models.Inventory_detail
}

// UpdateInventories		godoc
// @Summary			Update inventories
// @Description		Update inventories .
// @Param			inventories body AddInventoryBody{} true "Create inventories"
// @Produce			application/json
// @Tags			inventories
// @Success			200 {object} AddInventoryBody{} "successfully created inventory."
// @Router			/inventories [put]
func UpdateInventory(c *gin.Context) {
	body := UpdateInventoryBody{}
	inventories := models.Inventory_header{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&inventories); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	inventories.Inv_head_date = body.Inv_head_date
	inventories.Company_id = body.Company_id
	inventories.Users_id = body.Users_id
	inventories.Inventory_details = body.Inventory_details

	if err := db.DB.Where("id", inventories.ID).Updates(&inventories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &inventories)
	}
}
