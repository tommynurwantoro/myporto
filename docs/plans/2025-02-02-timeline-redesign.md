# Experience & Education Timeline Redesign

**Date:** 2025-02-02
**Status:** Approved

## Overview

Refactor the Experience and Education sections into parallel timeline layouts that tell a cohesive professional journey story. The design is minimalist, clean, and focused on career progression with strategic use of brand logos and smooth scroll animations.

## Key Principles

1. **Parallel Journey Tracks** - Two independent timelines side-by-side, each telling its own story
2. **Minimalist Design** - No card backgrounds, timeline line and dots serve as visual anchors
3. **Role as Hero** - Title/Degree is prominent, company/school secondary
4. **Scannable Content** - Clean typography, generous spacing, easy to scan quickly
5. **Smooth Progression** - Scroll-triggered animations create storytelling flow

## Layout Architecture

### Desktop Layout
```
┌─────────────────────────────────────────────────────────┐
│  Experience (left col)        │  Education (right col)     │
│  Container: max-w-4xl        │  Container: max-w-4xl        │
│  Timeline centered            │  Timeline centered            │
│  Cards on right side          │  Cards on left side          │
│  │                  ○──────│  │                           │
│  │                  ○──────│  │                           │
│  │                  ○──────│  │                           │
│  │                  ○──────│  │                           │
└─────────────────────────────────────────────────────────┘
```

- **Grid:** `grid grid-cols-1 md:grid-cols-2 gap-8`
- **Gap:** 32px between columns on desktop
- **Each section:** 45% width (max-w-4xl container)

### Mobile Layout
```
┌─────────────────────────────┐
│  Experience Timeline        │
│  Container: max-w-4xl        │
│  Cards on right side          │
│  │                  ○──────│
│  │                  ○──────│
├─────────────────────────────┤
│  Education Timeline         │
│  Container: max-w-4xl        │
│  Cards on left side           │
│           ○───────────────│  │
│           ○───────────────│  │
└─────────────────────────────┘
```

- **Stacked:** Experience above Education (chronological)
- **Full-width:** Each timeline gets full width on mobile
- **Maintains:** All animations and interactivity

## Visual Design

### Card Structure (Minimalist - No Background)

```
Experience Card (right of line):
                  ○─────┐
                      │  🏢 32px  Backend Engineer
                      │     Company Name
                      │     📅 2023 - Present
```

**Content Top to Bottom:**
1. **Logo** (32x32px) - Inline before title, natural height
2. **Title** (H3, 24px, font-bold, text-emerald-400) - The role/degree
3. **Company/School** (H4, 20px, font-semibold, text-gray-200) - Institution name
4. **Period** (body, 14px, text-gray-400) - Date range with 16px calendar icon

### Timeline Line

