## Frontend Implementation Plan – Fincha Sugar Factory

### 1. Foundation & Architecture
- Review existing scaffolding (App Router, Tailwind CSS, intl setup) and align with feature requirements.
- Define global layout hierarchy under `src/app/[locale]/(site)/` with shared providers, metadata handler, and dynamic routing.
- Establish utility modules: API client (axios + interceptors), react-query keys, SWR fetchers, CMS types, helpers for formatting (dates, phone numbers), and accessibility utilities.

### 2. Internationalization & Routing
- Configure locale segment `[locale]` with parallel routing: `src/app/[locale]/(site)/(marketing)/page.tsx`, `about`, `products`, etc.
- Implement language switcher using `next-intl` navigation helpers and store chosen locale via cookies.
- Expand message catalogs (`en.json`, `am.json`) covering navigation, CTA labels, page-specific copy, validation errors, and SEO metadata.
- Ensure RTL adjustments for Amharic (direction attributes, theme override, typography).

### 3. Shared UI Components
- Create design system primitives under `src/components/ui`: buttons, cards, chips, accordions, tabs, Modal/Dialog, skeleton loaders, pagination controls.
- Build layout components: `Navigation`, `MobileNav`, `Footer`, `LanguageSwitcher`, `AnnouncementBar`, `Hero`, `SectionHeading`, `Stats`, `MarqueePartnerRow`.
- Integrate Tailwind CSS utility classes with custom theme tokens (colors, typography, spacing) defined in `tailwind.config.ts`.
- Add Framer Motion-powered animation wrappers with respect to reduced-motion preferences.

### 4. Feature Modules & Pages
- Home (`/`): hero, highlights, product carousel, projects, CSR, news, media gallery, partners, FAQ, newsletter signup, contact CTA.
- About: company history timeline, leadership grid, sustainability pillars, dynamic stats from backend.
- Products: list view with filtering by category (terms), detail page with hero imagery, specs, and related resources.
- News & Events: index with search/filter, detail page with share links, recommended posts.
- CSR: showcase initiatives grouped by theme, download impact reports.
- Projects: portfolio grid with status, detail page timeline and gallery.
- Careers: open positions fetch, detail page, application form (react-hook-form + zod) posting to `/jobs/{id}/apply`.
- Tenders: listing, detail view with downloadable docs, apply form hitting `/tenders/{id}/apply` with validation + file upload support (if required via fallback instructions).
- Media: gallery with tabs (images/videos) using lightbox viewer.
- Downloads: table of resource documents with type filter and download tracking.
- Contact: company info, interactive map, general inquiry form via `/contact` endpoint, subscribe form via `/subscriptions`.
- FAQ: accordion pulling data from `/faqs`.
- Search: global search page querying `/search` or relevant endpoints (if absent, implement client-side filtering using aggregated data with fallback message).

### 5. Data Fetching & State Management
- Use react-query for queries requiring caching/mutations (e.g., `useProducts`, `useTenders`, `useContactMutation`).
- Provide SWR hooks for lightweight GET requests (footer navigation, company info) where revalidation is useful.
- Implement API error normalization and toasts/snackbars for user feedback.
- Handle loading states with skeletons/spinners; empty states with localized messaging.

### 6. Forms & Validation
- Define Zod schemas for each form and integrate with react-hook-form.
- Add custom form input components (TextField, TextArea, Select, FileUpload).
- Implement success/error banners with accessible ARIA roles.
- Support honeypot/captcha placeholders if backend expects them (configurable via env).

### 7. SEO, Accessibility & Analytics
- Implement dynamic metadata using Next.js `generateMetadata` per page with localized titles, descriptions, Open Graph, and Twitter cards.
- Add sitemap (`app/sitemap.ts`) and robots (`app/robots.ts`).
- Ensure semantic markup, keyboard navigation, focus styles, and landmark roles.
- Integrate Google Analytics client script using config fetched from `/google-analytics-config` with consent management banner.

### 8. Animations & Interactivity
- Use Framer Motion for section reveals, scroll-triggered animations (via `useInView` or IntersectionObserver) with `prefers-reduced-motion` handling.
- Include simple 3D tilt effects for cards using CSS transforms, fallback to static for reduced motion.
- Implement horizontal marquee/scroll snapping sections for showcase components.

### 9. Testing Strategy
- Configure Vitest + Testing Library with JSDOM environment and `setupTests.ts` to include `@testing-library/jest-dom` and MSW server.
- Write tests for: navigation rendering, locale switching, data fetching hooks (using MSW mocks), forms submission flows (success/error), dynamic metadata generation (unit), and accessibility snapshots (axe if feasible).
- Add integration test for Home page hero CTA links.

### 10. Tooling & CI Considerations
- Maintain strict TypeScript checks and ESLint passes.
- Ensure Tailwind CSS v4 setup includes any needed plugins (forms/typography) or custom layers if required.
- Provide npm scripts for lint, test, build, and start. Document environment variables in `.env.example` (client base URL, analytics ID).

### 11. Verification & Delivery
- Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- Prepare execution notes: implemented features, endpoints consumed, tests executed, any follow-up tasks.
- Include instructions to run frontend (`npm install`, `npm run dev`) and to configure `.env.local` (API base URL, analytics ID).
