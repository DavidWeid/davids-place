# File Organization Guide

## Quick Reference

**Image Organization:**

- `src/images/` with semantic subfolders
- Group by content type/usage context
- Use kebab-case naming
- Import with `@images/` path alias

**Folder Structure:**

```
src/images/
├── about/          # Profile and personal content
├── cookbook/       # Recipe-specific images
├── general/        # Reusable site assets
├── icons/          # UI and social icons
└── og/            # Open Graph images
```

---

## Image Organization

Images are systematically organized in `src/images/` with a clear hierarchical structure based on usage and content type.

### Subfolder Categories

#### `about/` - Personal Content

**Purpose:** Profile images, personal assets, and general "about me" content

**Contents:**

- Profile photos and headshots
- Personal project images
- Background images for about sections

**Subfolders:**

- `cookbook/` - Icons and illustrations for cookbook-related content

**Example:**

```
src/images/about/
├── avatar-default.png
├── david-weid-headshot.jpg
├── cupcake-500.png
└── cookbook/
    ├── bread.png
    ├── cookies.png
    └── vegan-food.png
```

#### `astro/` - Framework Assets

**Purpose:** Astro framework-related SVG icons and assets

**Contents:**

- Astro logo variations
- Framework-specific graphics
- Development-related icons

#### `cookbook/` - Recipe Content

**Purpose:** Recipe-specific images, organized by individual recipe name

**Structure:** Create individual folders for each recipe containing all related images

**Example:**

```
src/images/cookbook/
├── brioche-buns/
│   └── brioche-buns.jpg
├── chocolate-chip-cookies/
│   └── chocolate-chip-cookies.jpg
├── tofu-tikka-masala/
│   ├── tofu-tikka-masala.png
│   └── tofu-tikka-masala-banner.png
```

**Usage in content:**

```mdx
import recipeImage from '@images/cookbook/recipe-name/recipe-image.jpg';

;
```

#### `general/` - Site-Wide Assets

**Purpose:** Reusable images, backgrounds, graphics, and site-wide assets

**Contents:**

- Background images and textures
- Site logos and branding
- General-purpose graphics
- Decorative elements

**Example:**

```
src/images/general/
├── david-weid-headshot-3.jpg
├── flurry.jpg
├── website-stack-white.png
└── layered-waves-haikei.svg
```

#### `icons/` - UI Elements

**Purpose:** UI icons, social media icons, and small graphic elements

**Contents:**

- Navigation icons
- Social media icons
- UI interaction elements
- Small decorative graphics

**Subfolders:**

- `cookbook/` - Kitchen and cooking-related icon sets

**Example:**

```
src/images/icons/
├── arrow-right-blue.svg
├── external-link.svg
├── github.svg
├── linkedin.svg
└── cookbook/
    ├── kitchen-pack-knife.svg
    ├── kitchen-pack-pot.svg
    └── kitchen-pack-spatula.svg
```

#### `og/` - Social Media

**Purpose:** Open Graph images for social media sharing

**Contents:**

- Site-wide Open Graph image
- Page-specific social media images
- Twitter card images

## Organization Principles

### Content-Based Grouping

Group related images by content type or usage context rather than file type or arbitrary categories.

**✅ Good:**

```
cookbook/recipe-name/all-recipe-images
icons/ui-elements
about/personal-content
```

**❌ Avoid:**

```
jpg-files/mixed-content
all-icons-everywhere/
random-images/
```

### Recipe-Specific Organization

Create individual folders under `cookbook/` for each recipe containing all related images.

**Benefits:**

- Easy to find recipe-related assets
- Clean organization for content collections
- Simple to add/remove entire recipe sets

**Example workflow:**

1. Create new recipe: `kung-pao-tofu.mdx`
2. Create image folder: `src/images/cookbook/kung-pao-tofu/`
3. Add recipe images to folder
4. Import in content file using path alias

### Naming Conventions

Use descriptive, kebab-case naming for both folders and files.

**File Naming:**

- Use kebab-case: `chocolate-chip-cookies.jpg`
- Be descriptive: `tofu-tikka-masala-banner.png`
- Include context when needed: `david-weid-headshot-3.jpg`

**Folder Naming:**

- Match content slugs: `cookbook/brioche-buns/`
- Use semantic names: `icons/`, `general/`, `about/`
- Group logically: `icons/cookbook/` for cooking-related icons

### Path Alias Usage

Always import images using the `@images/` path alias for consistency and maintainability.

**✅ Correct Import Pattern:**

```typescript
import heroImage from '@images/general/hero-background.jpg';
import recipePhoto from '@images/cookbook/recipe-name/main-photo.jpg';
import iconGithub from '@images/icons/github.svg';
```

**❌ Avoid Relative Paths:**

```typescript
import heroImage from '../images/general/hero-background.jpg';
import recipePhoto from '../../images/cookbook/recipe-name/main-photo.jpg';
```

## Best Practices

### Adding New Images

1. **Determine Category:** Choose appropriate subfolder based on usage
2. **Create Structure:** Create recipe-specific folders as needed
3. **Name Descriptively:** Use clear, kebab-case naming
4. **Optimize:** Ensure images are appropriately sized and compressed
5. **Import Properly:** Use `@images/` path alias in components

### Maintaining Organization

- **Regular Cleanup:** Remove unused images periodically
- **Consistent Naming:** Follow established naming patterns
- **Logical Grouping:** Keep related images together
- **Path Aliases:** Always use `@images/` for imports

### Recipe Image Workflow

When adding a new recipe:

1. Create recipe folder: `src/images/cookbook/[recipe-slug]/`
2. Add recipe images to folder
3. Create recipe content file: `src/content/cookbook/[recipe-slug].mdx`
4. Import images in content file using path alias
5. Use `ImageRecipe` component for consistent display

**Example:**

```mdx
---
title: 'New Recipe'
# ... other frontmatter
---

import ImageRecipe from '@components/ImageRecipe.astro';
import recipeImage from '@images/cookbook/new-recipe/new-recipe.jpg';

<ImageRecipe src={recipeImage} alt="Finished recipe result" />
```

---

[← Back to Main Guide](./AI_AGENT_GUIDE.md)
