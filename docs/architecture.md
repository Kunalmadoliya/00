# Architecture Guide

This document outlines the architectural decisions and structures used in the 00 application builder.

## Core Philosophy

00 is built on the **Next.js App Router** paradigm. We strictly separate Server Components from Client Components to optimize performance, minimize client-side JavaScript, and improve SEO.

## Next.js App Router

- **`src/app/layout.tsx`**: The root layout. This is a Server Component. It handles HTML structure, global CSS injection, fonts, SEO metadata, and wraps the application in essential providers (Theme, Clerk, Query).
- **`src/app/page.tsx`**: The entry point for the landing page. It assembles various sections (`Hero`, `BentoGrid`, `TrustedBy`, etc.).
- **Client boundaries**: Any component requiring interactivity (hooks, state, Framer Motion) must include the `"use client"` directive at the very top of the file.

## Component Hierarchy

We organize components by their domain and reusability:

1. **`src/components/ui/`**: 
   - The foundational layer. 
   - These are atom-level components (Buttons, Inputs, Cards) generated primarily via `shadcn/ui`. 
   - They are completely stateless and highly customizable via Tailwind classes and `class-variance-authority` (CVA).

2. **`src/components/layout/`**:
   - Structural components used globally.
   - Example: `Navbar`, `Footer`.
   - These components handle their own responsive behaviors and routing links.

3. **`src/components/sections/`**:
   - Large, domain-specific blocks used to construct pages (specifically the landing page).
   - Example: `HeroSection`, `BentoGrid`, `Workflow`.
   - These components are highly complex, often containing internal state and sophisticated animations.

## State Management

- **Local UI State**: Handled natively with React `useState` and `useReducer`.
- **Server State**: Managed via React Server Components (fetching data directly in the component).
- **Client Data Fetching**: We utilize `@tanstack/react-query` (wrapped via `QueryProvider`) for client-side mutations and polling.
- **Authentication State**: Delegated entirely to `@clerk/nextjs`. User identity and session tokens are managed via their provided hooks and Server Actions.

## Utilities

- **`cn` (in `src/lib/utils.ts`)**: A vital utility function that merges Tailwind classes using `clsx` and `tailwind-merge`. This prevents specificity conflicts when passing custom classes to UI components.
