package company

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindByIdCompanies 		godoc
// @Summary				Get Single Companies by id.
// @Param				id path string true "get companies by id"
// @Description			Return the company whose marId value matches id.
// @Produce				application/json
// @Tags			companies
// @Success				200  "Company found successfully."
// @Router				/companies/{id} [get]
func GetCompany(c *gin.Context) {
	id := c.Param("id")

	// var Company models.Company
	// var Children []models.Company

	// if result := db.DB.Preload("Children_comp", func(db *gorm.DB) *gorm.DB {
	// 	return db.Preload("Children_comp")
	// }).First(&Company, id); result.Error != nil {
	// 	c.AbortWithError(http.StatusNotFound, result.Error)
	// 	return
	// }

	var company models.Company
	var children []*models.Company
	// var devicePrincipal models.Device
	// var binnaclesPrincipal

	// Obtener la compañía padre por ID
	// if err := db.DB.First(&company, id); err != nil {
	// 	c.AbortWithError(http.StatusNotFound, err.Error)
	// }
	db.DB.Preload("Devices.Binnacles").Where("id  = ?", id).First(&company)
	// if err := db.DB.First(&company, id); err != nil {
	// 	c.AbortWithError(http.StatusNotFound, err.Error)
	// }
	// Obtener los hijos de la compañía
	if err := db.DB.Model(&company).Association("Children_comp").Find(&children); err != nil {
		// manejar error
	}

	// Para cada hijo, obtener sus dispositivos y sus bitácoras
	for i, child := range children {
		var devices []models.Device
		if err := db.DB.Model(&child).Association("Devices").Find(&devices); err != nil {
			// manejar error
		}

		for j, device := range devices {
			var logs []models.Binnacle
			if err := db.DB.Model(&device).Association("Binnacles").Find(&logs); err != nil {
				// manejar error
			}

			devices[j].Binnacles = logs
		}

		children[i].Devices = devices
	}

	company.Children_comp = children

	c.JSON(http.StatusOK, company)
}
