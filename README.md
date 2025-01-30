# My GitHub Workflows

This project contains GitHub Actions workflows for managing a quotes repository. It includes functionality for validating JSON format and deploying a simple web page that displays random quotes.

## Project Structure

- **.github/workflows/**: Contains the GitHub Actions workflows.
  - **check-json-format.yml**: Validates the format of `quotes.json` on pull requests.
  - **deploy-github-pages.yml**: Deploys the project to GitHub Pages upon merging to the main branch.
  
- **quotes.json**: A JSON file containing an array of quotes, each with an associated author.

- **index.html**: The main HTML document for the GitHub Pages site, displaying a random quote.

- **script.js**: JavaScript code that fetches and displays a random quote from `quotes.json` on page reload.

## Setup Instructions

1. Clone the repository to your local machine.
2. Ensure you have a valid `quotes.json` file in the root directory.
3. Configure GitHub Actions in your repository settings to enable workflows.
4. Create a pull request to validate the JSON format.
5. Merge the pull request to deploy the site to GitHub Pages.

## Usage

Visit the GitHub Pages URL to see a random quote displayed each time the page is refreshed.