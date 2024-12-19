# Governance Dashboard

The goal of this frontend interface is to provide a dashboard that brings together different governance processes.

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

### Loading Decision Log

1. Find the 'Decision Log' Sheet and download it as CSV
2. On the dashboard, navigate to the "Decision Log" section.
3. Click on "Load CSV" and load the decision log file.
