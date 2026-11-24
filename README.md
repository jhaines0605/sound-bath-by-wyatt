# Sound Bath by Wyatt — soundbathbywyatt.com

A plain HTML site (no build step) hosted on Netlify, which deploys every push to `main`.

## Pages
| File | Page |
|---|---|
| `index.html` | Home: what a sound bath is, next few sessions, kind words |
| `sessions.html` | Special events, monthly sessions, what to expect, private sessions |
| `about.html` | Wyatt's story, philosophy, instruments + gallery, monochord for sale |
| `faq.html` | 40 questions & answers, grouped by topic, with search |
| `contact.html` | Contact form (Netlify Forms, form name `contact`) |

## Where to make common edits
- **Schedule, special events, reviews, gallery photos** → `content.js` (instructions inside).
  Monthly session dates update themselves; special events disappear the day after they happen.
- **Look and colors** → `styles.css` (palette at the top).
- **Menu and footer** → repeated at the top and bottom of each page; change all five.
- **Monochord sells** → delete the `MONOCHORD (FOR SALE)` section in `about.html` and the
  "Monochord for Sale" footer link on each page.
- **Photos** → `images/` folder.

## Links to a specific spot
- Contact form with a topic picked: `contact.html?topic=Private%20session`
- One FAQ answer opened: `faq.html#` + the question's id (e.g. `faq.html#what-should-i-wear-to-a-sound-bath-meditation`)
- Old one-page links (`/#schedule`, `/#contact`, `/#monochord`…) forward to the new pages.
