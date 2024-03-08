/**
 * Main / server for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2024/03/07
 * @copyright Eric Schmidt
 */
package main

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile("./ng", false)))
	r.Use(static.Serve("/favicon.ico", static.LocalFile("./favicon.ico", true)))
	r.Use(static.Serve("/images", static.LocalFile("./images", true)))
	r.Use(static.Serve("/gsrc", static.LocalFile("./gsrc", true)))
	r.NoRoute(func(c *gin.Context) {
		c.File("./ng/index.html")
	})
	r.Run()
}
