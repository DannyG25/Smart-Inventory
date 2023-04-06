package product

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddProductBody struct {
	models.Product
}

// CreateProducts	godoc
// @Summary			Create products
// @Description		Save products data in Db.
// @Param			products body AddProductBody{} true "Create products"
// @Produce			application/json
// @Tags			products
// @Success			200 {object} models.Product "successfully created product."
// @Router			/products [post]
func AddProduct(c *gin.Context) {
	body := AddProductBody{}

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// retrieve last id
	var lastRecord models.Product
	err := db.DB.Table("product").Last(&lastRecord).Error
	if err != nil {
		body.Pro_id = 1
	} else {
		body.Pro_id = lastRecord.Pro_id + 1
	}

	// Look up the supervisor in the database if an ID was provided
	if body.Product_pro_id != nil && body.Product_pro_id.Pro_id != 0 {
		var supervisor models.Product
		if err := db.DB.Preload("Supervisor").First(&supervisor, body.Product_pro_id.Pro_id); err.Error != nil {
			c.AbortWithError(http.StatusNotFound, err.Error)
			return
		}
		body.Product_pro_id = &supervisor
	} else {
		body.Product_pro_id = nil
	}

	// Insertion of new record
	if result := db.DB.Table("product").Create(&body); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &body)
}
