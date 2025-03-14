#!/bin/bash

# GitHub username and GitHub API URL
GITHUB_USER="aenrione"
GITHUB_API_URL="https://api.github.com/users/$GITHUB_USER/repos"

# Output file where the data will be written
OUTPUT_FILE="data/githubProjects.yaml"

# Fetch the GitHub repositories
echo "Fetching GitHub repositories for user $GITHUB_USER..."

# Fetch repository data using GitHub API
repos=$(curl -s $GITHUB_API_URL)

# Start writing the YAML header
echo "---" > $OUTPUT_FILE

# Loop through the repositories and write the necessary attributes to the YAML file
echo "$repos" | jq -r '.[] | {
    name: .name,
    description: .description,
    html_url: .html_url,
    url: .url
} | "-\n    name: \(.name)\n    description: \(.description)\n    html_url: \(.html_url)\n    url: \(.url)\n" ' >> $OUTPUT_FILE

echo "GitHub repositories data written to $OUTPUT_FILE"

