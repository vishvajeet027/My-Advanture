# MyAdventure — Project Documentation

Complete reference for the **MyAdventure** travel planning web app: architecture, pages, roles, UI/theme, storage, and features.

---

## 1. Overview

| Item | Detail |
|------|--------|
| **Product** | MyAdventure — frontend travel planning & booking demo |
| **Stack** | Vanilla HTML, CSS, JavaScript (no build step, no backend) |
| **Persistence** | Browser `localStorage` |
| **Fonts / icons** | Google Fonts (Poppins), Font Awesome 6.5 |
| **Entry** | `index.html` → redirects; app starts at `login.html` / `home.html` |

Users can register/login, browse packages / hotels / flights, build custom trips, track bookings and expenses, and (as admin) manage the travel catalog.

---

## 2. Tech architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  HTML pages │────▶│  JS modules      │────▶│  localStorage   │
│  + CSS      │     │  session/auth/   │     │  trips, catalog │
└─────────────┘     │  storage/pages   │     │  users, theme   │
                    └──────────────────┘     └─────────────────┘
```

- **No server API** — all data is seeded from `js/mockdata.js` and stored locally.
- **Shared helpers** — `storage.js` (CRUD + theme + settings), `session.js` (auth/role), `app.js` / page scripts.
- **Auth gate** — most app pages load `session.js`, which redirects to `login.html` if there is no session.

---

## 3. File map

### Pages (HTML)

| File | Purpose |
|------|---------|
| `index.html` | Redirect / landing entry |
| `login.html` | Login, signup, forgot password, success panels |
| `home.html` | Post-login hub (role-aware cards) |
| `dashboard.html` | Analytics, expenses, weather, settings |
| `destinations.html` | Packages + hotels (tab/view query) |
| `planner.html` | Flights browse / book |
| `mytrips.html` | Saved trips / bookings |
| `tripbuilder.html` | Multi-day custom trip builder |
| `admin.html` | Admin catalog CRUD |

### Styles (CSS)

| File | Used by |
|------|---------|
| `css/auth.css` | Login only (independent dark curved layout) |
| `css/style.css` | Shared app chrome: nav, cards, modals, destinations, flights, trips |
| `css/dashboard.css` | Dashboard layout, sidebar, KPIs, charts |
| `css/home.css` | Home hub (own tokens; does not load `style.css`) |
| `css/admin.css` | Admin catalog UI |
| `css/tripbuilder.css` | Trip builder sidebar + day planner |

### Scripts (JS)

| File | Role |
|------|------|
| `js/theme-init.js` | Early FOUC fix for dark theme |
| `js/storage.js` | Storage API, catalog, trips, expenses, theme, settings |
| `js/session.js` | Session, roles, nav by role, booking guards |
| `js/auth.js` | Login / signup / forgot password |
| `js/mockdata.js` | Seed: flights, hotels, places, packages, trips, expenses, weather |
| `js/package-itineraries.js` | Package day itineraries |
| `js/dashboard.js` | Dashboard rendering + charts |
| `js/destinations.js` | Packages & hotels UI |
| `js/planner.js` | Flights UI |
| `js/mytrips.js` | My trips / bookings |
| `js/tripbuilder.js` | Trip builder logic |
| `js/admin.js` | Catalog CRUD |
| `js/app.js` / `js/landing.js` | Shared / landing helpers |

---

## 4. Roles & authentication

### Demo accounts

| Role | Username | Password | Capabilities |
|------|----------|----------|--------------|
| **Admin** | `admin` | `Admin@123` | Manage catalog (hotels, places, vehicles, flights); view dashboards; **cannot book** or create tourist trips |
| **Tourist** | `tourist` | `Tourist@123` | Browse, book packages/hotels/flights, create/save trips, expenses/favorites |

Demo users are ensured in localStorage by `ensureDemoUsers()` in `auth.js`. New signups default to role `tourist`.

### Session

- Key: `myAdventureSession`
- Typical fields: `id`, `name`, `email`, `username`, `role`
- Users list: `myAdventureUsers` (passwords stored with `btoa` — demo only, not production security)

### Role behavior (`session.js`)

- `AuthSession.requireAuth()` — redirect to login if missing session
- `AuthSession.requireAdmin()` — admin-only pages (e.g. `admin.html`)
- `AuthSession.canBook()` / `guardBooking()` — block booking for admins (toast/notice)
- `applyRoleBasedNav()` — different top-nav links for admin vs tourist
- `applyRoleVisibility()` — show/hide `[data-role="admin"]` / `[data-role="tourist"]`
- Trips are scoped by tourist `userId` where applicable

### Login UI (`login.html` + `auth.css`)

Independent of the main app theme:

- Full-viewport dark form on the **left**
- Curved scenic image panel on the **right** (slider + quote card + glow arcs)
- Admin / Tourist demo toggle autofills credentials
- Panels: Login, Sign up, Forgot password, Success
- Social buttons are presentational (UI only)

---

## 5. UI & theme

### Brand & typography

- Brand: **MyAdventure** + paper-plane icon
- Font: **Poppins** (300–800)
- Icons: Font Awesome

### App theme tokens (`css/style.css` `:root`)

Current shared palette (light SaaS / teal):

| Token | Typical value | Use |
|-------|---------------|-----|
| `--primary` | `#0abde3` | Links, accents, active states |
| `--primary-dark` | `#0097c4` | Hover / emphasis |
| `--secondary` | `#00d2d3` | Gradient end |
| `--teal-gradient` | cyan → teal | Primary buttons, KPIs, active sidebar |
| `--dark` | `#1a1a2e` | Headings |
| `--text` | `#555` | Body / muted |
| `--light-bg` | `#f8fbff` | Page backgrounds |
| `--card-shadow` | soft cyan-tinted | Cards |
| `--radius` / `--radius-sm` | `16px` / `10px` | Rounding |

