/*
	  Main / server for Telpirion.com site.

	  @author Eric Schmidt
	  @version 2.0 2025/05/16
	  @copyright Eric Schmidt

	 	Routes in this application:
	 	/
		/about
		/apps
		/apps/[id]
		/apps/[id]
		/apps/[id]
		/blog
		/blog/[slug]
		/games/vikings
		/games/yahtzy
		/games/conway
		/projects
		/publications
*/
package main

import (
	"encoding/json"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strings"

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
var blogsDict = map[string]internal.BlogMetadata{}
var pubsDict = map[string]internal.ListItemMetadata{}
var appsDict = map[string]internal.ListItemMetadata{}
var projectsDict = map[string]internal.ListItemMetadata{}
var logger = log.Default()

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

	logger.Println("Reading blogs...")
	blogs, err := getBlogs("./content/blog")
	if err != nil {
		log.Fatal(err)
	}
	blogsMetadata = blogs

	logger.Println("Reading publications...")
	pubsDict, err = getJSONLItems("./content/publications/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading apps...")
	appsDict, err = getJSONLItems("./content/apps/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading projects...")
	projectsDict, err = getJSONLItems("./content/projects/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

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
	var appsSlice []internal.ListItemMetadata
	for _, item := range appsDict {
		appsSlice = append(appsSlice, item)
	}
	c.HTML(200, "generic.html",
		gin.H{
			"Title": "Apps",
			"Items": appsSlice,
		})
}

func blogsHandler(c *gin.Context) {
	c.HTML(200, "blogs.html", gin.H{
		"Title": "Blog",
		"Items": blogsMetadata,
	})
}

func blogHandler(c *gin.Context) {

	id := c.Param("slug")
	log.Println(id)

	blog := blogsDict[id]

	md, err := os.ReadFile(blog.Filepath)
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
		"Subpath": "blog",
		"Content": template.HTML(string(html)),
	})
}

func gamesHandler(c *gin.Context) {
	c.HTML(200, "generic.html", uiStrings)
}

func projectsHandler(c *gin.Context) {
	var projectsSlice []internal.ProjectMetadata
	for _, item := range projectsDict {
		proj := internal.ProjectMetadata{ListItemMetadata: item}
		projectsSlice = append(projectsSlice, proj)
	}

	c.HTML(200, "list.html", gin.H{
		"Title": "Projects",
		"Items": projectsSlice,
	})
}

func publicationsHandler(c *gin.Context) {
	var pubsSlice []internal.PublicationMetadata
	for _, item := range pubsDict {
		pub := internal.PublicationMetadata{ListItemMetadata: item}
		pubsSlice = append(pubsSlice, pub)
	}

	c.HTML(200, "list.html", gin.H{
		"Title": "Publications",
		"Items": pubsSlice,
	})
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
		metadata.Filepath = path

		blogs = append(blogs, *metadata)
		blogsDict[metadata.Slug] = *metadata

		return nil
	})
	return blogs, err
}

func getJSONLItems(path string) (map[string]internal.ListItemMetadata, error) {

	var itemsDict = map[string]internal.ListItemMetadata{}
	fs, err := os.ReadFile(path)
	if err != nil {
		return itemsDict, err
	}

	itemStrs := strings.Split(string(fs), "\n")
	for _, pubStr := range itemStrs {
		if pubStr == "" {
			continue
		}

		item := internal.ListItemMetadata{}
		err = json.Unmarshal([]byte(pubStr), &item)
		if err != nil {
			return itemsDict, err
		}

		itemsDict[item.ID] = item
	}

	return itemsDict, nil
}
