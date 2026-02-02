# Experience & Education Timeline Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor Experience and Education sections into parallel timeline layouts with minimalist card design, clean typography, and smooth scroll animations.

**Architecture:** Two independent Timeline components displayed side-by-side (desktop) or stacked (mobile). Each timeline has its own centered line with animated dots. Cards are minimalist (no background) with role/title as hero, inline logos, and time periods with calendar icons. All cards animate in on scroll with stagger timing.

**Tech Stack:** React 19, TypeScript, Framer Motion (already integrated), Tailwind CSS 4, Lucide React icons

**Prerequisites:**
- Worktree: `.worktrees/feature/animations` (already exists)
- Design doc: `docs/plans/2025-02-02-timeline-redesign.md`
- All hooks available: `useTypewriter`, `useTilt`, `useTimeline`

---

## Task 1: Update Timeline Component for Side-Specific Positioning

**Files:**
- Modify: `src/components/ui/Timeline.tsx`

**Step 1: Read current Timeline component**

```bash
cat src/components/ui/Timeline.tsx
```

**Step 2: Update Timeline to support side-specific positioning**

Replace the entire file with:

```typescript
import { motion, useTransform } from 'framer-motion';
import { ReactNode, useRef, useLayoutEffect, useState } from 'react';
import { useTimeline } from '../../hooks/framer';

interface TimelineItem {
  id: string;
  content: ReactNode;
  side: 'left' | 'right';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = '' }: TimelineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(1000);
  const { scrollYProgress } = useTimeline({
    containerRef,
    itemCount: items.length,
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Calculate actual height from content
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [items]);

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {/* Animated timeline line */}
      <svg className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ height: `${height}px` }}>
        <motion.path
          d={`M 0 0 L 0 ${height}`}
          stroke="url(#timelineGradient)"
          strokeWidth="4"
          fill="none"
          style={{ pathLength, opacity }}
        />
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Timeline items */}
      {items.map((item, index) => {
        const x = item.side === 'left' ? -30 : 30;
        const progressStart = index / items.length;
        const progressEnd = (index + 1) / items.length;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative z-10 mb-20"  // 80px = 5rem
          >
            {/* Connection dot */}
            <motion.div
              animate={{
                scale: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd ? 1.5 : 1,
                backgroundColor: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd ? '#34d399' : '#6b7280',
              }}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                boxShadow: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd
                  ? '0 0 20px rgba(52, 211, 153, 0.5)'
                  : 'none'
              }}
            />

            {/* Content */}
            <div className={`w-full md:w-5/12 ${item.side === 'left' ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}>
              {item.content}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/ui/Timeline.tsx
git commit -m "Update Timeline component for side-specific positioning

Add dynamic height calculation, side-specific card positioning,
and improved dot animation timing. Cards now properly align
left or right based on side prop.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Refactor Experience Section with Minimalist Cards

**Files:**
- Modify: `src/components/sections/Experience.tsx`

**Step 1: Update Experience section**

Replace the entire file with:

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
          <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 rounded flex-shrink-0" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{exp.title}</h3>
          <p className="text-lg font-semibold text-gray-200">{exp.company}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
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

**Step 2: Test Experience section**

```bash
npm run dev
```

Verify:
- Cards appear on right side of timeline
- Logos display inline (32x32px)
- Title is prominent (emerald-400)
- Hover effect: cards lift 6px
- Animations cascade with stagger

**Step 3: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "Refactor Experience section with minimalist timeline cards

Remove card backgrounds, descriptions. Add inline logos before title.
Title as hero, company secondary, period with calendar icon.
All cards on right side of timeline line. Clean typography.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Refactor Education Section with Minimalist Cards

**Files:**
- Modify: `src/components/sections/Education.tsx`

**Step 1: Update Education section**

Replace the entire file with:

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
          <img src={edu.logo} alt={`${edu.school} logo`} className="w-8 h-8 rounded flex-shrink-0" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{edu.degree}</h3>
          <p className="text-lg font-semibold text-gray-200">{edu.school}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
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

