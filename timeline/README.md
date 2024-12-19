# Hypha's Timeline

This project is part of Hypha's **Governance Experiment**, exploring decentralized decision-making, participatory processes, and visual storytelling. The timeline provides an interactive way to explore Hypha's history, displaying key events in a visually engaging format.

The app is built with Vite and Svelte, styled using Tailwind CSS, and supports both dark and light themes. By default, the build settings are optimized for hosting on GitHub Pages, but the app can also be exported as a web component for integration into other web platforms.

You can explore the timeline live on GitHub Pages:  
- **Timeline:** [https://hyphacoop.github.io/governance-experiment/timeline](https://hyphacoop.github.io/governance-experiment/timeline)

---

## Features

- **Part of the Governance Experiment:** Visualizes key events identified during the governance experiment.
- **Svelte + Vite:** Utilizes Svelte for a simple, reactive UI and Vite for fast development.
- **Tailwind CSS:** Enables rapid styling with utility-first CSS.
- **Dark and Light Themes:** Built-in theme toggling for accessibility and user preference.
- **Exportability:** Can be built for GitHub Pages or as a standalone web component.

---

## Setup

To run this project locally, ensure you have Node.js installed and follow these steps:

1. Clone the repository and navigate to the project folder:

   ```bash
   git clone https://github.com/hyphacoop/governance-experiment.git
   cd timeline
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## Building the App

By default, the build configuration is optimized for GitHub Pages. To create a production build for hosting on GitHub Pages, use:
   ```bash
   npm run build
   ```
The built files will be available in the dist folder and can be deployed to GitHub Pages or any other web server.

### Building as a Web Component

If you want to export the timeline as a web component for integration into other platforms, you will need to adjust the `vite.config.js` file to enable web component mode. Follow these steps:

1. Open vite.config.js and modify the build.rollupOptions to output as a web component:
   ```
   export default {
   build: {
      rollupOptions: {
         output: {
         format: 'es',
         },
      },
   },
   };
   ```
2. Run the build command:
   ```bash
   npm run build
   ```

3. The output will be in the dist folder, and the web component can be integrated into other projects using an <iframe> or <script> tag.

### Contribution

We welcome contributions to improve the timeline! To contribute:

   - Fork the repository and create a feature branch.
   - Submit a pull request with a clear description of your changes.

---    

This project is licensed under the GNU General Public License v3.0. See the `LICENSE` file for details.