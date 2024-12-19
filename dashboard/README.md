# Governance Dashboard

## Overview

This dashboard is a static frontend application designed to facilitate collaborative decision-making and visualize the results. The project integrates multiple APIs (Google, GitHub, and an Earthstar server) to provide a seamless experience for users. This document covers installation, configuration, component details, and API interactions to help users and developers get started.

This interface integrates multiple APIs to gather data from different sources into a cohesive dashboard. It was built around the following [decision log template](https://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing) 

The following steps describe the purpose of each API, how they interact with the dashboard, and the process for setting up necessary accounts to enable each of these integrations. This approach allows users to experiment with governance workflows

### API Integration Guide

The following steps describe the purpose of each API, how they interact with the dashboard, and the process for setting up necessary accounts to enable these integrations. By connecting to these different data source, we can gather logs, results and provide input in a single interface for better collaboration and visualization:

1. Google API

- Purpose: Fetches decision log data from Google Sheets and authenticates users.
- Interactions:
    - GoogleAuth.svelte handles user login and token generation using OAuth2.

    - utils.js processes data retrieved from Google Sheets.

- Setup Instructions:

    - Go to the Google Cloud Console.

    - Create a new project.

    - Enable the "Google Sheets API" and "Google Drive API."

    - Navigate to "Credentials" and create an OAuth2 client ID.

    - Set the redirect URI to match your application's domain (e.g., http://localhost:5173 during development).

    - Copy the client ID, client secret, and API key into your .env file.

2. GitHub API

- Purpose: Integrates GitHub project boards for issue tracking and collaboration.

- Interactions:

    - GithubAuth.svelte authenticates users via OAuth2.

    - GithubIssues.svelte fetches and displays GitHub issues.
    
    - For security reasons, GitHub OAuth uses a proxy server function to handle the GitHub secret token.
- Setup Instructions:

    - Go to the GitHub Developer Settings.

    - Register a new OAuth application.

    - Set the callback URL to your application's domain (e.g., http://localhost:5173 during development).

    - Copy the client ID and client secret into your .env file.

3. Earthstar

- Purpose: Manages decentralized data storage and voting results.

- Interactions:

    - FetchVotes.svelte retrieves vote results from Earthstar.

    - Voting results are stored securely and displayed using components like BarGraph.svelte and LineGraph.svelte.

- Setup Instructions:

    - Deploy an Earthstar server or use an existing one. To host your own voting events, you need to run your own Earthstar server. Templates are available to help you deploy an Earthstar server efficiently.

    - Obtain your Earthstar address and secret key.

    - Add these values to the .env file under VITE_SERVER_ADDRESS, VITE_ADDRESS, and VITE_SECRET.

    - FetchVotes.svelte retrieves vote results from Earthstar.

    - Voting results can be visualized with the BarGraph.svelte and LineGraph.svelte components.

## Environment Variables

The .env file is essential for connecting the dashboard to the required APIs. You will find all list of these variables in the .env.example file.


## How it all works together
-Authentication Flow:
    - Users authenticate with Google and GitHub to access their respective features:

    - Google authentication grants access to decision logs in Google Sheets.

    - GitHub authentication retrieves project board issues for governance tasks.

-Data Flow:

    - Google Sheets: Decision logs are loaded and processed to populate the DecisionLog.svelte component.

    - GitHub: Issues are fetched and displayed in the GithubIssues.svelte component.

    - Earthstar: Vote results are fetched from the Earthstar server and visualized using BarGraph.svelte and LineGraph.svelte.

- Integration:

    - Each API provides specific functionality that enhances the overall governance process. For instance, Google Sheets enables easy data sharing, while Earthstar ensures decentralized and secure vote tracking.
### User and Developer Guide

- For Users

    - Obtain access credentials for the required services (Google, GitHub).

    - Follow the installation and setup steps to configure the dashboard.

    - Authenticate with Google and GitHub when prompted during usage.

    - View decision logs, voting results, and GitHub issues via the dashboard interface.

-For Developers

    - Ensure you have accounts set up for Google Cloud, GitHub, and Earthstar.

    - Populate the .env file with your credentials.

    - Use the development server (npm run dev) to test API integrations.

    - Modify and extend components as needed for additional functionality.


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

The Governance Dashboard is a Svelte-based application designed to facilitate collaborative decision-making and visualize the results. The project aims to:

- Display our decision log.
- Provide insights into deliberation and voting workflows.
- Test the viability of different tools in a small-scale setting.
- Develop and document a series of governance workflows.
- Contribute to the lore creation of our co-op by telling the story of what and why we are.

## Features

- **Proposals Table:** Display proposals.
- **Vote Results:** Upload and visualize vote results from CSV files.
- **Decision Log:** Load and display decision logs.
- **Graphs:** Visualize data using different graphs.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/hyphacoop/governance-experiment.git
    cd governance-experiment/dashboard
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm run dev
    ```

## Deployment

This dashboard is deployed on github pages. The deploy.sh script automatically builds both the dashboard and the timeline and deploys it to this repository's github page. 

## Possible Usage without APIs

It is possible to load data decision log manually as CSV. Below you will find these instructions. 


### Loading Decision Log

1. Find the 'Decision Log' Sheet and download it as CSV
2. On the dashboard, navigate to the "Decision Log" section.
3. Click on "Load CSV" and load the decision log file.

### Component Details

- App.svelte: The main application component that initializes and renders the dashboard.

- GoogleAuth.svelte: Handles Google authentication.

- GithubAuth.svelte: Handles GitHub authentication.

- DecisionLog.svelte: Displays the decision log data.

- GithubIssues.svelte: Displays GitHub issues.

- BarGraph.svelte: Visualizes vote results in a bar graph.

- LineGraph.svelte: Visualizes vote results in a line graph.

- FetchVotes.svelte: Fetches vote results from Earthstar.
