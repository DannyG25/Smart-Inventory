package db

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	viper.SetConfigFile("./pkg/common/envs/.env")
	viper.ReadInConfig()
	url := viper.Get("DB_URL").(string)
	db, err := gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		log.Fatalln("Failed to connect DataBase", err)
	}

	// Set database connection to DB variable
	DB = db
	fmt.Println("Database connected")
}
