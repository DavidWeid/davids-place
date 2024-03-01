# David's Place

This project allows me to showcase my work and share my thoughts in interests (end goal). However, this website is actually practice for me to learn [Astro](https://astro.build/) as a test run to see if it makes sense for a large, complex website. This project contains the follow technologies:

- astro
- [tailwindcss](https://tailwindcss.com/)
- [alpinejs](https://alpinejs.dev/)
- mdx
- typescript

This site is deployed here using GitHub Pages: https://davidweid.github.io/astro-project-1/

## 🚀 Project Structure

Inside this Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── MarkdownRecipeLayout.astro
│   ├── content/
│   │   ├── cookbook/
│   │   │   └── brioche-buns.mdx
│   │   └── config.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── cookbook/
│   │       └── recipes/
│   │           └── [...slug].astro
│   └── styles/
│       └── base.css
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Files in the `src/content/` directory are not automatically built as routes in the same way that the `pages/` directory works. In this case, we map our content files (`.mdx`) located in `src/content/cookbook/` to a route via `src/pages/cookbook/recipes/[...slug].astro`. This astro file represents our "single" page template so that each `.mdx` file in `/cookbook/` lands at the path `/cookbook/recipe/`. The cookbook "list" page is defined by `src/pages/cookbook/index.astro`, which is the same as a regular astro `page` file.

## Configuration

### 🔧 Astro

Astro's configuration file is `astro.config.mjs`. Here we import alpinejs, tailwind, and mdx as our site integrations. We set the tailwind integration to also include `applyBaseStyles` to `false` to give us more control (see the next section "Styling").

We also set `prefetch.prefetchAll` to `true`. This will prefetch all links according to the value of `prefetch.defaultStrategy`, which is not explicitly set in this case and so by default is set to `hover`.

- This means that when a user hovers a link, astro will prefetch the page in the background.

- To opt-out of prefetching for a link, set the `data-astro-prefetch` attribute of the link to `"false"`

### 🎭 Styling

This site uses tailwindcss and the tailwind typography plugin to style prose sections. The `src/styles/base.css` file is not a default file for the Astro+Tailwind setup, but has been added to allow greater customization. This file contains global styles and should be limit in final size as scoped styles are preferrable where possible.

Tailwind configuration is done in the `tailwind.config.mjs` file. We search for tailwind classes in the `src` directory in the following files: `.{astro,html,js,jsx,md,mdx,ts,tsx}`. We enable darkMode through the 'class' option and set `theme.screens` to chosen breakpoints for tablet, laptop, and desktop. We then extend the theme's colors and finally add the typography plugin.

## 📚 Content

Content lives in two places: the `pages/` and `content/` directories. Content in the pages directory builds to route automatically, while content in the content directory does not.

The content directory has a schema setup to define valid front matter parameters. Astro uses Zod for defining datatypes. Not adhering to the schema results in build errors.

### 📷 Images

For the content files, specifically `cookbook` files, images are rendered on the page in two ways.

1. Through the content portion of the MDX file (below the front matter)

- In this case we import the component `ImageRecipe` as well as the image itself from `/images/` and pass this imported image into the component. `alt` is also required

```js
import ImageRecipe from '../../components/ImageRecipe.astro';
import imageName from '../../images/cookbook/recipe-name/image-name.png';

<ImageRecipe src={imageName} alt='Image for the food made from this recipe' />;
```

2. Through the front matter portion of the MDX file

- In this case, we use the following front matter paramater `image = {url, alt}`:

```yaml
image:
  url: ../../images/cookbook/recipe-name/image-name.png
  alt: Image for the food made from this recipe
```

- The front matter parameter is used in the layout file `src/layouts/MarkdownRecipeLayouts.astro` that imports the `ImageRecipe` component, passing in the front matter values for `src` and `alt`.

Note: To use the value of the `image` paramater from the front matter, the content schema for `image` needs to be defined using the `image` helper to validate the image metadata with Zod.

```ts
// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Use "image" helper
const cookbookCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // ...
      image: z.nullable(
        z.object({
          url: image(),
          alt: z.string()
        })
      )
      // ...
    })
});
```

## 🌈 Accessibility

This website was made with accessibility in mind. I have tried to implement as much as I know and learned while trying to build websites. There will be things to improve here, but things that are always kept in mind include:

- Contrast ratios
- Click / tap target sizing
- Typography
- Native HTML, including labels and inputs, for interactive parts of the page (inputs, buttons, links)

## 💻 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
