package main

import (
	"net/http"

	_ "github.com/gin-backend/docs"

	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/helper"
	"github.com/gin-backend/pkg/router"
	"github.com/spf13/viper"
)

// @title 	Tag Service API
// @version	1.0
// @description A Tag service API in Go using Gin framework

// @host 	localhost:3000
// @BasePath /api
func main() {
	viper.SetConfigFile("./pkg/common/envs/.env")
	viper.ReadInConfig()

	port := viper.Get("PORT").(string)

	//Database
	db.Init()

	//Router
	routes := router.Routers()

	// routes.Run(port)

	server := &http.Server{
		Addr:    port,
		Handler: routes,
	}

	err := server.ListenAndServe()
	helper.ErrorPanic(err)
}
