# Portfolio Project - React + TypeScript + Vite

## Project Overview
This is a portfolio website built with React 18, TypeScript, and Vite. It features multiple project pages with responsive layouts and is configured for PostVisible hosting.

## Tech Stack
- **Vite 7** - Build tool with fast HMR
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router 6** - Client-side routing
- **SWC** - Fast compiler

## Project Structure
- `src/pages/` - Page components (Home, Cycles, SLD, About, Contact)
- `src/components/` - Reusable components (Navigation)
- `src/styles/` - CSS modules (global, cycles, sld)
- `public/images/` - Static assets

## Development Commands
- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Key Features
- React Router for SPA navigation
- PostVisible hosting support via base path configuration
- Responsive design with mobile breakpoints
- TypeScript for type safety

## Configuration Files
- `vite.config.ts` - Vite build configuration
- `src/App.tsx` - Router setup with BASE_PATH
- `tsconfig.json` - TypeScript configuration

## Deployment
See POSTVISIBLE_GUIDE.md for deployment instructions.

## Status
✅ Project fully set up and built successfully
✅ All pages created and routed
✅ Styles migrated from static HTML
✅ Build tested and working
