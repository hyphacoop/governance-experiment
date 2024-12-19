# Governance Dashboard

## Overview

This dashboard is a static frontend application designed to facilitate collaborative decision-making and visualize the results. The project integrates multiple APIs (Google, GitHub, and an Earthstar server) to provide a seamless experience for users. This document covers installation, configuration, component details, and API interactions to help users and developers get started.

This interface integrates multiple APIs to gather data from different sources into a cohesive dashboard. It was built around the following [decision log template](https://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
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

## Deployment

This dashboard is deployed on github pages. The deploy.sh script automatically builds both the dashboard and the timeline and deploys it to this repository's github page. 

## Possible Usage without APIs

It is possible to load data decision log manually as CSV. Below you will find these instructions. 


### Loading Decision Log
This dashboard was built around the following [decision log template](https://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing) 
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
