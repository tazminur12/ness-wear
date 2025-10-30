# Ness-Wear

Modern e-commerce frontend built with React, Vite, Tailwind CSS, and DaisyUI. Includes product browsing, category pages, product detail views, and an admin dashboard scaffold.

### Live Demo
- Website: [`nesswearforyou.netlify.app`](https://nesswearforyou.netlify.app/)

## Features
- Product listing, categories, and filtering UI
- Product details with image gallery
- Responsive layout with Tailwind CSS and DaisyUI
- Auth context scaffold for protected routes
- Admin dashboard layout and sections (overview, orders, products, categories, customers, settings)
- Custom hooks for data fetching (`axios`) and React Query integration
- Vite for fast dev/build and code-splitting

## Tech Stack
- React 19, React Router
- Vite 7
- Tailwind CSS 4, DaisyUI 5
- Axios, TanStack React Query

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Vite will print a local URL (e.g., `http://localhost:5173`).

### Production Build
```bash
npm run build
npm run preview
```

## Environment Variables (optional)
If you later introduce APIs or auth, create a `.env` file at the project root and access variables with `import.meta.env`. Example:
```bash
VITE_API_BASE_URL=https://api.example.com
```

## Scripts
- `npm run dev`: start local dev server
- `npm run build`: build for production
- `npm run preview`: serve production build locally
- `npm run lint`: run ESLint

## Project Structure
```text
ness-wear/
  src/
    components/          # UI components (cards, grids, product views, header/footer)
    pages/               # Route pages (Home, Category pages, Dashboard, Login, etc.)
    layouts/             # Main and Dashboard layouts
    routes/              # Router definitions
    hooks/               # Custom hooks (axios, products, categories)
    contexts/            # Auth context and providers
    data/                # Local mock data (categories, products)
    index.css            # Tailwind and global styles
    main.jsx             # App bootstrap
```

## Styling
- Tailwind CSS and DaisyUI are configured in `src/index.css` and `vite` integration.
- Base font is set to Roboto Slab via Google Fonts.

## Deployment

### Netlify
1. Push the repository to Git (GitHub/GitLab/Bitbucket).
2. On Netlify, create a new site from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy. Your live site should be available similar to: [`nesswearforyou.netlify.app`](https://nesswearforyou.netlify.app/)

### Static Hosting (manual)
1. Run `npm run build`
2. Upload the `dist/` folder contents to your static host (e.g., S3, Cloudflare Pages, Vercel static export).

## Contributing
Contributions and suggestions are welcome! Feel free to open issues or pull requests.

## License
This project is MIT licensed. See `LICENSE` if present or add one as needed.

## Acknowledgements
- Icons: `@heroicons/react`
- UI library: `daisyui`
- Build tooling: `vite`

