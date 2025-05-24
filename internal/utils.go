package internal

import (
	"encoding/json"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"gopkg.in/yaml.v2"
)

const separator = "--------------------------------------------------------------------------------"

type ListItemMetadata struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Image       string   `json:"image"`
	Url         string   `json:"url"`
	Tags        []string `json:"tags"`
	CodeURL     string   `json:"codeUrl,omitempty"`
}

type BlogMetadata struct {
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Date        string   `yaml:"date"`
	Slug        string   `yaml:"slug"`
	State       string   `yaml:"state"`
	Tags        []string `yaml:"tags"`
	Filepath    string   `yaml:"filepath"`
}

type PublicationMetadata struct {
	ListItemMetadata
	Host string `json:"host"`
	Date string `json:"date"`
}

type ProjectMetadata struct {
	ListItemMetadata
}

type GameMetadata struct {
	ListItemMetadata
	JS   string `json:"jsSrc"`
	CSS  string `json:"cssSrc"`
	HTML string `json:"htmlSrc"`
}

type AppMetadata struct {
	ListItemMetadata
}

func ParseBlog(md []byte) (string, *BlogMetadata, error) {
	parts := strings.Split(string(md), separator)

	html := Markdown([]byte(parts[1]))
	metadata := BlogMetadata{}
	err := yaml.Unmarshal([]byte(parts[0]), &metadata)
	if err != nil {
		return "", nil, err
	}
	return string(html), &metadata, nil
}

func ParsePublication(pub string) ([]PublicationMetadata, error) {
	var publications []PublicationMetadata

	err := json.Unmarshal([]byte(pub), &publications)
	if err != nil {
		return nil, err
	}

	return publications, nil
}

func Markdown(md []byte) []byte {
	// Create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs | parser.NoEmptyLineBeforeBlock | parser.Mmark
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse(md)

	// Create HTML renderer with extensions
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return markdown.Render(doc, renderer)
}
