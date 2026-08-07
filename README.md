# Mirage Testing Facility — UI Wireframes

Static HTML baseline wireframes for the control-plane dashboard described in `docs/Mirage Testing Facility Architecture Plan v1.0.md` §9.

Visual tokens match **AirAsia Mirage Booking** front-end (Inter, surface `#f6f8fa`, CTA `#c92d21`, nav active `#dc3224`, brand focus `#4b4fa6`, 220px sidebar shell, login sky gradient).

## Open locally

No build step. From this folder:

```bash
open login.html
# or
npx --yes serve .
```

Start at **`login.html`**. Click **Sign in with Google** (mock SSO) to reach the dashboard.

## Page map

| File | Module |
|------|--------|
| `login.html` | Mock Google SSO login |
| `index.html` | Home Overview |
| `config.html` | Scenario Workload Configurator & Launchpad |
| `telemetry.html` | Live Telemetry & Backpressure Matrix |
| `sync-analytics.html` | Dual-Sync & PNR Sync Analytics |
| `diagnostics.html` | Diagnostics & Breaking Point Analysis |

Shared assets: `wireframe.css`, `wireframe.js`.

## Notes

- All metrics and charts are **placeholders** / sample numbers from the architecture plan.
- Google SSO does not call a real IdP; it only redirects after a short delay.
- Scenario modules (Search, Booking, Split/Move, PNR Sync Poller, Delete/Cancel) live as cards on `config.html`, not as separate pages.
