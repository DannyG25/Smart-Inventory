package inventory

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllInventoriesById 		godoc
// @Summary			Get All inventories by Id.
// @Description		Return list of inventories by Id.
// @Tags			inventories
// @Success			200  "Inventories successfully recovered."
// @Router			/inventories [get]
func GetInventoriesID(c *gin.Context) {
	id := c.Param("id")
	var Inventories []models.Inventory_header

	// if result := db.DB.Where("company_id  = ?", id).Find(&Inventories); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }
	if result := db.DB.Where("company_id  = ?", id).Preload("Users").Preload("Inventory_details").Preload("Company").Find(&Inventories); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Inventories)
}
