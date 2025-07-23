# Quote Collection with User Submissions

This project contains GitHub Actions workflows for managing a quotes repository. It includes functionality for validating JSON format, deploying a simple web page that displays random quotes, and allows users to submit new quotes for approval.

## Features

- **Random Quote Display**: View random inspirational quotes with authors and themes
- **User Quote Submission**: Submit new quotes through a user-friendly web form
- **Automated Processing**: Weekly workflow to process and merge submitted quotes
- **Theme Categorization**: Organize quotes by themes (Success, Wisdom, Life, etc.)
- **JSON Validation**: Automatic validation of quote data format

## Project Structure

- **.github/workflows/**: Contains the GitHub Actions workflows.
  - **check-json-format.yml**: Validates the format of `Quotes.json` on pull requests.
  - **deploy-github-pages.yml**: Deploys the project to GitHub Pages upon merging to the main branch.
  - **weekly-quote-processing.yml**: Processes pending quote submissions weekly.
  
- **Quotes.json**: A JSON file containing an array of quotes, each with quote, author, and optional theme.

- **pending-quotes.json**: Stores user-submitted quotes awaiting review and approval.

- **index.html**: The main HTML document for the GitHub Pages site, displaying random quotes and submission form.

- **script.js**: JavaScript code that fetches and displays random quotes, handles form submissions.

- **server.js**: Optional Node.js server for handling quote submissions in a server environment.

## Setup Instructions

1. Clone the repository to your local machine.
2. Ensure you have a valid `Quotes.json` file in the root directory.
3. Configure GitHub Actions in your repository settings to enable workflows.
4. Create a pull request to validate the JSON format.
5. Merge the pull request to deploy the site to GitHub Pages.

## Usage

### Viewing Quotes
Visit the GitHub Pages URL to see a random quote displayed. Click "Get New Quote" to see different quotes.

### Submitting Quotes
1. Click the "Submit a Quote" button on the main page
2. Fill in the quote text, author name, and select a theme
3. Click "Submit Quote" to add it to the pending review queue
4. Submitted quotes are processed weekly and added to the main collection after review

### Quote Processing
- Quotes are automatically processed every Sunday at 12:00 UTC
- The system creates a pull request with new quotes for review
- After validation, quotes are merged into the main collection

## Quote Format

Quotes in the JSON file follow this structure:
```json
{
  "quote": "The quote text goes here",
  "author": "Author Name",
  "theme": "Theme Category (optional)"
}
```

## Development

To run locally:
1. Start a local web server: `python3 -m http.server 8000`
2. Open `http://localhost:8000` in your browser
3. For server-side submission handling: `node server.js`
