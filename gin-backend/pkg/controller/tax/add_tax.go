package tax

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddTaxBody struct {
	Tax_name string
	Tax_rate float32
}

// CreateTaxs		godoc
// @Summary			Create taxs
// @Description		Save taxs data in Db.
// @Param			taxs body AddTaxBody{} true "Create taxs"
// @Produce			application/json
// @Tags			taxs
// @Success			200 {object} AddTaxBody{} "successfully created tax."
// @Router			/taxs [post]
func AddTax(c *gin.Context) {
	body := AddTaxBody{}
	var Tax models.Tax

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	Tax.Tax_name = body.Tax_name
	Tax.Tax_rate = body.Tax_rate

	// Insertion of new record
	if result := db.DB.Create(&Tax); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
