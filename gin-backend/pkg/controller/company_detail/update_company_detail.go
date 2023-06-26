package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateCompany_DetailBody struct {
	Id                     uint
	Comp_det_stock         int
	Comp_det_maximum_mount int
	Comp_det_minimun_moun  int
	Product_id             *uint
	Company_id             *uint
}

// UpdateCompany_Details		godoc
// @Summary			Update company_details
// @Description		Update company_details data.
// @Param			company_details body UpdateCompany_DetailBody{} true  "Update tags"
// @Tags			company_details
// @Produce			application/json
// @Success			200 {object} UpdateCompany_DetailBody "Company_Detail updated successfully."
// @Router			/company_details [put]
func UpdateCompany_Detail(c *gin.Context) {

	body := UpdateCompany_DetailBody{}
	var Company_Detail models.Company_detail

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&Company_Detail); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	Company_Detail.Comp_det_stock = body.Comp_det_stock
	Company_Detail.Comp_det_maximum_mount = body.Comp_det_maximum_mount
	Company_Detail.Comp_det_minimun_moun = body.Comp_det_minimun_moun
	Company_Detail.Product_id = body.Product_id
	Company_Detail.Company_id = body.Company_id

	if err := db.DB.Where("id", Company_Detail.ID).Updates(&Company_Detail).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &Company_Detail)
	}

}
