package db

import (
	"fmt"
	"log"

	"github.com/gin-backend/pkg/common/models"
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
	error := db.AutoMigrate(
		//
		&models.Tax{},
		&models.Category{},
		&models.Unit_measure{},
		&models.Company{},
		&models.Company_detail{},
		&models.Movement{},
		&models.Device{},
		&models.Inventory_detail{},
		&models.Inventory_header{},
		&models.Mark{},
		&models.Menu{},
		&models.Product{},
		&models.Transaction{},
		&models.Transaction_detail{},
		&models.Binnacle{},
		&models.Users{},
		&models.Rol{},
		&models.Users_Rol{},
		&models.Rol_menu{},
	)
	if error != nil {
		log.Fatalln("Failed to create tables", err)
	}
	fmt.Println("Database connected")
}
