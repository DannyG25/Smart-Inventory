package inventory

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllInventories 		godoc
// @Summary			Get All inventories
// @Description		Return list of inventories.
// @Tags			inventories
// @Success			200  "Inventories successfully recovered."
// @Router			/inventories [get]
func GetInventories(c *gin.Context) {
	var Inventories []models.Inventory_header

	if result := db.DB.Preload("Users").Preload("Inventory_details").Preload("Company").Find(&Inventories); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Inventories)
}
