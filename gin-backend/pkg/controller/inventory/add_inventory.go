package inventory

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddInventoryBody struct {
	Inv_head_date     time.Time
	Company_id        uint
	Users_id          uint
	Inventory_details []models.Inventory_detail
}

// CreateInventories	godoc
// @Summary			Create inventories
// @Description		Save inventories data in Db.
// @Param			inventories body AddInventoryBody{} true "Create inventories"
// @Produce			application/json
// @Tags			inventories
// @Success			200 {object} AddInventoryBody{} "successfully created inventory."
// @Router			/inventories [post]
func AddInventory(c *gin.Context) {
	body := AddInventoryBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record
	var Inventory models.Inventory_header
	Inventory.Inv_head_date = body.Inv_head_date
	Inventory.Company_id = body.Company_id
	Inventory.Users_id = body.Users_id
	Inventory.Inventory_details = body.Inventory_details

	if result := db.DB.Create(&Inventory); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
