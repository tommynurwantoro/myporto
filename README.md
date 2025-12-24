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

### Static Hosting

The project builds to static files that can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy
- **AWS S3 + CloudFront**: Upload `dist` folder to S3 bucket

### Docker

A Dockerfile is included for containerized deployment:

```bash
docker build -t myporto .
docker run -p 3000:80 myporto
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

