package router

import (
	"net/http"

	"github.com/gin-backend/pkg/controller/impuesto"
	"github.com/gin-backend/pkg/controller/mark"
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

	impuestosRouter := baseRouter.Group("/impuestos")
	impuestosRouter.POST("/", impuesto.AddImpuesto)
	impuestosRouter.GET("/", impuesto.GetImpuestos)
	impuestosRouter.GET("/:id", impuesto.GetImpuesto)
	impuestosRouter.PUT("/", impuesto.UpdateImpuesto)
	impuestosRouter.DELETE("/:id", impuesto.DeleteImpuesto)

	return router
}
