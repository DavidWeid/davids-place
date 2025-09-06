# David’s Place

This project allows me to showcase my work and share my thoughts and interests (end goal). This website also serves as practice for me to learn more about Astro, web development best practices, web design, and modern web technologies. This project contains the follow tools:

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Google Analytics](https://analytics.google.com/analytics/web/)

This site is deployed here using Firebase: https://davids-place-portfolio.web.app/

## 🚀 Project Structure

Inside this Astro project, you'll see the some of the following folders, files, and general structure:

```text
/
├── public/
│   └── favicon.ico
│   └── other static assets
├── src/
│   ├── components/
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── Recipe.astro
│   │   └── BlogPost.astro
│   ├── content/
│   │   ├── blog/
│   │   ├── cookbook/
│   │   │   └── brioche-buns.mdx
│   │   └── config.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── posts/
│   │   │      └── [...id].astro
│   │   ├── cookbook/
│   │   │   ├── index.astro
│   │   │   └── recipes/
│   │   │      └── [...id].astro
│   │   └── about/
│   │   │     ├── index.astro
│   │   │     └── cookbook.astro
│   │   └── api/auth/
│   │   │     ├── register.ts
│   │   │     ├── signin.ts
│   │   │     └── signout.ts
│   │   └── firebase/
│   │         ├── client.ts
│   │         └── server.ts
│   └── styles/
│       └── base.css
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Files in the `src/content/` directory are not automatically built as routes in the same way that the `pages/` directory works. In this case, we map our content files (`.mdx`) located in `src/content/cookbook/`, for example, to a route via `src/pages/cookbook/recipes/[...id].astro`. This Astro file represents our "single" page template so that each `.mdx` file in `/cookbook/` lands at the path `/cookbook/recipe/`. The cookbook "list" page is defined by `src/pages/cookbook/index.astro`, which is the same as a regular Astro `page` file.

## Configuration

### 🔧 Astro

Astro’s configuration file is `astro.config.mjs`. Here we import Tailwind as a vite plugin, and mdx, sitemap, and compressor as our main integrations. We also import the Astro node adapter to deploy to Firebase with SSR support - which includes setting the adapter as middleware and setting the site's `output` to `server`.

We also set `prefetch.prefetchAll` to `true`. This will prefetch all links according to the value of `prefetch.defaultStrategy`, which is not explicitly set in this case and so by default is set to `hover`.

- This means that when a user hovers a link, Astro will prefetch the page in the background.

- To opt-out of prefetching for a link, set the `data-astro-prefetch` attribute of the link to `"false"`

### 🎭 Styling

This site uses Tailwind and the Tailwind typography plugin to style prose sections. The `src/styles/base.css` file contains the Tailwind library, custom theme styles, and base-level styles. Theme customizations include breakpoints, font weights and families, colors, and shadows.

This site has dark and light modes. We enable darkMode through the class `dark`. Dark mode for code blocks is handled through the markdown shiki config in `astro.config.mjs`, where light theme is using `light-plus` and dark theme is using `dark-plus`.

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

<ImageRecipe src={imageName} alt="Image for the food made from this recipe" />;
```

2. Through the front matter portion of the MDX file

- In this case, we use the following front matter paramater `image = {url, alt}`:

```yaml
image:
  url: ../../images/cookbook/recipe-name/image-name.png
  alt: Image for the food made from this recipe
```

- The front matter parameter is used in the layout file `src/layouts/Recipes.astro` that imports the `ImageRecipe` component, passing in the front matter values for `src` and `alt`.

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
          alt: z.string(),
        }),
      ),
      // ...
    }),
});
```

## 🔥 Deployment

This site is deployed using Firebase Hosting and Firebase Functions for SSR. The `firebase.json` file contains the basic configuration for hosting, while the `.firebaserc` file contains project aliases.

Two github workflows are used to deploy the site:

- `firebase-hosting-pull-request.yml` - This workflow runs on pull requests to the `main` branch. It builds the site and deploys to the `preview` channel in Firebase Hosting using `FirebaseExtended/action-hosting-deploy`.

- `firebase-hosting-merge.yml` - This workflow runs on pushes to the `main` branch. It builds the site and deploys to the live site in Firebase Hosting using `FirebaseExtended/action-hosting-deploy`.

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
| `npm run dev`             | Builds & starts dev server at `localhost:4321`   |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run format`          | Format code using Prettier                       |
| `npm run test`            | Run tests with Vitest                            |
