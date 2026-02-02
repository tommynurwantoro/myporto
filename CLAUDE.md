# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website for Tommy Nurwantoro, a Backend Engineer. It's a single-page application (SPA) built with React 19, TypeScript, Vite, and Tailwind CSS v4, featuring a dark theme with emerald accents, smooth animations, and interactive components.

**Key Architecture:**
- **Component organization:** Reusable UI components in `src/components/ui/` and page-specific sections in `src/components/sections/`
- **Centralized data:** All content data (projects, experiences, education, skills) is in `src/constants/data.ts`
- **Type safety:** Comprehensive TypeScript interfaces in `src/types/index.ts`
- **Custom hooks:** `useInView` for scroll-triggered animations using Intersection Observer

## Development Commands

```bash
npm run dev      # Start development server (runs on http://localhost:5173)
npm run build    # TypeScript compile + Vite build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

**Docker:**
```bash
docker build -t myporto .
docker run -p 3001:3001 myporto  # Container listens on port 3001 internally
```

The production Docker container serves the built static files via Nginx on port 3001 (as configured in the Dockerfile).

## Content Management

When updating content, edit these files:

- **`src/constants/data.ts`** - All content data (projects, experiences, education, skills)
- **`src/constants/theme.ts`** - Theme constants for colors, spacing, typography
- **`tailwind.config.js`** - Custom animations and Tailwind extensions

**Important:** Project images are imported in `src/constants/data.ts` and stored in `src/assets/`. When adding new projects, import the image at the top of the file and include it in the project object.

## Component Architecture

### UI Components (`src/components/ui/`)

These are reusable, design-system components:
- **Modal** - Accessible modal with focus management
- **Button** - Variants: primary, secondary, ghost, icon
- **Card** - Container component with consistent styling
- **ProgressBar** - Animated progress bars for skills
- **Section** - Wrapper for page sections with in-view animation
- **AnimatedBackground** - Mouse-tracking gradient background
- **ParticleBackground** - Floating particle effects

### Page Sections (`src/components/sections/`)

These compose the main page:
- **Header** - Hero section with introduction
- **Skills** - Skill categories with progress bars
- **Projects** - Project grid with modal detail view
- **Experience** - Work history timeline
- **Education** - Educational background
- **Contact** - Contact information and links

### Utility Components

- **Navigation** - Fixed nav bar with smooth scroll
- **SchedulePage** - Calendly integration page
- **PaymentPage** - Payment/support page

## Animation System

The app uses multiple animation layers:

1. **Scroll-triggered animations:** The `useInView` hook (src/hooks/useInView.ts) uses Intersection Observer to add `data-in-view` attributes when elements enter viewport
2. **Mouse-tracking:** `AnimatedBackground` follows mouse position (managed in App.tsx state)
3. **Custom animations:** Defined in `tailwind.config.js` (gradient animations, floats, pulses)
4. **CSS animations:** Global styles in `src/index.css`

## Routing

Uses React Router DOM v7 for client-side routing:
- Main page is at `/`
- Schedule page at `/schedule`
- Payment page at `/payment`

## Styling Conventions

- **Tailwind v4** utility-first approach
- **Color palette:** Dark theme (gray-950, gray-900) with emerald accents (emerald-500, emerald-400)
- **Responsive:** Mobile-first with `md:` and `lg:` breakpoints
- **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, skip-to-content link
- **className merging:** Use the `cn()` utility from `src/utils/cn.ts` (combines clsx + tailwind-merge)

## Tech Stack Details

- **React 19** - Latest React with concurrent features
- **Vite 7** - Build tool and dev server (not Webpack)
- **TypeScript 5.9** - Strict type checking with separate configs for app and Node.js
- **Tailwind CSS 4** - Latest version with PostCSS integration
- **Lucide React** - Icon library (icons are imported as components)

## Build Output

- Development: Vite dev server with HMR
- Production: Static files in `dist/` directory
- Docker: Multi-stage build with Node.js builder → Nginx production server

## Key Patterns

1. **State management:** Local React state (no Redux/Zustand)
2. **Data flow:** Props drilling for component communication
3. **Icons:** Import from `lucide-react` as components
4. **Type imports:** Use `import type { }` for type-only imports
5. **Ref forwarding:** Components use `React.forwardRef` when refs are needed

## Future Development

The following empty directories exist for planned features:
- **`src/components/modern/`** - Reserved for modernized/refactored components
- **`src/hooks/gsap/`** - Reserved for GSAP (GreenSock) animation hooks (currently the app uses CSS animations and Intersection Observer)
