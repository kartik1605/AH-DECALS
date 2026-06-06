# AH Decals — Walls &amp; Decor

A multi-page marketing &amp; catalog website for **AH Decals**, a wall-décor studio in Kota, Rajasthan. Built as a redesign/upgrade of [ahdecals.com](https://ahdecals.com/).

Static **HTML / CSS / JavaScript** — no build step, no dependencies. Just open `index.html` or serve the folder.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, two main categories, full "Shop by Category" SKU showcase, promise band, bestsellers, about, process, reviews |
| `digital-artworks.html` | **Digital Artworks** — every printed SKU: wallpapers, wall displays, laptop &amp; fridge skins, switch-board art, door &amp; window decals (filterable) |
| `handmade-art.html` | **Hand-Made Art** — real original paintings (oil, acrylic, mixed, portrait) |
| `about.html` | Studio story, values, milestones, FAQ |
| `contact.html` | Quote / commission / franchise enquiry form + studio details |

## Product categories

**Digital Artworks** (printed): Wallpapers (15+ themes) · Wall Displays (acrylic / canvas / split / hexagon) · Laptop Skins · Fridge Skins · Switch-Board Art · Door Stickers · Window Stickers

**Hand-Made Art** (originals): Oil · Acrylic · Mixed Media · Portraits

## Design

- Light **camel** primary palette (`#C8A57E`) on warm sand &amp; ink
- Fonts: Playfair Display (display) + Inter (body)
- Animations: scroll reveals, custom cursor, marquee, magnetic buttons, counters, quick-view modal, accordions
- Fully responsive; failed remote images auto-fall back to an elegant camel gradient placeholder

## Run locally

```bash
# any static server, e.g.
python -m http.server 4321
# then open http://localhost:4321
```

## Structure

```
.
├── index.html
├── digital-artworks.html
├── handmade-art.html
├── about.html
├── contact.html
├── css/style.css
├── js/main.js
└── assets/
```

## Contact

AH Decals · First Floor, JanakDeep Complex, Kotri Road, Gumanpura, Kota – 324001, Rajasthan
info@ahdecals.com · +91 98872 17622

---

> Images are currently Unsplash placeholders and prices are sample data — replace with real AH Decals product photography and pricing before going live.
