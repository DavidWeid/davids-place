# Development & Setup Guide

## Quick Reference

**Essential Commands:**

- `npm run dev` - First time setup (builds + dev server)
- `npm run start` - Normal development server
- `npm run test` - Run Vitest tests
- `npm run build` - Production build with type checking

**Quality Standards:**

- TypeScript strict mode + path aliases
- Prettier auto-formatting on commit
- Semantic HTML + accessibility requirements

---

## Development Workflow

### Essential Commands

#### For New Repository Clones

```bash
npm run dev
```

**Purpose:** Builds files and starts development server
**When to use:** First time working with a fresh clone of the repository

#### For Normal Development

```bash
npm run start
```

**Purpose:** Starts development server without rebuild
**When to use:** Regular development work after initial setup

#### Testing

```bash
npm run test
```

**Purpose:** Executes Vitest test suite
**When to use:** Before committing changes, during development

#### Production Build

```bash
npm run build
```

**Purpose:** Builds site for deployment with type checking
**When to use:** Testing production builds, deployment preparation

### Code Quality Automation

- **Husky + lint-staged**: Automatically formats code with Prettier on commit
- **Pre-commit hooks**: Ensure code quality before commits are accepted
- **Automated formatting**: No need to manually run `npm run format`

## Code Quality Standards

### TypeScript Configuration

**Strict Mode Requirements:**

- Project uses Astro's "strict" TypeScript configuration from `tsconfig.json`
- All components and logic must be fully typed
- No `any` types without explicit justification

**Path Aliases:**

- Use `@` aliases for all imports:
  - `@components/` → `src/components/`
  - `@images/` → `src/images/`
  - `@layouts/` → `src/layouts/`
  - `@styles/` → `src/styles/`

**Example:**

```typescript
// ✅ Correct
import Hero from '@components/Hero.astro';
import logo from '@images/general/logo.png';

// ❌ Incorrect
import Hero from '../components/Hero.astro';
import logo from '../images/general/logo.png';
```

### Accessibility Requirements

**Semantic HTML:**

- Use native HTML elements following [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- Prefer semantic elements over generic `div`/`span` when appropriate

**ARIA Support:**

- Include proper ARIA attributes when semantic HTML isn't sufficient
- Use `aria-label`, `aria-describedby`, and other ARIA properties as needed

**Design Requirements:**

- **Color Contrast:** Ensure sufficient contrast ratios for text and interactive elements
- **Touch Targets:** Maintain adequate size for clickable/touchable elements (44px minimum)
- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible

### Code Formatting

**Prettier Configuration:**

- Automatic formatting via pre-commit hooks
- No manual formatting commands needed
- Consistent code style across all files

**Import Organization:**

- Use path aliases consistently
- Group imports logically (external packages, then internal modules)
- Maintain clean, organized import statements

## Libraries & Tools

- **Astro v5**: Main framework for building the site
- **TypeScript**: For all scripting and logic with strict configuration
- **Vitest**: For unit testing components and utilities
- **Husky**: For managing Git hooks and code quality
- **Prettier**: For automated code formatting

## Troubleshooting

### Common Issues

**Build Failures:**

- Check TypeScript errors with `npm run build`
- Ensure all imports use path aliases

**Development Server Issues:**

- Use `npm run start` for normal development
- Clear cache and restart if experiencing issues
- Check that all dependencies are installed

**Testing Issues:**

- Run tests individually to isolate failures
- Check component imports and path aliases
- Ensure test files are properly structured

---

[← Back to Main Guide](./AI_AGENT_GUIDE.md)
