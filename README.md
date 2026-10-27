## Introduction

This portfolio is built with React, TypeScript, Vite, and Tailwind CSS.

### Install Dependencies

```
pnpm i
```

### Dev Server

```
pnpm dev
```

### Build

```
pnpm build
```

### Portfolio Content

Edit profile links and experience entries in `src/content.ts`. Experience
logos are optional: import an image and set `logo: { src, alt }` on the entry.
Contact uses a direct email link and does not require a form service.

### Deployment

Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/deploy.yml`. In the repository's **Settings → Pages**, the
deployment source must be set to **GitHub Actions**.

### TypeScript Configuration

Type definitions live under `src/` and are managed via `tsconfig.json` with strict mode enabled. Modify the configuration if you need to relax checks for experimentation.
