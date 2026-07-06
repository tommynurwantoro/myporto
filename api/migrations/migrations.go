package migrations

import "embed"

//go:embed *.sql
var FS embed.FS

// Order lists migration files in apply order.
var Order = []string{
	"001_create_signatures.sql",
	"002_image_path_optional.sql",
}
