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
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"gopkg.in/yaml.v3"
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

type BlogMetadata struct {
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Date        string   `yaml:"date"`
	Slug        string   `yaml:"slug"`
	State       string   `yaml:"state"`
	Tags        []string `yaml:"tags"`
}

const separator = "--------------------------------------------------------------------------------"

var uiStrings UIStrings

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
	r.LoadHTMLGlob("src/*.html")
	r.Static("/assets", "./src/assets")
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

	r.GET("/home", homeHandler)
	r.GET("/", homeHandler)
	r.GET("/about", aboutHander)
	r.GET("/apps", appsHandler)
	r.GET("/games", gamesHandler)
	r.GET("/projects", projectsHandler)
	r.GET("/publications", publicationsHandler)
	r.GET("/blog/:slug", blogHandler)

	r.NoRoute(func(c *gin.Context) {
		c.File("./src/index.html")
	})
	log.Fatal(r.Run(":8080"))
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", uiStrings)
}

func aboutHander(c *gin.Context) {
	c.HTML(200, "elements.html", uiStrings)
}

func appsHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func blogHandler(c *gin.Context) {

	id := c.Param("slug")
	log.Println(id)

	md, err := os.ReadFile("./content/blog/migrating-a-site.md")
	if err != nil {
		log.Fatal(err)
	}
	parts := strings.Split(string(md), separator)

	html := mdToHTML([]byte(parts[1]))
	metadata := BlogMetadata{}
	err = yaml.Unmarshal([]byte(parts[0]), &metadata)
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

func mdToHTML(md []byte) []byte {
	// create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs | parser.NoEmptyLineBeforeBlock | parser.Mmark
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse(md)

	// create HTML renderer with extensions
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return markdown.Render(doc, renderer)
}
