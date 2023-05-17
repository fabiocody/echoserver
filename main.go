package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
	log.SetReportCaller(true)
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/", echoGet)
	r.POST("/", echoPost)
	log.Info("Running")
	err := r.Run()
	if err != nil {
		log.Fatal(err)
	}
}

func echoGet(c *gin.Context) {
	headers := c.Request.Header
	query := c.Request.URL.Query()
	payload := gin.H{"headers": headers, "query": query}
	log.Info(payload)
	c.IndentedJSON(http.StatusOK, payload)
}

func echoPost(c *gin.Context) {
	headers := c.Request.Header
	body := c.Request.Body
	payload := gin.H{"headers": headers, "body": body}
	log.Println(payload)
	c.IndentedJSON(http.StatusOK, payload)
}
