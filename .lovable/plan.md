

# DesentupeCuritiba — Fase 1 Core MVP

Building the marketplace directory "Serviços no Bairro" as a React SPA with static mock data. This is a large project, so we'll implement it in phases. This plan covers **Fase 1 — Core MVP**.

## What will be built

### 1. Data Layer (static mock)
- `src/data/bairros.ts` — 75 bairros of Curitiba organized by Regional + popular neighborhoods
- `src/data/cidades-rmc.ts` — 29 RMC cities + extended area
- `src/data/servicos.ts` — All service categories (desentupimento + encanamento)
- `src/data/empresas.ts` — 10 realistic mock companies with ratings, services, coverage, hours, payment methods
- `src/data/faq.ts` — FAQ data organized by category
- Shared TypeScript types in `src/types/`

### 2. Design System
- Color palette: Primary #1B4FD8, Secondary #FF6B00, Accent #00C853, Alert #EF4444
- Inter font family (already available via Tailwind defaults)
- Reusable components: `CompanyCard`, `CompanyCardPremium`, `ServiceIcon`, `RatingStars`, `BadgeVerified`, `Badge24h`, `EmergencyBanner`, `WhatsAppButton`, `SearchBar`, `FilterSidebar`, `BreadcrumbNav`

### 3. Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Hero + search bar + categories + bairros grid + RMC carousel + featured companies + emergency banner |
| `/curitiba/:bairro` | Bairro page | Breadcrumb, company listing, filters, FAQ, neighboring bairros |
| `/empresa/:slug` | Company profile | Full profile with gallery, services, reviews, WhatsApp contact form |
| `/servicos/:slug` | Service page | Service description, companies offering it, FAQ |
| `/faq` | FAQ Master | Accordion by category with search |
| `/busca` | Search results | Filtered listing with sidebar filters + sort |

### 4. Key Features
- **Mega Search Bar**: 3-field search (service type, location, submit) with autocomplete
- **WhatsApp Integration**: Contact form generates pre-formatted WhatsApp message via `wa.me` links
- **Floating WhatsApp button**: Fixed on all pages
- **Emergency banner**: Sticky top banner with animation
- **Company cards**: Standard + premium variants with badges, ratings, services
- **Filter system**: By type, availability, rating, services, payment, verification
- **FAQ with accordion**: Categorized, searchable
- **Responsive/mobile-first**: Single column cards, collapsible filters, 44px touch targets

### 5. Implementation Order
1. Types, data files, and design tokens (colors in tailwind config)
2. Shared UI components (cards, badges, search bar, WhatsApp button, emergency banner)
3. Homepage
4. Search/listing page with filters
5. Bairro template page
6. Company profile page
7. Service page
8. FAQ page
9. Mobile polish + floating WhatsApp

### Technical Notes
- All routing via react-router-dom with dynamic segments
- No backend needed for MVP — all data is static TypeScript
- SEO meta tags via `document.title` updates (limited in SPA, but functional for MVP)
- Schema.org JSON-LD injected via `useEffect` in page components
- Images use placeholder.svg initially
- WhatsApp links use `https://wa.me/55XXXXXXXXXXX?text=...` format

This is a substantial build (~20+ files). Shall I proceed with implementation?

