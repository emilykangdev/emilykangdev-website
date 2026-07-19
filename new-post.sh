#!/usr/bin/env bash
# new-post.sh — scaffold a new blog post for the portfolio website
# Usage: ./new-post.sh "Post Title" "YYYY-MM-DD" "series-name" "topic1,topic2" "product-name"
#
# Conventions:
#   - Posts live in content/blog/ as .mdx files
#   - Filename: kebab-case version of the title
#   - issue number is auto-incremented from the highest existing issue
#   - pubDate format: "YYYY-MM-DD"
#   - All posts get: title, description, pubDate, issue, draft, series, topics
#   - Product posts also get a `product` field
#   - Topics are an array of lowercase kebab-case strings

set -euo pipefail

TITLE="${1:?Usage: $0 \"Post Title\" \"YYYY-MM-DD\" \"series-name\" \"topic1,topic2\" [\"product-name\"]}"
PUBDATE="${2:?Missing pubDate}"
SERIES="${3:?Missing series}"
TOPICS_RAW="${4:?Missing topics (comma-separated)}"
PRODUCT="${5:-}"

PORTFOLIO_DIR="$(cd "$(dirname "$0")" && pwd)"
BLOG_DIR="$PORTFOLIO_DIR/content/blog"

# Auto-increment issue number
HIGHEST_ISSUE=$(grep -rh 'issue:' "$BLOG_DIR"/*.mdx 2>/dev/null | sed 's/issue: *//' | sort -n | tail -1)
NEXT_ISSUE=$((HIGHEST_ISSUE + 1))

# Generate kebab-case filename from title
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//').mdx

# Format topics as YAML array
TOPICS_YAML="[$(echo "$TOPICS_RAW" | sed 's/, */", "/g' | sed 's/^/" /;s/$/"/')]"

# Build frontmatter
cat > "$BLOG_DIR/$FILENAME" <<MDX
---
title: "$TITLE"
description: ""
pubDate: "$PUBDATE"
issue: $NEXT_ISSUE
draft: true
series: "$SERIES"
$([ -n "$PRODUCT" ] && echo "product: \"$PRODUCT\"")topics: $TOPICS_YAML
---

MDX

echo "Created: $BLOG_DIR/$FILENAME"
echo "Issue: $NEXT_ISSUE"
echo "Fill in the description and body, then set draft: false when ready."