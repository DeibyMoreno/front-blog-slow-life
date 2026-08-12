# Slow Life · Panel Admin

## Direction and feel

Calm, editorial, warm — the panel should feel like working at a well-worn
desk, not a cold SaaS terminal. Matches the brand: the person managing the
blog is the same one who reads it. Texture of paper and linen, one quiet
accent (forest), nothing shouting.

## Depth strategy

**Borders-only.** Subtle `linen` borders/surface shifts, no heavy shadows.
Elevation steps are warm tonal shifts inside the brand family (cream → sand),
never cold grays. One accent color (forest) used only to signal the active
location and primary actions.

## Spacing

Base unit **4px**, multiples only. Nav items `px-3.5 py-2.5`, menu gaps `gap-1`,
section padding `p-5/p-6`, content column `max-w-5xl px-5 sm:px-8`.

## Hierarchy

Type scale ratios ~1.25 with **weight + tint doing most of the work**:
- Display headings: `font-display` (Fraunces), `text-3xl`, tracking-tight, `text-ink`.
- Eyebrow labels: `text-xs font-medium uppercase tracking-widest text-sage`.
- Body/labels: Manrope `text-sm`; primary `text-ink`, secondary `text-stone`.
- Active nav item: `font-medium text-forest` on `bg-forest/10`; inactive
  `text-stone` with `hover:bg-sand hover:text-ink`.

## Surfaces

- Canvas (content zone): `bg-sand`.
- Sidebar: `bg-cream`, separated by `border-linen` (`lg:border-r`), same warm
  family as canvas — no "sidebar world / content world" split.
- Cards: `Card` (shadcn, `bg-card` = cream) over sand zone = one whisper-quiet lift.

## Layout

Sidebar `lg:w-72` (288px) — "navigation serves content" proportion; content
`flex-1 max-w-5xl`. On mobile the nav becomes a horizontal scroll row
(`overflow-x-auto` → `lg:flex-col`); no JS drawer.

## Key component patterns

- **NavLink** (client, `usePathname` active state) — `rounded-lg px-3.5 py-2.5 text-sm`; active `bg-forest/10 font-medium text-forest`, aria-current="page"; inactive `text-stone hover:bg-sand hover:text-ink`. `shrink-0` on mobile for the horizontal row.
- **Sidebar** (server, reads `auth()`) — brand block (`Logo title size="26"`), nav list, footer with user name/role + `SignOutButton`.
- **EmptyState** (placeholder) — eyebrow `text-sage`, h1 Fraunces `text-3xl text-balance`, description `text-stone max-w-prose`, then a `Card` with "En construcción" note.

## Typography / tokens

Only brand tokens (no hardcoded hex): ink, cream, sand, sage, forest, terra,
linen, stone. Fraunces = `font-display` (voice), Manrope = `font-sans`.