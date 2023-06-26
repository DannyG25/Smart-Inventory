package company_detail

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddCompany_DetailBody struct {
	Comp_det_stock         int
	Comp_det_maximum_mount int
	Comp_det_minimun_moun  int
	Product_id             *uint
	Company_id             *uint
}

// CreateCompany_Details		godoc
// @Summary			Create company_details
// @Description		Save company_details data in Db.
// @Param			company_details body AddCompany_DetailBody{} true "Create company_detail"
// @Produce			application/json
// @Tags			company_details
// @Success			200 {object} AddCompany_DetailBody{} "successfully created company_detail."
// @Router			/company_details [post]
func AddCompany_Detail(c *gin.Context) {
	body := AddCompany_DetailBody{}
	var Company_Detail models.Company_detail
	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record

	Company_Detail.Comp_det_stock = body.Comp_det_stock
	Company_Detail.Comp_det_maximum_mount = body.Comp_det_maximum_mount
	Company_Detail.Comp_det_minimun_moun = body.Comp_det_minimun_moun
	Company_Detail.Product_id = body.Product_id
	Company_Detail.Company_id = body.Company_id

	if result := db.DB.Create(&Company_Detail); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