`home.css` mirrors a similar `:root` set for the hub page.

### Light / dark toggle

- Storage key: `myAdventureTheme` (`"light"` | `"dark"`)
- Attribute: `data-theme="dark"` on `<html>`
- `theme-init.js` applies dark ASAP to avoid flash
- `ThemeStorage` in `storage.js` + moon button in nav / dashboard settings
- Dark mode remaps backgrounds to deep navy (`#1e2130` family) and lightens text; primary cyan stays

**Login does not follow the app dark toggle** — it uses its own `auth.css` palette.

### Layout patterns

| Surface | Pattern |
|---------|---------|
| **App pages** | Fixed top navbar + content; many use white cards on light background |
| **Dashboard** | Sticky left sidebar + main grid (welcome, KPIs, charts, recent trips) |
| **Home** | Frosted top nav + hero greeting + hub image cards |
| **Catalog / trips** | Filter bar + responsive card grids + modals |
| **Trip builder** | Sticky left city/day sidebar + main day editor |
| **Admin** | Header, pill tabs, search toolbar, list cards, form modal |
| **Modals** | Shared `.modal-overlay` / `.modal` / delete-confirm pattern in `style.css` |

### Responsive

Breakpoints in CSS (~992 / 768 / 600) collapse nav to hamburger, stack dashboard grids, and shrink sidebars.

---

## 6. Feature modules

### 6.1 Home hub (`home.html`)

Role-aware entry after login:

- Tourist: Packages, Hotels, Flights, Create Trip, Bookings, Dashboard
- Admin: Catalog management emphasized; booking/create CTAs adjusted via role visibility

### 6.2 Dashboard (`dashboard.html` + `dashboard.js`)

- Greeting / welcome card
- KPI row (trips, packages, days, budget, favorites, expenses)
- Charts: budget bars, expense donut, trip-type bars
- Recent trips list, quick actions
- Expenses table + filters
- Weather cards (from mock weather)
- Settings: profile-ish fields, theme toggle, storage info; admin reset controls

### 6.3 Packages & hotels (`destinations.html` + `destinations.js`)

- Query `?view=hotels` switches hotels vs packages
- Search, category tags, sort
- Package detail modal with itineraries (`package-itineraries.js`)
- Hotel cards with facilities, ratings, booking date UI
- Booking gated by `AuthSession.guardBooking` for admins

### 6.4 Flights (`planner.html` + `planner.js`)

- Flight cards with route arc, airline badge colors, weather snippet
- Detail / passenger modal
- Admin sees book-notice instead of book CTA

### 6.5 My trips / bookings (`mytrips.html` + `mytrips.js`)

- List/grid of saved trips, stats, empty states
- View / delete (styled delete modal)
- Tourist-scoped trips; admin may see broader list via nav (“All Trips”)

### 6.6 Trip builder (`tripbuilder.html` + `tripbuilder.js`)

- Pick city → days → places / activities / budget
- Save trip to localStorage with `userId`
- Admins are redirected away (cannot create traveler trips)

### 6.7 Admin catalog (`admin.html` + `admin.js`)

