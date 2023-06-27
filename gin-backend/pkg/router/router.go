package router

import (
	"net/http"

	"github.com/gin-backend/pkg/controller/antena"
	"github.com/gin-backend/pkg/controller/binnacle"
	"github.com/gin-backend/pkg/controller/category"
	"github.com/gin-backend/pkg/controller/company"
	"github.com/gin-backend/pkg/controller/company_detail"
	"github.com/gin-backend/pkg/controller/device"
	"github.com/gin-backend/pkg/controller/mark"
	"github.com/gin-backend/pkg/controller/movement"
	"github.com/gin-backend/pkg/controller/product"
	"github.com/gin-backend/pkg/controller/tax"
	"github.com/gin-backend/pkg/controller/transaction"
	"github.com/gin-backend/pkg/controller/unit_measure"
	"github.com/gin-backend/pkg/controller/users"
	"github.com/gin-backend/pkg/middleware"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Routers() *gin.Engine {
	router := gin.Default()

	// router.Use(func(c *gin.Context) {
	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200") // Cambiar a la URL de tu cliente Angular
	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	// 	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	// 	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true") // Habilitar las cookies en las solicitudes

	// 	fmt.Println("Middleware de CORS ejecutándose")
	// 	c.Next()
	// })

	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "welcome home")
	})

	baseRouter := router.Group("/api")

	marksRouter := baseRouter.Group("/marks")
	//marksRouter.POST("/", mark.AddMark)
	marksRouter.POST("/", middleware.RequireAuth, mark.AddMark)
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
	productsRouter.GET("/", product.GetProducts)
	productsRouter.GET("/:id", product.GetProduct)
	productsRouter.PUT("/", product.UpdateProduct)
	productsRouter.DELETE("/:id", product.DeleteProduct)

	companiesRouter := baseRouter.Group("/companies")
	companiesRouter.POST("/", company.AddCompany)
	companiesRouter.GET("/", company.GetCompanies)
	companiesRouter.GET("/:id", company.GetCompany)
	companiesRouter.PUT("/", company.UpdateCompany)
	companiesRouter.DELETE("/:id", company.DeleteCompany)

	usersRouter := baseRouter.Group("/users")
	usersRouter.POST("/", users.AddUser)
	usersRouter.GET("/", users.GetUsers)
	// usersRouter.GET("/:id", users.Get)
	usersRouter.PUT("/", users.UpdateUser)
	usersRouter.DELETE("/:id", users.DeleteUser)
	usersRouter.POST("/login", users.LoginUser)
	usersRouter.GET("/validate", middleware.RequireAuth, users.Validate)

	devicesRouter := baseRouter.Group("/devices")
	devicesRouter.POST("/", device.AddDevice)
	devicesRouter.GET("/", device.GetDevices)
	devicesRouter.GET("/:id", device.GetDevice)
	devicesRouter.GET("/devicesid/:id", device.GetDevicesID)
	devicesRouter.PUT("/", device.UpdateDevice)
	devicesRouter.DELETE("/:id", device.DeleteDevice)

	movementsRouter := baseRouter.Group("/movements")
	movementsRouter.POST("/", movement.AddMovement)
	movementsRouter.GET("/", movement.GetMovements)
	movementsRouter.GET("/:id", movement.GetMovement)
	movementsRouter.PUT("/", movement.UpdateMovement)
	movementsRouter.DELETE("/:id", movement.DeleteMovement)

	binnaclesRouter := baseRouter.Group("/binnacles")
	binnaclesRouter.POST("/", binnacle.AddBinnacle)
	binnaclesRouter.GET("/", binnacle.GetBinnacles)
	binnaclesRouter.GET("/:id", binnacle.GetBinnacle)
	binnaclesRouter.GET("/binnaclesid/:id", binnacle.GetBinnaclesID)
	binnaclesRouter.PUT("/", binnacle.UpdateBinnacle)
	binnaclesRouter.DELETE("/:id", binnacle.DeleteBinnacle)

	company_detailsRouter := baseRouter.Group("/company_details")
	company_detailsRouter.POST("/", company_detail.AddCompany_Detail)
	company_detailsRouter.GET("/", company_detail.GetCompany_Details)
	company_detailsRouter.GET("/:id", company_detail.GetCompany_Detail)
	company_detailsRouter.PUT("/", company_detail.UpdateCompany_Detail)
	company_detailsRouter.DELETE("/:id", company_detail.DeleteCompany_Detail)

	antenna := antena.NewHandler()
	antennaRouter := baseRouter.Group("/antenna")
	antennaRouter.POST("/up", antenna.Up)
	antennaRouter.POST("/join", antenna.Join)
	antennaRouter.GET("/stream", antenna.Stream)

	transactionsRouter := baseRouter.Group("/transactions")
	transactionsRouter.POST("/", transaction.AddTransaction)
	transactionsRouter.GET("/", transaction.GetTransactions)
	transactionsRouter.GET("/:id", transaction.GetTransaction)
	transactionsRouter.PUT("/", transaction.UpdateTransaction)
	transactionsRouter.DELETE("/:id", transaction.DeleteTransaction)

	return router
}
