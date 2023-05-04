package users

import (
	"net/http"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AddUserBody struct {
	User_username       string
	User_password       string
	User_identification string
	User_names          string
	User_lastnames      string
	User_address        string
	User_phone          string
	Company_id          *uint
}

// CreateUsers		godoc
// @Summary			Create users
// @Description		Save users data in Db.
// @Param			users body AddUserBody{} true "Create users"
// @Produce			application/json
// @Tags			users
// @Success			200 {object} AddUserBody{} "successfully created user."
// @Router			/users [post]
func AddUser(c *gin.Context) {
	body := AddUserBody{}
	var User models.Users

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Insertion of new record

	// User.User_username = body.User_username

	hash, err := bcrypt.GenerateFromPassword([]byte(body.User_password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash passwoord",
		})
		return
	}

	User.User_names = body.User_names
	User.User_lastnames = body.User_lastnames
	User.User_identification = body.User_identification
	User.User_username = body.User_username
	User.User_password = string(hash)
	User.User_phone = body.User_phone
	User.User_address = body.User_address
	User.Company_id = body.Company_id

	if result := db.DB.Create(&User); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	c.JSON(http.StatusCreated, &User)
}
