package internal

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
		Skills            []struct {
			Title       string `json:"title"`
			Description string `json:"description"`
			Icon        string `json:"icon"`
		}
	} `json:"home"`
	Sidebar struct {
		Feed struct {
			Title string `json:"title"`
			Items []struct {
				Title       string `json:"title"`
				Image       string `json:"image,omitempty"`
				Description string `json:"description"`
				Date        string `json:"date"`
				Link        string `json:"link"`
			} `json:"items"`
		} `json:"feed"`
		Nav struct {
			Title string `json:"title"`
			Items []struct {
				Title string `json:"title"`
				Link  string `json:"link"`
				Items []struct {
					Title string `json:"title"`
					Link  string `json:"link"`
				} `json:"items,omitempty"`
			} `json:"items"`
		} `json:"nav"`
		Contact struct {
			Title       string `json:"title"`
			Description string `json:"description"`
			Items       []struct {
				Title string `json:"title"`
				Link  string `json:"link"`
				Icon  string `json:"icon"`
			} `json:"items"`
		}
		Footer struct {
			Copyright string `json:"copyright"`
		} `json:"footer"`
	} `json:"sidebar"`
}
