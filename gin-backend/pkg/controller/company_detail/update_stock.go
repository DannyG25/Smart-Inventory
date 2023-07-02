package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateStockBody struct {
	Id                     uint
	Comp_det_stock         int
	Comp_det_maximum_mount int
	Comp_det_minimun_moun  int
	Product_id             *uint
	Company_id             *uint
}

// UpdateStock		godoc
// @Summary			Update stock
// @Description		Update Stock data.
// @Param			company_details body UpdateStockBody{} true  "Update tags"
// @Tags			company_details
// @Produce			application/json
// @Success			200 {object} UpdateStockBody "Stock updated successfully."
// @Router			/company_details/stock [put]
func UpdateStock(c *gin.Context) {

	body := UpdateStockBody{}
	var Company_Detail models.Company_detail

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("product_id", body.Product_id).First(&Company_Detail); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	Company_Detail.Comp_det_stock = Company_Detail.Comp_det_stock - body.Comp_det_stock

	if err := db.DB.Where("id", Company_Detail.ID).Updates(&Company_Detail).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &Company_Detail)
	}

}
