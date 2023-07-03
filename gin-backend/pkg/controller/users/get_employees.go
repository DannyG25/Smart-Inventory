package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllEmployees 		godoc
// @Summary			Get All employees.
// @Description		Return list of employees.
// @Tags			employees
// @Success			200  "Employees successfully recovered."
// @Router			/users [get]
func GetEmployees(c *gin.Context) {
	id := c.Param("id")
	var Users []models.Users

	if result := db.DB.Where("company_id=?", id).Find(&Users); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Users)
}
