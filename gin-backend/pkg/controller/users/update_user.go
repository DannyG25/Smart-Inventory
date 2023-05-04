package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UpdateUserBody struct {
	Id                  uint
	User_username       string
	User_password       string
	User_identification string
	User_names          string
	User_lastnames      string
	User_address        string
	User_phone          string
	Company_id          *uint
}

// UpdateUsers		godoc
// @Summary			Update users
// @Description		Update users data.
// @Param			users body UpdateUserBody{} true  "Update users"
// @Tags			users
// @Produce			application/json
// @Success			200 {object} UpdateUserBody{} "User updated successfully."
// @Router			/users [put]
func UpdateUser(c *gin.Context) {

	body := UpdateUserBody{}
	User := models.Users{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "The data is invalid"})

		return
	}

	if result := db.DB.Where("id", body.Id).First(&User); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.User_password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash passwoord",
		})
		return
	}

	User.ID = body.Id
	User.User_names = body.User_names
	User.User_lastnames = body.User_lastnames
	User.User_identification = body.User_identification
	User.User_username = body.User_username
	User.User_password = string(hash)
	User.User_phone = body.User_phone
	User.User_address = body.User_address
	User.Company_id = body.Company_id

	if err := db.DB.Where("id", User.ID).Updates(&User).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	} else {
		c.JSON(http.StatusOK, &User)
	}

}
