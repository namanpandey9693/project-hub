# project-hub
A collection of all my projects and applications.

## Adding a New Project

The entire site is data-driven. To add a new project, you **do not** need to edit any HTML.

1. Open `js/projects-data.js`.
2. Add a new object to the `projects` array following the exact same structure:

```js
  {
    id: "your-unique-slug",
    name: "Project Name",
    description: "One or two sentence description of the project.",
    image: "assets/images/project.jpg", // or use an external URL
    url: "https://example.com",
    category: "Web", // Options: Web, App, AI, Tools, Other
    technologies: ["Tech 1", "Tech 2"]
  }
```
3. Save the file. The site will automatically update the project count, grid, and filters.

## Deployment (GitHub Pages)

This site is a pure static site (HTML, CSS, JS) with **zero build step**. It is ready to be deployed on GitHub Pages immediately.

1. Push this repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under **Source**, select `Deploy from a branch`.
4. Under **Branch**, select `main` (or `master`) and `/ (root)`.
5. Click **Save**.
6. Wait a minute for the GitHub Action to build and deploy. Your site will be live at `https://yourusername.github.io/project-hub/`!