**Step 2: Test Education section**

```bash
npm run dev
```

Verify:
- Cards appear on left side of timeline
- Logos display inline (32x32px)
- Degree is prominent (emerald-400)
- Hover effect: cards lift 6px
- Animations cascade with stagger
- Complements Experience section visually

**Step 3: Commit**

```bash
git add src/components/sections/Education.tsx
git commit -m "Refactor Education section with minimalist timeline cards

Remove card backgrounds, descriptions. Add inline logos before title.
Degree as hero, school secondary, period with calendar icon.
All cards on left side of timeline line. Clean typography.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Verify Responsive Behavior

**Files:**
- Check: `src/App.tsx` (grid layout)

**Step 1: Verify App.tsx grid layout**

```bash
grep -A 10 "Experience\|Education" src/App.tsx | grep "grid"
```

Expected: Should see `grid grid-cols-1 md:grid-cols-2 gap-8` wrapping both components

If not present, ensure the grid exists:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto">
  <Experience />
  <Education />
</div>
```

**Step 2: Test responsive behavior**

```bash
npm run dev
```

Test desktop (browser width ≥ 768px):
- [ ] Experience in left column
- [ ] Education in right column
- [ ] Both timelines visible side-by-side
- [ ] 32px gap between columns

Test mobile (browser width < 768px):
- [ ] Experience appears first (above)
- [ ] Education appears second (below)
- [ ] Both timelines take full width
- [ ] All animations work on mobile

**Step 3: Commit (if App.tsx was modified)**

```bash
git add src/App.tsx
git commit -m "Ensure responsive grid layout for Experience/Education

Side-by-side columns on desktop (md:grid-cols-2), stacked on mobile.
Maintains 32px gap between columns using gap-8 utility.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Run Final Verification

**Files:**
- All modified files

**Step 1: Run build**

```bash
npm run build
```

Expected: Build completes successfully, no TypeScript errors

**Step 2: Check bundle size**

```bash
ls -lh dist/assets/*.js | tail -5
```

Expected: No significant bundle size increase

**Step 3: Manual testing checklist**

Test in browser:
- [ ] Timeline lines visible and centered in each section
- [ ] Experience cards on right side, Education cards on left side
- [ ] All cards cascade in with stagger animation
- [ ] Timeline line draws from top to bottom
- [ ] Dots fill when cards enter viewport
- [ ] Logo inline with title (32x32px)
- [ ] Title prominent (emerald-400, H3 size)
- [ ] Company/school secondary (gray-200, H4 size)
- [ ] Period with calendar icon
- [ ] No card backgrounds (minimalist)
- [ ] Hover lifts card 6px
- [ ] Desktop: side-by-side layout works
- [ ] Mobile: stacked layout works
- [ ] No console errors
- [ ] All animations smooth (60fps)

**Step 4: Run lint**

```bash
npm run lint
```

Note: Pre-existing lint issues will still appear (9 issues from baseline). Only concerned if NEW issues appear.

**Step 5: Final commit**

```bash
git add .
git commit -m "Complete Experience & Education timeline redesign

Implement parallel timeline layout with minimalist card design:
- Side-by-side columns on desktop, stacked on mobile
- Experience cards on right side, Education on left
- Minimalist cards (no background) with inline logos
- Title as hero, company/school secondary
- Period with calendar icon
- Scroll-triggered animations with timeline line drawing
- Dot fill animations on scroll
- Generous 80px spacing between items

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Completion Checklist

Before marking complete, verify:

- [ ] All 5 tasks completed
- [ ] Build runs without errors
- [ ] Timeline lines visible and properly positioned
- [ ] Cards appear on correct sides (Experience: right, Education: left)
- [ ] All animations play smoothly
- [ ] Responsive layout works (desktop side-by-side, mobile stacked)
- [ ] No regressions from baseline
- [ ] Design matches approved spec
- [ ] Code committed frequently (per task)

---

**End of Implementation Plan**
