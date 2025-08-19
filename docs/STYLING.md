# Styling & Design Guide

## Quick Reference

**TailwindCSS Strategy:**

- Use utilities for layout/spacing without excessive customization
- Avoid arbitrary values (`[#123456]`)
- Component-scoped CSS for animations/complex styling

**Responsive Design:**

- Mobile-first approach
- Breakpoints: `tablet` (768px), `laptop` (1024px), `desktop` (1440px), `desktopxl` (1920px)

**Dark Mode:**

- All components must support light/dark themes
- Use `dark:` prefix for dark mode styles

---

## TailwindCSS Usage Strategy

### Primary Approach

Use TailwindCSS utilities for:

- Layout and spacing (`flex`, `grid`, `p-4`, `m-8`)
- Basic styling (`text-lg`, `bg-white`, `rounded-lg`)
- Responsive design (`tablet:flex-row`, `laptop:grid-cols-6`)

**Example:**

```html
<div
  class="flex flex-col tablet:flex-row gap-4 p-6 bg-white dark:bg-medium rounded-lg"
>
  <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Title</h2>
</div>
```

### What to Avoid

- **Arbitrary values:** Avoid `[#123456]`, `[42px]` unless absolutely necessary
- **Complex animations:** Use component-scoped `<style>` blocks instead or custom utility classes scoped to animation-related CSS files

### When to Use Component-Scoped CSS

Use `<style>` blocks within components for:

- Complex animations and transitions
- Keyframe animations
- Component-specific styling that doesn't fit Tailwind patterns
- Interactive states that require complex logic

**Example:**

```astro
<div class="animate-text-scroll">
  <p>Animated content</p>
</div>

<style>
  .animate-text-scroll {
    animation: textScroll 4s ease-in-out infinite;
  }

  @keyframes textScroll {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
</style>
```

### Shared CSS Files

Reserved for common utilities and reusable patterns:

- **Typography:** Text styles, font configurations
- **Gradients:** Reusable gradient patterns and animations
- **Movement:** Common animations and transitions
- **Utilities:** Project-wide utility classes

**Example usage:**

```html
<!-- Using shared gradient class -->
<div class="green-blue-shimmer-slow"></div>

<!-- Using shared typography class -->
<h1 class="text-display text-gradient">Page Title</h1>
```

## Responsive Design Requirements

### Mobile-First Approach

All layouts and components must be designed mobile-first, then enhanced for larger screens.

### Defined Breakpoints

```css
/* TailwindCSS Configuration */
--breakpoint-tablet: 768px;
--breakpoint-laptop: 1024px;
--breakpoint-desktop: 1440px;
--breakpoint-desktopxl: 1920px;
```

### Usage Examples

```html
<!-- Mobile: stack vertically, Tablet+: horizontal layout -->
<div class="flex flex-col tablet:flex-row">
  <!-- Mobile: single column, Laptop: 2 cols, Desktop: 3 cols -->
  <div class="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3">
    <!-- Mobile: small text, Tablet: medium, Desktop: large -->
    <h1 class="text-xl tablet:text-2xl desktop:text-4xl"></h1>
  </div>
</div>
```

### Responsive Patterns

- **Layout:** Start with mobile layout, expand for larger screens
- **Typography:** Scale text sizes appropriately across breakpoints
- **Spacing:** Increase margins/padding for larger screens
- **Navigation:** Transform mobile menus for desktop layouts

## Color System & Dark Mode

### Custom Color Palette

The project uses a custom color system defined in `src/styles/base.css`:

**Base Colors:**

```css
--color-dark: #13151a; /* Dark backgrounds */
--color-light: #f5f5f5; /* Light backgrounds */
--color-medium: #23262d; /* Medium backgrounds */
```

**Accent Colors:**

```css
--color-accent: #883aea; /* Primary accent */
--color-accent-light: #e0ccfa; /* Light variant */
--color-accent-dark: #310a65; /* Dark variant */
```

**Semantic Colors:**

```css
/* Red variants */
--color-red-dark: #c84b44;
--color-red-light: #f8756a;

/* Blue variants */
--color-blue-dark: #3844c6;
--color-blue-light: #5c68f3;

/* Green variants */
--color-green-dark: #2e9c51;
--color-green-emerald: #50c878;
--color-green-light: #9fdeb0;
```

### Dark Mode Implementation

Uses custom variant configuration:

```css
@custom-variant dark (&:is(.dark *));
```

**Dark Mode Classes:**

```html
<!-- Background colors -->
<div class="bg-white dark:bg-medium">
  <!-- Text colors -->
  <p class="text-gray-900 dark:text-gray-100">
    <!-- Border colors -->
  </p>

  <div class="border-gray-200 dark:border-gray-700">
    <!-- Complex example -->
    <article
      class="bg-white dark:bg-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
    ></article>
  </div>
</div>
```

### Color Usage Guidelines

- **Always provide dark mode alternatives** for colors
- **Test contrast ratios** for accessibility compliance
- **Use semantic color names** when available
- **Prefer theme colors** over arbitrary hex values

## CSS Organization

### Main Entry Point

```css
/* src/styles/styles.css */
@import '@styles/base.css';
@import '@styles/utilities.css';
@import '@styles/typography.css';
@import '@styles/gradients.css';
@import '@styles/movement.css';
@import '@styles/pagefind.css';
```

### Modular Structure

**base.css:**

- TailwindCSS configuration
- Theme variables and breakpoints
- Font definitions
- Core color palette

**utilities.css:**

- Custom utility classes
- Layout helpers
- Common patterns

**typography.css:**

- Text styles and scales
- Font configurations
- Responsive typography

**gradients.css:**

- Gradient patterns
- Gradient animations
- Border gradients

**movement.css:**

- Animations and transitions
- Keyframe definitions
- Motion utilities

### TailwindCSS v4 Configuration

Uses modern `@theme` syntax:

```css
@theme {
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;

  --font-sans: Reddit Sans Variable, ui-sans-serif, system-ui;
  --font-mono: Reddit Mono Variable, ui-monospace;

  --color-accent: #883aea;
  --shadow-sharp: 12px 12px 2px 1px rgba(0, 0, 0, 0.2);
}
```

## Best Practices

### Layout Patterns

- **Container:** Use `.container` class for consistent max-widths
- **Grid Systems:** Leverage CSS Grid with Tailwind utilities
- **Flexbox:** Use for component-level layouts
- **Spacing:** Consistent spacing scale across components

### Animation Guidelines

- **Performance:** Prefer `transform` and `opacity` for animations
- **Accessibility:** Respect `prefers-reduced-motion`
- **Duration:** Use consistent timing (500ms standard)
- **Easing:** Use CSS easing functions for natural motion

### Component Styling

```astro
---
interface Props {
  variant?: 'default' | 'large';
  className?: string;
}

const { variant = 'default', className = '' } = Astro.props;
---

<div
  class={`base-styles ${variant === 'large' ? 'large-variant' : ''} ${className}`}
>
  <slot />
</div>

<style>
  .base-styles {
    /* Component-specific styles */
  }

  .large-variant {
    /* Variant-specific styles */
  }
</style>
```

### Dark Mode Testing

- Test all components in both light and dark modes
- Ensure sufficient contrast in both themes
- Check interactive states (hover, focus) in both modes
- Validate gradient and animation visibility

---

[← Back to Main Guide](./AI_AGENT_GUIDE.md)
