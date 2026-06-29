# Birdhouse 🪶

Marketing website for **Birdhouse Shelter** — PGs, hostels, co-living, rentals
and co-working spaces across Gurgaon, Delhi, Punjab & Jaipur.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Resend key (optional for dev)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Contact / lead form

The hero "Request A Call Back" form and the contact-page form both POST to
`/api/lead` (`app/api/lead/route.ts`), which emails the lead via
[Resend](https://resend.com) (`lib/email.ts`).

- Set `RESEND_API_KEY` in `.env.local` to send real emails.
- **Without a key**, submissions are validated and logged to the server console
  (`delivered: false`) — handy for local development.
- `LEAD_TO_EMAIL` controls where leads are delivered (default
  `hello@birdhouse.co.in`); `LEAD_FROM_EMAIL` must be a domain verified in Resend.

## Project structure

```
app/                 routes (home, about, contact, broker, blogs, cities, properties, legal)
  api/lead/route.ts  lead submission endpoint
components/
  layout/            Header, Footer, MobileNav
  home/              homepage sections
  property/          PropertyCard, PropertyExplorer
  forms/             LeadForm (react-hook-form + zod)
  ui/                Button, Section, Badge, Field, Reveal
lib/
  data/              seed content — properties, categories, blogs, FAQs, site info, nav
  email.ts           Resend client
  leadSchema.ts      shared zod validation
```

## Brand

| Token        | Value     |
|--------------|-----------|
| Primary      | `#0F766E` (teal) |
| Primary dark | `#134E4A` |
| Accent       | `#F59E0B` (amber) |
| Ink          | `#0F172A` |

Defined as Tailwind v4 theme tokens in `app/globals.css`
(`bg-primary`, `text-accent`, etc.).

## To customise / extend

- **Logo:** replace the SVG mark in `components/Logo.tsx`.
- **Property images:** cards currently use branded gradient placeholders. Add an
  `image` field to `lib/data/properties.ts` and render it in
  `components/property/PropertyCard.tsx` with `next/image`.
- **Inventory & blogs:** edit the seed files in `lib/data/` — pages, sitemap and
  filters update automatically.
