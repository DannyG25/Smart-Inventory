package users

import (
	"net/http"
	"time"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type LoginUserBody struct {
	User_username string
	User_password string
}

// CreateUsers		godoc
// @Summary			Create users
// @Description		Save users data in Db.
// @Param			users body LoginUserBody{} true "Create users"
// @Produce			application/json
// @Tags			users
// @Success			200 {object} LoginUserBody{} "successfully created user."
// @Router			/users [post]
func LoginUser(c *gin.Context) {
	body := LoginUserBody{}
	var User models.Users

	//Check data in json format
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	db.DB.First(&User, "user_username = ?", body.User_username)

	if User.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username",
		})
		return
	}

	error := bcrypt.CompareHashAndPassword([]byte(User.User_password), []byte(body.User_password))

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid password",
		})
		return
	}

	//Generate a JWT Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": User.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	//sign and get comple encoded token as a string using the secret
	viper.SetConfigFile("./pkg/common/envs/.env")
	viper.ReadInConfig()
	hmac := viper.Get("SECRET").(string)
	tokenString, error := token.SignedString([]byte(hmac))

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, false)

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, user)
}
