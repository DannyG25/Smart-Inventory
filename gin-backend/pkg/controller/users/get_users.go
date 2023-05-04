package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// FindAllUsers 		godoc
// @Summary			Get All users.
// @Description		Return list of users.
// @Tags			users
// @Success			200  "Users successfully recovered."
// @Router			/users [get]
func GetUsers(c *gin.Context) {
	var Users []models.Users

	if result := db.DB.Find(&Users); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusOK, &Users)
}
