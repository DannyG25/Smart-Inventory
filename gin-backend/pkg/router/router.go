package router

import (
	"net/http"

	"github.com/gin-backend/pkg/controller/mark"
	"github.com/gin-backend/pkg/controller/tax"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Routers() *gin.Engine {
	router := gin.Default()

	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "welcome home")
	})

	baseRouter := router.Group("/api")

	marksRouter := baseRouter.Group("/marks")
	marksRouter.POST("/", mark.Addmark)
	marksRouter.GET("/", mark.GetMarks)
	marksRouter.GET("/:id", mark.GetMark)
	marksRouter.PUT("/", mark.UpdateMark)
	marksRouter.DELETE("/:id", mark.DeleteMark)

	taxsRouter := baseRouter.Group("/taxs")
	taxsRouter.POST("/", tax.AddTax)
	taxsRouter.GET("/", tax.GetTaxs)
	taxsRouter.GET("/:id", tax.GetTax)
	taxsRouter.PUT("/", tax.UpdateTax)
	taxsRouter.DELETE("/:id", tax.DeleteTax)

	return router
}
