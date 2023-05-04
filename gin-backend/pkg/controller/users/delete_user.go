package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

// DeleteUsers		godoc
// @Summary			Delete users
// @Param			id path string true "get users by id"
// @Description		Remove users data by id.
// @Produce			application/json
// @Tags		    users
// @Success			200  "User successfully erased."
// @Router			/users/{id} [delete]
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	var User models.Users

	if result := db.DB.First(&User, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if err := db.DB.Delete(&User).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.Status(http.StatusOK)
}
