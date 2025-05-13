/**
 * Main / server for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2024/03/07
 * @copyright Eric Schmidt
 */
package main

import (
	"encoding/json"
	"html/template"
	"log"
	"os"
	"path/filepath"

	"github.com/telpirion/telpirion_com/internal"

	"github.com/gin-gonic/gin"
)

type UIStrings struct {
	Title string `json:"title"`
	Home  struct {
		Title             string `json:"title,omitempty"`
		Hello             string `json:"hello"`
		Subtitle          string `json:"subtitle"`
		SubtitleContinued string `json:"subtitleContinued"`
		AboutMe           string `json:"aboutMe"`
		HeroImageSrc      string `json:"heroImageSrc"`
		HeroImageAlt      string `json:"heroImageAlt"`
	} `json:"home"`
	Blog struct {
		Title string `json:"title"`
	} `json:"blog"`
}

var uiStrings UIStrings
var blogsMetadata = []internal.BlogMetadata{}

/**
Routes to define:

/
/about
/apps
/apps/latin-reader-android
/apps/latin-reader-windows
/apps/my-herodotus
/blog
/blog/[slug]
/games/vikings
/games/yahtzy
/games/conway
/projects
/publications
*/

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/*.html")
	r.Static("/assets", "./static")
	r.Static("/images", "./images")
	//r.Static("/css", "../site/css")
	r.StaticFile("/favicon.ico", "./favicon.ico")

	// Read the text strings
	jsonFile, err := os.ReadFile("./content/strings.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(jsonFile, &uiStrings)
	if err != nil {
		log.Fatal(err)
	}

	blogs, err := getBlogs("./content/blog")
	if err != nil {
		log.Fatal(err)
	}
	blogsMetadata = blogs

	r.GET("/home", homeHandler)
	r.GET("/", homeHandler)
	r.GET("/about", aboutHandler)
	r.GET("/apps", appsHandler)
	r.GET("/games", gamesHandler)
	r.GET("/projects", projectsHandler)
	r.GET("/publications", publicationsHandler)
	r.GET("/blog", blogsHandler)
	r.GET("/blog/:slug", blogHandler)

	r.NoRoute(func(c *gin.Context) {
		c.File("./src/index.html")
	})
	log.Fatal(r.Run(":8080"))
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", uiStrings)
}

func aboutHandler(c *gin.Context) {
	c.HTML(200, "elements.html", uiStrings)
}

func appsHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func blogsHandler(c *gin.Context) {
	c.HTML(200, "list.html", gin.H{
		"Title": "Blog",
		"Items": blogsMetadata,
	})
}

func blogHandler(c *gin.Context) {

	id := c.Param("slug")
	log.Println(id)

	md, err := os.ReadFile("./content/blog/migrating-a-site.md")
	if err != nil {
		log.Fatal(err)
	}

	html, metadata, err := internal.ParseBlog(md)
	if err != nil {
		log.Fatal(err)
	}

	c.HTML(200, "blog.html", gin.H{
		"Title":   metadata.Title,
		"Date":    metadata.Date,
		"Content": template.HTML(string(html)),
	})
}

func gamesHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func projectsHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func publicationsHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func getBlogs(path string) ([]internal.BlogMetadata, error) {
	var blogs []internal.BlogMetadata

	err := filepath.Walk(path, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}

		fs, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		_, metadata, err := internal.ParseBlog(fs)
		if err != nil {
			return err
		}

		blogs = append(blogs, *metadata)

		return nil
	})
	return blogs, err
}
