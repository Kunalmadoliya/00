# Design System & Components

The 00 Design System is built to communicate precision, premium quality, and developer-centric utilitarianism. It leans heavily on modern "SaaS" aesthetics: dark modes, subtle glassmorphism, micro-borders, and high-contrast typography.

## Foundation

### Colors
We use CSS variables defined in `src/app/globals.css` to manage themes.
- **Backgrounds**: Deep, rich blacks (`#0A0A0A`, `#050505`) to make vibrant accents pop.
- **Foregrounds**: Crisp whites for primary text, muted zinc/slate for secondary text to establish visual hierarchy.
- **Borders**: Extremely subtle borders (`border-white/10`) are used extensively to define spatial boundaries without adding clutter.
- **Accents**: Neon blue, purple, and green gradients are used sparingly for active states or "AI-generated" visual indicators.

### Typography
- **Primary (Sans)**: `Geist` by Vercel. Used for all general UI, headings, and paragraphs. Chosen for its incredible legibility at small sizes and precise geometric construction.
- **Monospace**: `Geist Mono` or `Oxanium`. Used for code blocks, terminal outputs, file names, and technical data.

## UI Primitives (`shadcn/ui`)

All base UI components live in `src/components/ui/`. When building new features, always compose these primitives rather than building from scratch.

### Button (`button.tsx`)
Supports various sizes and variants (`default`, `outline`, `ghost`, `link`). Includes native loading states and accessibility attributes.

### Card (`card.tsx`)
Used as the foundational container for almost all content blocks.
- **Rule**: Cards should almost always feature a subtle `ring-1 ring-white/10` and an inner shadow to create depth against dark backgrounds.

## Creating New Components

When building a new component for 00, follow these rules:

1. **Never leave empty space**: If a card has no content, do not render a blank rectangle. Fill it with a realistic empty state or skeleton loader.
2. **Accessible by default**: Ensure all interactive elements can be focused via keyboard and have appropriate `aria-*` tags.
3. **Use `cn()`**: Always expose a `className` prop and merge it using the `cn()` utility.
4. **Interactive States**: Every button or clickable card must have a `hover:` state (usually background lightening) and an `active:` state (e.g., `active:scale-[0.98]`).
