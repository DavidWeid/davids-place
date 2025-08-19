# Component Conventions & Patterns

## Quick Reference

**Props Pattern:**

- Define `Props` interface with TypeScript
- Use destructuring with defaults: `{ isCentered = true }`
- Nullable props: `string | null` for optional content

**Component Structure:**

- File location: `src/components/ComponentName.astro`
- Import SVGs as components
- Use variant-based design patterns

---

## Props and TypeScript Patterns

### Interface Definition

Every component should define a `Props` interface with descriptive, typed properties.

**Example:**

```typescript
interface Props {
  title: string;
  description: string | null;
  isCentered?: boolean;
  variant?: 'default' | 'large';
  tags?: string[];
}
```

### Prop Destructuring

Use destructuring with default values for optional props.

**Example:**

```typescript
const {
  title,
  description = null,
  isCentered = true,
  variant = 'default',
  tags = [],
} = Astro.props;
```

### Nullable Props

Use `string | null` for optional content properties that may not be provided.

**When to use:**

- Optional descriptions, sources, or text content
- Image alt text or URLs that may not exist
- Any prop that could legitimately be empty

**Example:**

```typescript
interface Props {
  title: string; // Always required
  description: string | null; // May be null
  source: string | null; // Optional source attribution
}
```

### Variant-Based Design

Components should support variants using TypeScript union types for different styling options.

**Example:**

```typescript
interface Props {
  variant: 'default' | 'large' | 'compact';
  style: 'primary' | 'secondary' | 'accent';
}

const { variant = 'default', style = 'primary' } = Astro.props;
```

### SVG Integration

Import SVG icons as Astro components for direct usage in templates.

**Example:**

```typescript
import IconArrow from '@images/icons/arrow-right.svg';
import IconExternal from '@images/icons/external-link.svg';

// Use in template
<IconArrow class="h-4 w-4" />
<IconExternal class="h-3 w-3 opacity-70" />
```

## Component Structure

### Interface Naming

Always use `Props` as the interface name for component props.

**Example:**

```typescript
// ✅ Correct
interface Props {
  title: string;
  isVisible: boolean;
}

// ❌ Incorrect
interface ComponentProps {
  title: string;
  isVisible: boolean;
}
```

### Optional vs Required Props

Clearly distinguish between required props and optional ones using TypeScript.

**Guidelines:**

- Required props: Direct type annotation (`string`, `boolean`)
- Optional props: Union with undefined (`string | undefined`) or use `?` operator
- Nullable content: Union with null (`string | null`)

**Example:**

```typescript
interface Props {
  title: string; // Required
  description?: string; // Optional (may be undefined)
  source: string | null; // May be explicitly null
  isVisible: boolean; // Required
  onClick?: () => void; // Optional function
}
```

### Component File Organization

- **Location:** All components live in `src/components/`
- **Naming:** PascalCase for component files (`ComponentName.astro`)
- **Tests:** Co-located test files (`ComponentName.test.ts`)
- **Structure:** Group related components in subfolders when appropriate

**Example file structure:**

```
src/components/
├── Card.astro
├── Card.test.ts
├── Hero.astro
├── navigation/
│   ├── MainNav.astro
│   └── FooterNav.astro
└── ui/
    ├── Button.astro
    └── Badge.astro
```

## Best Practices

### Component Composition

- **Single Responsibility:** Each component should have one clear purpose
- **Reusability:** Design components to be used in multiple contexts
- **Props Over Slots:** Use props for data, slots for content layout

### TypeScript Best Practices

- **Strict Typing:** Avoid `any` types
- **Descriptive Names:** Use clear, descriptive prop names
- **Default Values:** Provide sensible defaults for optional props
- **Union Types:** Use union types for variants and specific value constraints

### Error Handling

```typescript
interface Props {
  items: string[] | null;
}

const { items = null } = Astro.props;

// Safe array handling
{items && items.length > 0 && (
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
)}
```

### Component Documentation

Include JSDoc comments for complex components:

```typescript
/**
 * Reusable card component with optional image and tags
 * @param title - Card title (required)
 * @param description - Optional card description
 * @param href - Optional link destination
 * @param tags - Array of tag strings to display
 * @param variant - Visual variant ('default' | 'large')
 */
interface Props {
  title: string;
  description?: string | null;
  href?: string;
  tags?: string[];
  variant?: 'default' | 'large';
}
```

---

[← Back to Main Guide](./AI_AGENT_GUIDE.md)
