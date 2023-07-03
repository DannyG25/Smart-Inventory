package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllUsersById 		godoc
// @Summary			Get All users by Id.
// @Description		Return list of users by Id.
// @Tags			users
// @Success			200  "Users successfully recovered."
// @Router			/users [get]
func GetUsersID(c *gin.Context) {
	id := c.Param("id")
	var Users []models.Users

	if result := db.DB.
		Joins("JOIN companies ON companies.id = users.company_id").
		Where("companies.company_id = ?", id).
		Find(&Users); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Users)
}
