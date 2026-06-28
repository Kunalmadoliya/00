# Animation & Motion Principles

Animations in 00 are not decorative; they are functional. They serve to explain complex processes (like compilation pipelines), guide the user's eye, and provide tactile feedback.

We exclusively use **Framer Motion** for complex orchestrations and **Tailwind CSS transitions** for simple hover states.

## Shared Variants

Common animation configurations are stored in `src/lib/animations.ts`. Use these to ensure consistency across the application.

```typescript
import { slideUp, fadeIn, staggerContainer } from "@/lib/animations";

// Usage in a component:
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={slideUp}>Item 1</motion.div>
  <motion.div variants={slideUp}>Item 2</motion.div>
</motion.div>
```

## Principles

1. **Physics over Durations**: Prefer spring physics over linear durations. Springs feel natural and interruptible.
   - Example: `transition={{ type: "spring", stiffness: 300, damping: 30 }}`
2. **Micro-interactions**: Use CSS transitions for micro-interactions to save JavaScript overhead.
   - Example: `transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`
3. **Layout Animations**: When elements are added, removed, or change size, use Framer Motion's `layout` prop to smoothly reflow surrounding content rather than snapping.
4. **Staggered Entrances**: When presenting lists or grids (like the Bento Grid or feature lists), never fade them in all at once. Use a staggered delay (usually `0.1s` intervals) to create a cascading entrance.
5. **Reduced Motion**: Respect user preferences. Framer Motion handles this automatically in newer versions, but ensure infinite loops (like marquees) can be paused if necessary.

## The "AI Generation" Effect

A core visual motif of 00 is code generation. We simulate this using custom "typing" effects and phased rendering.

- **Typing effect**: Achieved by iterating over a string and rendering characters one by one with a small delay.
- **Pipelines**: Achieved by combining `AnimatePresence` with `mode="wait"` to smoothly swap out abstract representations (ASTs) with concrete UI components.
