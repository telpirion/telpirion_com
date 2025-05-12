package internal

import (
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"gopkg.in/yaml.v2"
)

const separator = "--------------------------------------------------------------------------------"

type BlogMetadata struct {
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Date        string   `yaml:"date"`
	Slug        string   `yaml:"slug"`
	State       string   `yaml:"state"`
	Tags        []string `yaml:"tags"`
}

func ParseBlog(md []byte) (string, *BlogMetadata, error) {
	parts := strings.Split(string(md), separator)

	html := mdToHTML([]byte(parts[1]))
	metadata := BlogMetadata{}
	err := yaml.Unmarshal([]byte(parts[0]), &metadata)
	if err != nil {
		return "", nil, err
	}
	return string(html), &metadata, nil
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
