package router

import (
	"net/http"

	"github.com/gin-backend/pkg/controller/category"
	"github.com/gin-backend/pkg/controller/mark"
	"github.com/gin-backend/pkg/controller/product"
	"github.com/gin-backend/pkg/controller/tax"
	"github.com/gin-backend/pkg/controller/unit_measure"
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
	marksRouter.POST("/", mark.AddMark)
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

	categoriesRouter := baseRouter.Group("/categories")
	categoriesRouter.POST("/", category.AddCategory)
	categoriesRouter.GET("/", category.GetCategories)
	categoriesRouter.GET("/:id", category.GetCategory)
	categoriesRouter.PUT("/", category.UpdateCategory)
	categoriesRouter.DELETE("/:id", category.DeleteCategory)

	unit_measuresRouter := baseRouter.Group("/unit_measures")
	unit_measuresRouter.POST("/", unit_measure.AddUnit_Measure)
	unit_measuresRouter.GET("/", unit_measure.GetUnit_Measures)
	unit_measuresRouter.GET("/:id", unit_measure.GetUnit_Measure)
	unit_measuresRouter.PUT("/", unit_measure.UpdateUnit_Measure)
	unit_measuresRouter.DELETE("/:id", unit_measure.DeleteUnit_Measure)

	productsRouter := baseRouter.Group("/products")
	productsRouter.POST("/", product.AddProduct)
	// productsRouter.GET("/", product.GetUnit_Measures)
	// productsRouter.GET("/:id", product.GetUnit_Measure)
	// productsRouter.PUT("/", product.UpdateUnit_Measure)
	// productsRouter.DELETE("/:id", product.DeleteUnit_Measure)

	return router
}
