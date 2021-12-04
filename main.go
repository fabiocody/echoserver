package main

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	setupLogger()
	r := gin.Default()
	r.GET("/", echoGet)
	r.POST("/", echoPost)
	err := r.Run()
	handleErr(err)
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

func setupLogger() {
	log.SetFormatter(&log.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
	log.SetReportCaller(true)
	log.Info("Running")
}

func handleErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
