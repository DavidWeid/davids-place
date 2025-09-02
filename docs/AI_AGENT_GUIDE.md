# AI Agent Coding Guide for davids-place

## Overview

This repository is a personal website built with [Astro](https://astro.build/), focused on modern web development practices, visual style demonstrations, and content organization. It features custom components, image handling, and advanced CSS techniques for gradients, borders, and layouts.

> For a broader project overview and additional context, see the [README.md](../README.md) in this repository.

## Quick Reference

### Essential Commands

- `npm run dev` - For new clones (builds + starts dev)
- `npm run start` - Normal development server
- `npm run test` - Run Vitest tests
- `npm run build` - Production build

### Key Technologies

- **Astro v5** - Static site generation
- **TypeScript** - Strict typing with path aliases (`@components/`, `@images/`, etc.)
- **TailwindCSS v4** - Utility-first CSS with custom theme
- **Content Collections** - Two collections: `blog` and `cookbook`

### Project Structure

```
src/
├── components/     # Reusable Astro components
├── content/        # Blog posts and recipes (MDX)
├── images/         # Organized by category/usage
├── layouts/        # Base layouts for pages
├── pages/          # Route pages and templates
├── styles/         # Modular CSS files
└── utilities/      # Helper functions
```

## Detailed Guides by Task Type

### 🛠️ Development & Setup

**[DEVELOPMENT.md](./DEVELOPMENT.md)** - Workflow, commands, quality standards, and TypeScript configuration

**When to use:** Setting up development environment, understanding build process, code quality requirements

### 🧩 Components & Architecture

**[COMPONENTS.md](./COMPONENTS.md)** - Component patterns, props, TypeScript interfaces, and architectural conventions

**When to use:** Creating/modifying components, understanding prop patterns, working with Astro components

### 📝 Content Management

**[CONTENT.md](./CONTENT.md)** - Content collections, schemas, frontmatter, and rendering architecture

**When to use:** Adding blog posts or recipes, understanding content structure, working with MDX files

### 🎨 Styling & Design

**[STYLING.md](./STYLING.md)** - TailwindCSS strategy, responsive design, color system, and CSS organization

**When to use:** Implementing designs, working with styles, responsive layouts, dark mode

### 📁 File Organization

**[FILE_ORGANIZATION.md](./FILE_ORGANIZATION.md)** - File structure, naming conventions, and asset organization

**When to use:** Adding new files, organizing images, understanding project structure

## Getting Started

1. **First time setup:** Run `npm run dev` (builds + starts server)
2. **Normal development:** Use `npm run start`
3. **Review relevant guide:** Check the appropriate detailed guide above
4. **Follow conventions:** Use TypeScript, path aliases, and established patterns
5. **Test your changes:** Run `npm run test` before committing

## Core Principles

- **TypeScript First:** All components and logic should be fully typed
- **Accessibility:** Use semantic HTML and follow WCAG guidelines
- **Responsive Design:** Mobile-first approach with defined breakpoints
- **Component-Driven:** Build reusable, well-documented components
- **Performance:** Leverage Astro's optimizations and best practices

---

**Need help?** Consult the detailed guides above based on your specific task type.
