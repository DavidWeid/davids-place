# AGENTS.md

This document provides AI coding agents with comprehensive guidance for working on the davids-place project - a personal website built with Astro v5, focused on modern web development practices and content organization.

## Quick Start

### Essential Commands

- `npm run dev` - First time setup (builds + starts dev server)
- `npm run start` - Normal development server
- `npm run test` - Run Vitest tests
- `npm run build` - Production build with type checking

### Key Technologies

- **Astro v5** - Static site generation with SSR support
- **TypeScript** - Strict typing with path aliases (`@components/`, `@images/`, etc.)
- **TailwindCSS v4** - Utility-first CSS with custom theme
- **Content Collections** - Two collections: `blog` and `cookbook`
- **Firebase** - Authentication and hosting (SSR deployment)

## Project Structure

```text
src/
├── components/     # Reusable Astro components
├── content/        # Blog posts and recipes (MDX)
├── images/         # Organized by category/usage
├── layouts/        # Base layouts for pages
├── pages/          # Route pages and templates
├── styles/         # Modular CSS files
└── utilities/      # Helper functions
```

## Development Workflow

### Setup & Commands

- **New clones:** Use `npm run dev` (builds + starts server)
- **Regular development:** Use `npm run start`
- **Quality checks:** Always run `npm run test` before committing
- **Production build:** Use `npm run build` for deployment testing

### Code Quality Standards

- **TypeScript strict mode** - All code must be fully typed
- **Path aliases required** - Use `@components/`, `@images/`, etc.
- **Pre-commit hooks** - Prettier formatting runs automatically
- **Accessibility first** - Semantic HTML and WCAG compliance

## Component Architecture

### Props Pattern

```typescript
interface Props {
  title: string;
  description: string | null; // Nullable for optional content
  variant?: 'default' | 'large'; // Variants with union types
  tags?: string[];
}

const {
  title,
  description = null,
  variant = 'default',
  tags = [],
} = Astro.props;
```

### Component Guidelines

- Define `Props` interface with TypeScript
- Use destructuring with defaults for optional props
- Use `string | null` for optional content properties
- Import SVGs as components: `import Icon from '@images/icons/icon.svg'`
- File location: `src/components/ComponentName.astro`

## Content Management

### Collections Structure

- **Blog:** Posts with optional LinkedIn links
- **Cookbook:** Recipes with structured ingredients/instructions
- **Format:** MDX files with frontmatter + content

### Recipe Conventions

```yaml
title: 'Recipe Title'
description: 'Brief description'
author: 'Author Name'
tags: ['tag1', 'tag2']
servings: '4-6 people'
prepTime: '30 minutes'
cookTime: '45 minutes'
totalTime: '1¼ hours'
ingredients:
  - category: 'Main'
    items:
      - '2½ cups flour' # Use Unicode fractions
      - '¼ teaspoon salt'
instructions:
  - 'Step one instructions'
  - 'Step two instructions'
```

### Blog Posts

```yaml
title: 'Blog Post Title'
description: 'SEO description'
author: 'Author Name'
tags: ['development', 'astro']
pubDate: 2024-01-15 # Optional
linkedinPostLink: 'https://...' # Optional
```

## Styling Strategy

### TailwindCSS Usage

- **Use utilities for:** Layout, spacing, basic styling, responsive design
- **Avoid:** Arbitrary values like `[#123456]` or `[42px]`
- **Component CSS for:** Complex animations, keyframes, component-specific styles

### Responsive Design

- **Mobile-first approach** required
- **Breakpoints:** `tablet` (768px), `laptop` (1024px), `desktop` (1440px), `desktopxl` (1920px)
- **Dark mode:** All components must support `dark:` variants

### Example Usage

```html
<div class="flex flex-col tablet:flex-row gap-4 p-6 bg-white dark:bg-medium">
  <h2
    class="text-xl tablet:text-2xl desktop:text-4xl text-gray-900 dark:text-gray-100"
  >
    Responsive Title
  </h2>
</div>
```

## File Organization

### Image Structure

```text
src/images/
├── about/          # Profile and personal content
├── cookbook/       # Recipe-specific images (by recipe name)
├── general/        # Reusable site assets
├── icons/          # UI and social icons
└── og/             # Open Graph images
```

### Naming Conventions

- Use kebab-case for files: `chocolate-chip-cookies.jpg`
- Create recipe-specific folders: `cookbook/recipe-name/`
- Import with path aliases: `import img from '@images/general/hero.jpg'`

## Firebase SSR Setup

### Architecture

