# Content Management Guide

## Quick Reference

**Collections:**
- `blog` - Blog posts with optional LinkedIn links
- `cookbook` - Recipe pages with structured ingredients/instructions

**Format:** MDX files with frontmatter + content

**Recipe Rules:**
- Use Unicode fractions (½ not 1/2)
- Structure ingredients by category
- Instructions as ordered array

---

## Content Collections Overview

The project uses two Astro content collections with strict Zod schemas for type safety and validation.

### Collections Structure
```
src/content/
├── blog/           # Blog posts
│   ├── post-1.mdx
│   └── post-2.mdx
└── cookbook/       # Recipe pages
    ├── recipe-1.mdx
    └── recipe-2.mdx
```

## Cookbook Collection

### Required Fields
```yaml
title: "Recipe Title"
description: "Brief recipe description"
author: "Author Name"
tags: ["tag1", "tag2"]
servings: "4-6 people"
prepTime: "30 minutes"
cookTime: "45 minutes"
totalTime: "1¼ hours"
ingredients:
  - category: "Main"
    items:
      - "2 cups flour"
      - "½ cup sugar"
instructions:
  - "Step one instructions"
  - "Step two instructions"
```

### Optional Fields
```yaml
source: null  # or "Recipe source/attribution"
pubDate: null  # or 2024-01-15
image:
  url: ./recipe-image.jpg
  alt: "Recipe image description"
```

### Recipe-Specific Conventions

**Fractional Measurements:**
- ✅ Use Unicode characters: `½`, `¼`, `¾`, `⅓`, `⅔`, `⅛`
- ❌ Avoid: `1/2`, `1/4`, `0.5`

**Examples:**
```yaml
ingredients:
  - category: "Dough"
    items:
      - "2½ cups bread flour"
      - "¼ teaspoon salt"
      - "⅓ cup warm water"
```

**Ingredient Organization:**
Group ingredients by category for better recipe organization:

```yaml
ingredients:
  - category: "Dough"
    items:
      - "460 grams bread flour"
      - "2½ teaspoon yeast"
  - category: "Topping"
    items:
      - "1 egg for wash"
      - "Sesame seeds"
```

**Instructions Format:**
- Write as ordered array of strings
- Each step should be clear and actionable
- Use imperative voice ("Add flour", "Mix until combined")

```yaml
instructions:
  - "Combine warm water and eggs in large bowl"
  - "Add yeast, sugar, and salt, mix well"
  - "Gradually add flour until dough forms"
  - "Knead for 8-10 minutes until smooth"
```

## Blog Collection

### Required Fields
```yaml
title: "Blog Post Title"
description: "Post description for SEO and previews"
author: "Author Name"
tags: ["development", "astro", "web"]
```

### Optional Fields
```yaml
pubDate: 2024-01-15  # Publication date
linkedinPostLink: "https://linkedin.com/posts/..."  # Related LinkedIn post
image:
  url: ./blog-image.jpg
  alt: "Blog post image description"
```

### Blog Post Example
```yaml
---
title: "Understanding Gradient Borders in CSS"
description: "Learn how to create stunning gradient borders using modern CSS techniques"
author: "David Weid II"
pubDate: 2024-01-15
tags: ["css", "gradients", "web-design"]
linkedinPostLink: "https://linkedin.com/posts/david-weid/gradient-borders"
image:
  url: ./gradient-demo.png
  alt: "Examples of gradient border effects"
---
```

## Content File Structure

### MDX Format
All content files use MDX (Markdown with JSX components):

```mdx
---
# Frontmatter (YAML)
title: "Content Title"
description: "Content description"
---

# Regular Markdown Content

Import and use Astro components:

import ImageRecipe from '@components/ImageRecipe.astro';
import recipeImage from '@images/cookbook/recipe-name/recipe-image.jpg';

<ImageRecipe src={recipeImage} alt="Recipe result" />

## More Content

Regular markdown continues...
```

### Image Integration
Use Astro's optimized Image component:

```mdx
import { Image } from 'astro:assets';
import recipePhoto from '@images/cookbook/recipe-name/photo.jpg';

<Image 
  src={recipePhoto} 
  alt="Description of image"
  width={600}
  height={400}
/>
```

### Custom Components
Import and use project components for rich content:

```mdx
import ImageRecipe from '@components/ImageRecipe.astro';
import NoteBlock from '@components/NoteBlock.astro';

<NoteBlock>
  Special note or tip about the recipe
</NoteBlock>

<ImageRecipe src={imageSource} alt="Recipe image" />
```

## Rendering Architecture

### Layout System
Content is rendered through a multi-layer architecture:

1. **Content Collections** → Automatic route generation
2. **Page Templates** → Dynamic routes process collections
3. **Base Layouts** → Shared layout and meta information

### Page Templates
- **Blog Posts:** `src/pages/blog/posts/[...id].astro`
- **Recipe Pages:** `src/pages/cookbook/recipes/[...id].astro`

### Base Layouts
- **Blog Layout:** `src/layouts/BlogPost.astro`
- **Recipe Layout:** `src/layouts/Recipe.astro`
- **Base Layout:** `src/layouts/Base.astro` (shared meta, navigation)

### URL Structure
Collections automatically generate routes:
- Blog: `/blog/posts/post-slug/`
- Recipes: `/cookbook/recipes/recipe-slug/`

## Content Creation Workflow

### Adding a New Recipe

1. **Create MDX file:**
   ```
   src/content/cookbook/recipe-name.mdx
   ```

2. **Add frontmatter with all required fields**

3. **Add recipe images:**
   ```
   src/images/cookbook/recipe-name/
   ├── recipe-main.jpg
   └── recipe-process.jpg
   ```

4. **Write recipe content with MDX components**

### Adding a Blog Post

1. **Create MDX file:**
   ```
   src/content/blog/post-slug.mdx
   ```

2. **Add frontmatter with required fields**

3. **Write post content using Markdown and components**

## Schema Validation

Content is validated against Zod schemas defined in `src/content.config.ts`. Invalid content will cause build failures with clear error messages.

**Common validation errors:**
- Missing required fields
- Invalid date formats
- Incorrect image object structure
- Invalid tag array format

---

[← Back to Main Guide](./AI_AGENT_GUIDE.md)