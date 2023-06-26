package antena

import (
	"encoding/json"
	// "fmt"
	"log"
	"net/http"
	"sync"

	"github.com/chirpstack/chirpstack/api/go/v4/integration"
	"github.com/gin-backend/pkg/common/db"
	"github.com/gin-backend/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type AddAntennaBody struct {
	Id_product uint
}

type Handler struct {
	JSON      bool
	Messages  chan string
	Clients   map[chan string]struct{}
	ClientsMu sync.Mutex
}

func NewHandler() *Handler {
	return &Handler{
		Clients: make(map[chan string]struct{}),
	}
}

func (h *Handler) Up(c *gin.Context) {
	var up integration.UplinkEvent
	if err := Unmarshal(c.Request.Body, &up, h.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payload := string(up.Data)
	log.Printf("Uplink received from %s with payload: %s", up.GetDeviceInfo().DevEui, payload)
	c.JSON(http.StatusOK, gin.H{"message": "uplink processed"})

	h.ClientsMu.Lock()
	for client := range h.Clients {
		client <- payload
	}
	h.ClientsMu.Unlock()

}

func (h *Handler) Join(c *gin.Context) {
	var join integration.JoinEvent
	if err := Unmarshal(c.Request.Body, &join, h.JSON); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Device %s joined with DevAddr %s", join.GetDeviceInfo().DevEui, join.DevAddr)
	c.JSON(http.StatusOK, gin.H{"message": "join processed"})
}

func (h *Handler) Stream(c *gin.Context) {
	h.ServeSSE(c)
}

func (h *Handler) ServeSSE(c *gin.Context) {

	body := AddAntennaBody{}
	var Product models.Product

	// Product.Children_pro = children

	// c.JSON(http.StatusOK, &Product)

	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("Access-Control-Allow-Origin", "http://localhost:4200")

	client := make(chan string)
	h.ClientsMu.Lock()
	h.Clients[client] = struct{}{}
	h.ClientsMu.Unlock()

	defer func() {
		h.ClientsMu.Lock()
		delete(h.Clients, client)
		h.ClientsMu.Unlock()
	}()

	for {
		select {
		case message := <-client:

			if err := json.Unmarshal([]byte(message), &body); err != nil {
				c.AbortWithError(http.StatusNotFound, err)
				return
			}

			if result := db.DB.Preload("Category").Preload("Tax").Preload("Unit_measure").Where("id  = ?", body.Id_product).First(&Product); result.Error != nil {
				c.AbortWithError(http.StatusNotFound, result.Error)
				return
			}
			// log.Printf("Objetc Product: %s", &Product)
			c.SSEvent("message", &Product) // Envía el evento SSE con el tipo "message" y el contenido del mensaje

			// c.JSON(http.StatusOK, &Product)
			c.Writer.Flush()
		case <-c.Writer.CloseNotify():
			return
		}
	}
}
