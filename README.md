# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a sleek dark theme with smooth animations, interactive components, and a professional design showcasing projects, skills, experience, and education.

## ✨ Features

- **Modern UI/UX**: Dark theme with gradient accents and smooth animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Components**: 
  - Animated project carousel
  - Modal view for all projects
  - Smooth scroll navigation
  - Interactive skill progress bars
- **Accessibility**: 
  - ARIA labels and semantic HTML
  - Keyboard navigation support
  - Focus states for all interactive elements
  - Skip to content link
- **Performance Optimized**: 
  - Code splitting
  - Lazy loading images
  - Optimized animations
- **Additional Pages**:
  - Schedule meeting page (Calendly integration)
  - Payment/Support page

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Routing
- **React Router DOM v7** - Client-side routing

### Icons
- **Lucide React** - Icon library

### Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes intelligently

### Code Quality
- **ESLint** - Linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
myporto/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── AnimatedBackground.tsx
│   │   │   └── ParticleBackground.tsx
│   │   ├── sections/     # Page sections
│   │   │   ├── Header.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   └── Contact.tsx
│   │   ├── Navigation.tsx
│   │   ├── PaymentPage.tsx
│   │   └── SchedulePage.tsx
│   ├── constants/        # Constants and data
│   │   ├── data.ts       # Projects, experiences, education data
│   │   └── theme.ts      # Theme constants
│   ├── hooks/            # Custom React hooks
│   │   └── useInView.ts  # Intersection Observer hook
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── cn.ts         # className utility
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Public assets
├── dist/                 # Build output
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- Modern browser with ES6+ support

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myporto
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Customization

### Updating Content

Edit the data files in `src/constants/`:

- **Projects**: `src/constants/data.ts` - Update the `projects` array
- **Experience**: `src/constants/data.ts` - Update the `experiences` array
- **Education**: `src/constants/data.ts` - Update the `education` array
- **Skills**: `src/constants/data.ts` - Update the `skillCategories` array

### Theme Customization

Edit `src/constants/theme.ts` and `tailwind.config.js` to customize:
- Colors
- Spacing
- Animations
- Typography

### Styling

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind utility classes in components

## 🏗️ Building for Production

```bash
npm run build
```

The production build will be generated in the `dist/` directory, optimized and ready for deployment.

## 🚢 Deployment

Full stack: **React SPA** (nginx) + **Go API** + **Postgres**, with optional **Traefik** for HTTPS.

### 1. Configure environment

```bash
cp .env.example .env
```

Required in `.env`:

| Variable | Purpose |
|----------|---------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth (frontend, build-time) |
| `GOOGLE_CLIENT_ID` | Same client ID (API, runtime) |
| `JWT_SECRET` | Long random secret for API sessions |
| `VITE_API_BASE_URL` | Use `/api` — browser hits nginx, nginx proxies internally |
| `VITE_VERIFY_BASE_URL` | Public site URL for QR codes |

Optional: set `DATABASE_URL` to use external Postgres. If unset, compose uses the bundled `postgres` service.

### 2. Production (Traefik)

Only the **web** container is public. Traefik routes all traffic to nginx; nginx proxies `/api/*` to the internal Go API. The API is not reachable from the internet.

Requires an external Docker network named `traefik` (or set `TRAEFIK_NETWORK`).

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

See [nginx/traefik.md](nginx/traefik.md) for routing details.

### 3. Local Docker (no Traefik)

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
```

- Frontend: http://localhost:3001 (nginx proxies `/api` → internal API)
- Postgres: localhost:5433

### 4. Frontend-only static hosting

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, etc. You still need the Go API running separately for `/sign` features.

### Docker image only (web)

```bash
docker build \
  --build-arg VITE_GOOGLE_CLIENT_ID=your-client-id \
  --build-arg VITE_API_BASE_URL=/api \
  --build-arg VITE_VERIFY_BASE_URL=https://your-domain.com \
  -t myporto-web .
docker run -p 3001:3001 myporto-web
```

## 🎯 Key Features Explained

### Component Architecture

- **Reusable UI Components**: Located in `src/components/ui/` for maximum reusability
- **Page Sections**: Modular sections in `src/components/sections/` for easy maintenance
- **Type Safety**: Full TypeScript coverage with proper interfaces

### Animations

- Scroll-triggered animations using Intersection Observer
- Smooth transitions and hover effects
- Modal animations with fade and scale effects
- Particle background effects

### Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly

## 📝 License

This project is private and proprietary.

## 👤 Author

**Tommy Nurwantoro**
- GitHub: [@tommynurwantoro](https://github.com/tommynurwantoro)
- LinkedIn: [Tommy Nurwantoro](https://www.linkedin.com/in/tommynurwantoro)
- Email: tommy.nurwantoro@gmail.com

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) for the amazing UI library

---

Made with ❤️ using React, TypeScript, and Tailwind CSS

