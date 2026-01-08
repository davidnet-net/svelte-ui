#!/bin/bash

FONT_FILE="$1"

if [ -z "$FONT_FILE" ]; then
  echo "Usage: ./get_ligs.sh <path_to_font.ttf>"
  exit 1
fi

# Check if ttx is installed
if ! command -v ttx &> /dev/null; then
    echo "Error: ttx is not installed. Please run: sudo apt install fonttools"
    exit 1
fi

echo "Extracting ligatures... (this may take a moment for large fonts)" >&2

# 1. ttx dumps the GSUB table to stdout (-o -) quietly (-q)
# 2. We grep for lines defining Ligatures
# 3. We extract the 'glyph="name"' part
# 4. We sort and format them
ttx -q -t GSUB -o - "$FONT_FILE" \
  | grep -o 'glyph="[^"]*"' \
  | cut -d'"' -f2 \
  | sort -u \
  | awk '{printf "\"%s\", ", $0}' \
  | sed 's/ | $//' # Remove the trailing separator

echo "" # New line at the end