- **Width:** 4px
- **Position:** `absolute left-1/2 transform -translate-x-1/2`
- **Color:** Emerald-400 (#34d399)
- **Opacity Gradient:**
  - Top: 0.3 opacity (fades in)
  - Middle: 1.0 opacity (solid)
  - Bottom: 0.3 opacity (fades out)
- **SVG Gradient:** `#timelineGradient` defined in `<defs>`

### Timeline Dots

- **Size:** 16x16px (4x4 in Tailwind: `w-4 h-4`)
- **Shape:** Circular (`rounded-full`)
- **Inactive:** Gray-500, scale 1.0
- **Active:** Emerald-400, scale 1.5
- **Glow:** `box-shadow: 0 0 20px rgba(52, 211, 153, 0.5)`
- **Position:** Centered on timeline line (`left-1/2 -translate-x-1/2`)

### Spacing

- **Between cards:** 80px (5rem) vertical gap
- **Card from line:** 24px (1.5rem) horizontal gap
- **Section padding:** 64px (4rem) top/bottom
- **Mobile:** Same spacing maintained

## Animation Behavior

### Card Entrance Animation

```typescript
initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

- **Experience cards:** Slide in from right (x: 30 → 0)
- **Education cards:** Slide in from left (x: -30 → 0)
- **Stagger:** 0.1s delay between cards
- **Total entrance time:** ~1.1s for 7 experiences

### Timeline Line Drawing

- **Trigger:** When section enters viewport
- **Animation:** Path draws from top to bottom
- **Duration:** 2s
- **Method:** `pathLength` motion value from 0 → 1

### Dot Animation

```typescript
const progressStart = index / items.length;
const progressEnd = (index + 1) / items.length;

animate={{
  scale: scrollYProgress >= progressStart && scrollYProgress <= progressEnd ? 1.5 : 1,
  backgroundColor: scrollYProgress >= progressStart && scrollYProgress <= progressEnd ? '#34d399' : '#6b7280',
}}
```

- **Fill when:** Card is in viewport (scroll progress matches item range)
- **Reset when:** Scroll moves away
- **Transition:** Spring physics (stiffness: 300, damping: 25)

### Hover Effects

- **Card only:** `whileHover={{ y: -6 }}` - Lifts 6px up on hover
- **No other hover animations** - Keeping it clean and minimalist

## Component API

### Timeline Component Interface

```typescript
interface TimelineItem {
  id: string;
  content: ReactNode;
  side: 'left' | 'right';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  side?: 'left' | 'right'; // Optional default side
}
```

### Usage Example (Experience.tsx)

```typescript
import { motion } from 'framer-motion';
import { Building, Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { experiences } from '../../constants/data';

export function Experience() {
  const timelineItems = experiences.map((exp) => ({
    id: exp.id,
    side: 'right' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="flex items-center gap-3"
      >
        {exp.logo && (
          <img src={exp.logo} alt="" className="w-8 h-8 rounded" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{exp.title}</h3>
          <p className="text-lg font-semibold text-gray-200">{exp.company}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{exp.period}</span>
          </div>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-emerald-400"
        >
          Professional Experience
        </motion.h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}
```

### Usage Example (Education.tsx)

```typescript
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { education } from '../../constants/data';

export function Education() {
  const timelineItems = education.map((edu) => ({
    id: edu.id,
    side: 'left' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="flex items-center gap-3"
      >
        {edu.logo && (
          <img src={edu.logo} alt="" className="w-8 h-8 rounded" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{edu.degree}</h3>
          <p className="text-lg font-semibold text-gray-200">{edu.school}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{edu.period}</span>
          </div>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-emerald-400"
        >
          Education
        </motion.h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}
```

## Responsive Behavior

### Desktop (md breakpoint: 768px+)
- **Layout:** Side-by-side columns
- **Card width:** `md:w-5/12` (42% of container)
- **Experience cards:** Right side of line (`mr-auto ml-0`)
- **Education cards:** Left side of line (`ml-auto mr-0`)

### Mobile (< 768px)
- **Layout:** Stacked vertically
- **Experience:** First section (above)
- **Education:** Second section (below)
- **Card width:** `w-full`
- **Timeline line:** Always centered, regardless of card position

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Timeline line | `text-emerald-400` + gradient | Primary accent |
| Active dot | `bg-emerald-400` | Current item indicator |
| Inactive dot | `bg-gray-500` | Pending/past items |
| Title | `text-emerald-400` | Role/degree emphasis |
| Company/School | `text-gray-200` | Institution name |
| Period | `text-gray-400` | Date information |
| Card hover | y-6 translation only | No color change |

## Technical Details

### Files to Modify

1. **`src/components/ui/Timeline.tsx`**
   - Update to support side prop on cards
   - Implement responsive positioning logic
   - Add SVG gradient for line
   - Implement dot fill animations

2. **`src/components/sections/Experience.tsx`**
   - Map experiences to timeline items
   - Set `side: 'right'` for all items
   - Include logo, title, company, period
   - Remove descriptions (keep clean)

3. **`src/components/sections/Education.tsx`**
   - Map education to timeline items
   - Set `side: 'left'` for all items
   - Include logo, degree, school, period
   - Remove descriptions (keep clean)

4. **`src/App.tsx`** (if needed)
   - Ensure grid layout: `grid grid-cols-1 md:grid-cols-2 gap-8`
   - Both Experience and Education components

### Key Changes from Current Implementation

1. **Simplified cards** - No background, no descriptions, clean hierarchy
2. **Inline logos** - Small (32x32px), before title, not separate element
3. **Better spacing** - 80px between items, proper breathing room
4. **Consistent width** - max-w-4xl instead of max-w-6xl (better proportion)
5. **Side-specific positioning** - All experience cards on right, all education on left

## Edge Cases & Solutions

### Missing Logo
```typescript
{exp.logo && (
  <img src={exp.logo} alt="" className="w-8 h-8 rounded" />
)}
```
- Conditionally render logo only if present

### Long Company Names
```typescript
<p className="text-lg font-semibold text-gray-200 max-w-xs truncate">
  {exp.company}
</p>
```
- Add `max-w-xs` and `truncate` to prevent overflow

### Timeline Height Calculation
- **Current issue:** Fixed height (`L 0 1000`) may not match actual content
- **Solution:** Use `offsetHeight` of container or `useMeasure` from framer-motion
- **Implementation:**
  ```typescript
  const [height, setHeight] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  <motion.path d={`M 0 0 L 0 ${height}`} />
  ```

### Accessibility
- **Role:** `role="list"` on timeline container
- **Listitem:** `role="listitem"` on each card
- **ARIA:** Consider adding `aria-label="Professional experience timeline"`
- **Keyboard:** Cards should remain focusable (no `pointer-events-none`)

## Testing Checklist

- [ ] Timeline line visible and properly centered
- [ ] Cards appear on correct side (Experience: right, Education: left)
- [ ] All cards animate in with stagger effect
- [ ] Timeline line draws from top to bottom
- [ ] Dots fill when their card enters viewport
- [ ] Hover effect: cards lift 6px
- [ ] Logos display correctly (32x32px, inline with title)
- [ ] Typography hierarchy is clear (title prominent, company secondary)
- [ ] Responsive: columns stack correctly on mobile
- [ ] Responsive: Experience above Education on mobile
- [ ] Spacing feels right (80px between items)
- [ ] No layout shift on scroll
- [ ] Smooth 60fps animations
- [ ] No console errors

## Success Criteria

- [ ] Clean, minimalist aesthetic with no card backgrounds
- [ ] Timeline serves as visual anchor (line + dots)
- [ ] Role progression is immediately apparent
- [ ] Side-by-side layout works on desktop
- [ ] Stacked layout works on mobile (Experience first)
- [ ] All animations smooth and performant
- [ ] Maintains accessibility (keyboard nav, semantic HTML)
- [ ] Brand logos add recognition without clutter
- [ ] Overall tells a cohesive professional story
