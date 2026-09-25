# FullStack Starter Kit

<!-- starter-kit:start -->
> **This is the internal-apps starter kit.** Don't build features here — generate a new project from it:
>
> ```bash
> pnpm create-project "Vendor Portal"                    # prompts for a theme
> pnpm create-project "Vendor Portal" --theme lagoon
> ```
>
> Options: `--theme <key>`, `--server-port`, `--client-port`, `--dir <path>`, `--mongo-uri <uri>`.
>
> The script copies the kit to `../Vendor-Portal`, renames everything (app name, database `vendor_portal_db`, storage keys), sets the default theme (**Crimson Slate** if none is chosen), picks free ports and writes `.env` files with fresh JWT secrets.
>
> Then set `MONGODB_URI` in `server/.env` (unless you passed `--mongo-uri`) and run `pnpm install && pnpm dev`.
>
> Improvements meant for every future project (theme, layout, auth, shared components) belong **here** in the kit.

<!-- starter-kit:end -->
MERN monorepo with authentication, a light/dark themed layout (navbar + collapsible sidebar), a Control Center theme picker and user management. Domain features are built on top of this base.

## Stack

- **Client:** React 19, Vite, Mantine, Tailwind CSS, React Query, Redux Toolkit, React Router, React Hook Form
- **Server:** Express 5, Mongoose 8, Zod, JWT (access + refresh)
- **Database:** MongoDB
- **Exports:** ExcelJS and Puppeteer PDF report builders (`server/src/utils`)

## Getting started

```bash
cp server/.env.example server/.env   # set MONGODB_URI
cp client/.env.example client/.env
pnpm install
pnpm dev
```

- Client: http://localhost:5199
- API health: http://localhost:5099/api/v1/health

## Default login

A superadmin is created on first boot: **superadmin / super123** (override with `SUPERADMIN_USERNAME` / `SUPERADMIN_PASSWORD`).

## Users and roles

The superadmin creates users in **Settings** and assigns each a level from **L1 to L6**. Levels are labels only; the kit grants no level-based permissions, so each project defines its own:

- Roles: `server/src/constants/roles.js` and `client/src/constants/roles.js`
- Route protection: `authorize(...)` middleware, e.g. `authorize('superadmin', 'l5', 'l6')`

## Themes

46 themes, picked by the superadmin in **Control Center → Theme** and applied app-wide.

- Palettes: `client/src/constants/themeColors.js` (standard) and `premiumThemes.js` (premium)
- Picker order: `THEME_GROUP_ORDER` in `themeColors.js`
- Default: `DEFAULT_THEME_COLOR` (client and server)

Use `primary-*` / `brand-*` classes instead of fixed colors so new screens follow the theme.

## Project structure

```
client/src/
  api/  components/  constants/  hooks/  lib/  pages/  routes/  store/  utils/
server/src/
  config/  constants/  controllers/  middleware/  models/  routes/  seed/  services/  utils/  validators/
```

## Adding a module

1. **Server:** model → validator → service → controller → route, then mount it in `routes/index.js`.
2. **Client:** API module → React Query hook → page, then register the route in `App.jsx`, its path in `constants/index.js` and a nav item in `Sidebar.jsx`.

## Deploying

`render.yaml` defines the API (web service) and the client (static site). After the first deploy, set `FRONTEND_URL` and `VITE_API_URL` to the assigned URLs and use strong `JWT_SECRET` values.