- **Astro v5** with `output: 'server'` and Node.js adapter in middleware mode
- **Firebase Hosting** with web frameworks support (region: us-east1)
- **Session-based authentication** for SSR compatibility (5-day expiration)
- **Environment detection** - automatic cloud credentials vs. local service account

### Authentication Flow

1. **Sign-in:** Client-side Firebase Auth → ID token → `/api/auth/sign-in` → session cookie
2. **Protected routes:** Server-side session verification with Firebase Admin SDK
3. **Sign-out:** Clear session cookie → redirect to sign-in

### API Routes

- `/api/auth/register` - Creates users with Firebase Admin SDK
- `/api/auth/sign-in` - Verifies ID tokens, creates session cookies
- `/api/auth/sign-out` - Clears session cookies

### Deployment

- **Production:** GitHub Actions on push to `main` branch
- **Preview:** Automatic PR deployments with preview URLs
- **Build:** `npm run build` (type checking + Astro build)

### Key Files

```text
src/firebase/
├── client.ts          # Client-side Firebase setup
└── server.ts          # Server-side Admin SDK with environment detection
src/pages/api/auth/    # Authentication API routes
src/pages/
├── sign-in.astro      # SSR sign-in page with session checks
├── register.astro     # Registration form
└── dashboard.astro    # Protected route with session verification
```

### Common Issues

- **500 errors:** Use relative imports (`../firebase/server`) not path aliases in API routes
- **Environment variables:** Add null-safe access for `FIREBASE_PRIVATE_KEY`
- **Cloud Run:** Use Firebase default credentials, not service account variables

## Core Principles

1. **TypeScript First** - All components and logic fully typed
2. **Accessibility** - Semantic HTML and WCAG guidelines
3. **Responsive Design** - Mobile-first with defined breakpoints
4. **Component-Driven** - Reusable, well-documented components
5. **Performance** - Leverage Astro's optimizations
6. **Content Organization** - Structured collections with validation

## Common Patterns

### Adding New Content

1. **Recipe:** Create MDX in `src/content/cookbook/`, add images to `src/images/cookbook/recipe-name/`
2. **Blog post:** Create MDX in `src/content/blog/`
3. **Component:** Create in `src/components/` with proper Props interface

### Troubleshooting

- **Build failures:** Check TypeScript errors, ensure path aliases
- **SSR issues:** Use relative imports for Firebase modules, not path aliases
- **Image paths:** Always use `@images/` alias for imports
- **Dark mode:** Test all components in both light and dark themes

## Scripts and Client-Side JavaScript

### Script Execution Patterns

**1. Module Scripts (`<script>`) - RECOMMENDED**

- **Non-render-blocking** - Load asynchronously without blocking HTML parsing
- Support ES modules with imports/exports and TypeScript
- Better performance and Core Web Vitals scores
- Bundled and optimized by Astro during build
- Runs correctly without needing to listen for DOMContentLoaded

```javascript
<script>
  function initializeComponent() {
    const element = document.getElementById('my-element');

    if (!element) {
      console.warn('Element not found');
      return;
    }

    // Setup event listeners and functionality
    element.addEventListener('click', handleClick);
  }

  // No need to listen for DOMContentLoaded
  initializeComponent();
</script>
```

**2. Inline Scripts (`<script is:inline>`) - USE SPARINGLY**

- **Render-blocking** - Execute immediately during HTML parsing
- No import/export support, no TypeScript
- Only use for critical functionality that must run before DOM is ready
- Examples: Theme application, Google Analytics setup

```javascript
<script is:inline>
  function applyCriticalFeature() {
    // Critical functionality that must run immediately
    document.documentElement.classList.add('theme-applied');
  }

  applyCriticalFeature(); // Run immediately
</script>
```

### Best Practices for Scripts

#### 1. DOM Element Queries

Always use optional chaining when querying DOM elements:

```javascript
// Good - handles missing elements gracefully
document.getElementById('element')?.addEventListener('click', handler);

// Avoid - will throw if element doesn't exist after transition
document.getElementById('element').addEventListener('click', handler);
```

#### 2. Performance Considerations

- **Prefer module scripts (`<script>`) over `is:inline`** for better performance
- Use `is:inline` only for truly critical functionality that must run before DOM ready
- Use event delegation for dynamically changing content
- Clean up resources in event listeners when possible

### Common Patterns for Scripts

#### Form Interactions

See `src/pages/sign-in.astro` and `src/pages/register.astro`:

- **Module scripts with imports** for Firebase auth and other dependencies
- **Non-render-blocking** for better performance
- Sets up form validation and submission handling
- Uses optional chaining for element queries

## Other Notes

- This project prioritizes clean architecture, accessibility, and modern web standards while maintaining a focus on content organization and visual design.
