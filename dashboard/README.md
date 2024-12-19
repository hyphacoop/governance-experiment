# Governance Dashboard

## Overview

This dashboard is part of Hypha's **Governance Experiment**, a collaborative project exploring decentralized decision-making and visual storytelling.
You can explore the dashboard live on GitHub Pages:  
- **Dashboard:** [https://hyphacoop.github.io/governance-experiment/](https://hyphacoop.github.io/governance-experiment/)

This dashboard is a static frontend application designed to facilitate collaborative decision-making and visualize the results. The project integrates multiple APIs (Google, GitHub, and an Earthstar server) to provide a seamless experience for users. This document covers installation, configuration, component details, and API interactions to help users and developers get started.

This interface integrates multiple APIs to gather data from different sources into a cohesive dashboard. It was built around the following [decision log template](https://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Using the Dashboard](#usage)
- [Deployment](#deployment)
- [Possible Usage without APIs](#possible-usage-without-apis)
- [API Integration Guide](#api-integration-guide)
- [Environment Variables](#environment-variables)
- [Component Details](#component-details)
- [User and Developer Guide](#user-and-developer-guide)
- [How it all works together](#how-it-all-works-together)

## Features

- **Proposals Table:** Display proposals.
- **Vote Results:** Fetch vote results from Earthstar server.
- **Decision Log:** Load and display decision logs.
- **Graphs:** Visualize data using different graphs.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/hyphacoop/governance-experiment.git
    cd governance-experiment/dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Usage
## Possible Usage without APIs

It is possible to load the decision log manually as CSV. Follow the instructions in the next section, Loading Decision Log.
### Loading Decision Log

This dashboard was built around the following [decision log template](https://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing):

1. Find the 'Decision Log' Sheet and download it as CSV.
2. On the dashboard, navigate to the "Decision Log" section.
3. Click on "Load CSV" and load the decision log file.

## Deployment

This dashboard is deployed on GitHub Pages. The [deploy.sh](http://_vscodecontentref_/0) script automatically builds both the dashboard and the timeline and deploys it to this repository's GitHub page.

## API Integration Guide

- These integrations enable seamless data sharing, decentralized vote tracking, and real-time visualization of governance activities.

### Google API

- **Purpose:** Fetches decision log data from Google Sheets and authenticates users.
- **Interactions:**
    - `GoogleAuth.svelte` handles user login and token generation using OAuth2.
    - `utils.js` processes data retrieved from Google Sheets.
- **Setup Instructions:**
    1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
    2. Create a new project.
    3. Enable the "Google Sheets API" and "Google Drive API."
    4. Navigate to "Credentials" and create an OAuth2 client ID.
    5. Set the redirect URI to match your application's domain (e.g., http://localhost:5173 during development).
    6. Copy the client ID, client secret, and API key into your `.env` file.

### GitHub API

- **Purpose:** Integrates GitHub project boards for issue tracking and collaboration.
- **Interactions:**
    - `GithubAuth.svelte` authenticates users via OAuth2.
    - `GithubIssues.svelte` fetches and displays GitHub issues.
    - For security reasons, GitHub OAuth uses a proxy server function to handle the GitHub secret token.
- **Setup Instructions:**
    1. Go to the [GitHub Developer Settings](https://github.com/settings/developers).
    2. Register a new OAuth application.
    3. Set the callback URL to your application's domain (e.g., http://localhost:5173 during development).
    4. Copy the client ID and client secret into your `.env` file.

### Earthstar

- **Purpose:** Manages decentralized data storage and voting results.
- **Interactions:**
    - `FetchVotes.svelte` retrieves vote results from Earthstar.
    - Voting results are fetched from the Earthstar server and displayed using components like `BarGraph.svelte` and `LineGraph.svelte`.
- **Setup Instructions:**
    1. Deploy an Earthstar server or use an existing one. To host your own voting events, you need to run your own Earthstar server. Templates are available to help you deploy an Earthstar server efficiently.
    2. Obtain your Earthstar address and secret key.
    3. Add these values to the `.env` file under `VITE_SERVER_ADDRESS`, `VITE_ADDRESS`, and `VITE_SECRET`.

## Environment Variables

The `.env` file is essential for connecting the dashboard to the required APIs. You will find a list of these variables in the `.env.example` file.

### Example `.env` file
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
VITE_GOOGLE_API_KEY=your-google-api-key
VITE_GITHUB_CLIENT_ID=your-github-client-id
VITE_GITHUB_CLIENT_SECRET=your-github-client-secret
VITE_SERVER_ADDRESS=your-earthstar-server-address
VITE_ADDRESS=your-earthstar-address
VITE_SECRET=your-earthstar-secret
```

## Component Details

- `App.svelte`: The main application component that initializes and renders the dashboard.
- `GoogleAuth.svelte`: Handles Google authentication.
- `GithubAuth.svelte`: Handles GitHub authentication.
- `DecisionLog.svelte`: Displays the decision log data.
- `GithubIssues.svelte`: Displays GitHub issues.
- `BarGraph.svelte`: Visualizes vote results in a bar graph.
- `LineGraph.svelte`: Visualizes vote results in a line graph.

- `FetchVotes.svelte`: Fetches vote results from Earthstar.

## User and Developer Guide

### For Users

- Obtain access credentials for the required services (Google, GitHub).
- Follow the installation and setup steps to configure the dashboard.
- Authenticate with Google and GitHub when prompted during usage.
- View decision logs, voting results, and GitHub issues via the dashboard interface.

### For Developers

- Ensure you have accounts set up for Google Cloud, GitHub, and Earthstar.
- Populate the `.env` file with your credentials.
- Use the development server (`npm run dev`) to test API integrations.
- Modify and extend components as needed for additional functionality.

## How it all works together

### Authentication Flow

- Users authenticate with Google and GitHub to access their respective features:
    - Google authentication grants access to decision logs in Google Sheets.
    - GitHub authentication retrieves project board issues for governance tasks.

### Data Flow

- **Google Sheets:** Decision logs are loaded and processed to populate the `DecisionLog.svelte` component.
- **GitHub:** Issues are fetched and displayed in the `GithubIssues.svelte` component.
- **Earthstar:** Vote results are fetched from the Earthstar server and visualized using `BarGraph.svelte` and `LineGraph.svelte`.

### Integration

- Each API provides specific functionality that enhances the overall governance process. For instance, Google Sheets enables easy data sharing, while Earthstar ensures decentralized and secure vote tracking.

### Contribution Guidelines

If you'd like to contribute to this project:

   - Fork the repository and create a new branch for your feature or bugfix.
   - Submit a pull request with a clear description of your changes.


### Open Issue Guidelines

If you encounter any bugs or have suggestions for improvements, please follow these guidelines to open an issue:

1. **Search Existing Issues**: Before opening a new issue, please check if the issue has already been reported. This helps avoid duplicates and allows us to focus on existing issues.

2. **Create a New Issue**: If you don't find an existing issue, create a new one. Click on the "New Issue" button in the Issues section of the repository.

3. **Provide a Clear Title**: Use a descriptive title that clearly summarizes the issue or suggestion.

4. **Describe the Issue**: Provide a detailed description of the issue. Include steps to reproduce the problem, expected behavior, and actual behavior. If applicable, include screenshots or code snippets to help illustrate the issue.

5. **Label the Issue**: Use appropriate labels to categorize the issue (e.g., bug, enhancement, question). This helps maintainers prioritize and manage issues more effectively.

6. **Include Environment Details**: Specify the environment in which the issue occurred, including operating system, browser, and any relevant configuration details.

7. **Follow Up**: If you have additional information or updates regarding the issue, please add comments to the issue thread. This helps maintainers track progress and gather more context.

By following these guidelines, you help us address issues more efficiently and improve the overall quality of the project. Thank you for your contributions!