Tabs: **Hotels**, **Places**, **Vehicles (rentals)**, **Flights**

- Search, add, edit, delete (event delegation + confirm modal)
- Persists via `CatalogStorage` / mock seed
- Reseed / clear catalog actions (admin settings / tools)

---

## 7. Data & storage

### Keys (`STORAGE_KEYS` in `storage.js`)

| Key | Content |
|-----|---------|
| `myAdventureTrips` | Saved trips |
| `myAdventureFavorites` | Favorites |
| `myAdventureExpenses` | Expenses |
| `myAdventureSettings` | User settings |
| `myAdventureTheme` | `"light"` \| `"dark"` |
| `myAdventureNewsletter` | Newsletter signups |
| `myAdventureWeather` | Weather cache / seed |
| `myAdventureUser` | Legacy/user blob (if used) |
| `myAdventureHotels` | Hotel catalog |
| `myAdventurePlaces` | Places catalog |
| `myAdventureRentals` | Vehicles catalog |
| `myAdventureFlights` | Flights catalog |
| `myAdventureUsers` | Registered users |
| `myAdventureSession` | Active session |

### Mock seed (`mockdata.js`)

Includes sample **flights**, **hotels**, **places**, packages/destinations, sample **trips**, **expenses**, **favorites**, **weather**. First visit (or admin reseed) hydrates catalog into localStorage.

### CRUD helpers

Generic get/add/update/delete helpers plus specialized stores (favorites, expenses, catalog types). Currency display often uses INR-style formatting in dashboard/trip UIs.

---

## 8. Page → assets cheat sheet

| Page | CSS | Main JS |
|------|-----|---------|
| Login | `auth.css` | `storage.js`, `auth.js` |
| Home | `home.css` | `session.js`, home logic |
| Dashboard | `style.css`, `dashboard.css` | `theme-init`, `storage`, `session`, `mockdata`, `dashboard` |
| Destinations | `style.css` | `session`, `storage`, `mockdata`, `destinations`, itineraries |
| Planner | `style.css` | `session`, `storage`, `mockdata`, `planner` |
| My trips | `style.css` | `session`, `storage`, `mytrips` |
| Trip builder | `style.css`, `tripbuilder.css` | `session`, `storage`, `mockdata`, `tripbuilder` |
| Admin | `style.css`, `admin.css` | `session`, `storage`, `mockdata`, `admin` |

---

## 9. User flows (short)

1. **Login** → choose Admin or Tourist (or register) → `home.html`
2. **Tourist booking** → Packages / Hotels / Flights → modal → book → appears under Bookings / trips
3. **Tourist trip** → Create Trip → select city & days → save → My Trips + Dashboard stats
4. **Admin catalog** → Manage Catalog → tab → add/edit/delete → listings update everywhere that read catalog storage
5. **Theme** → moon toggle or Dashboard settings → persists across app pages

---

## 10. Running the project

No install or build required:

1. Open the project folder in a static server (or open HTML files in the browser).
2. Prefer a local static server so modules and relative paths behave consistently, e.g.:
   ```bash
   npx serve .
   # or: python3 -m http.server 8080
   ```
3. Visit `login.html`, pick **Tourist** or **Admin**, and explore.

Hard-refresh after CSS/JS changes. Clear site localStorage to reset demos / catalog seed.

---

## 11. Constraints & notes

- **Front-end only** — not production auth (passwords are Base64 demo storage).
- **No real payments or live flight/hotel APIs** — mock prices and images (often Unsplash URLs).
- **Login theme is separate** from the main app light/dark system.
- Prefer **CSS variables** in `style.css` / `home.css` when theming; some charts/tags still use hardcoded hex in JS for coloring.
- Do not rename element IDs/classes used by page scripts without updating the corresponding JS.

---

## 12. Quick reference — who can do what

| Action | Tourist | Admin |
|--------|---------|-------|
| Login / logout | Yes | Yes |
| Browse packages / hotels / flights | Yes | Yes |
| Book package / hotel / flight | Yes | No |
| Create trip (trip builder) | Yes | No |
| View own bookings / trips | Yes | All trips (nav) |
| Dashboard analytics | Yes | Yes |
| Manage catalog CRUD | No | Yes |
| Reseed / clear catalog data | No | Yes |
| Toggle light/dark theme | Yes | Yes |

---

*Document generated for the MyAdventure codebase. Update this file when adding pages, roles, storage keys, or major UI theme changes.*
