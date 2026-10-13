# Car shopping — home & search prototype

An interactive mobile prototype of a car shopping app home screen, rendered in a phone
frame. Search, type-ahead suggestions, body-style filters and saves all work against five
sample listings.

## Run it

Open `index.html` in a browser. That's it — no build step, no dependencies, no network
requests. The whole prototype (markup, CSS, JS, car illustration) is one self-contained
file, so it also works straight from GitHub Pages.

To publish with Pages: push this folder, then in the repo go to **Settings → Pages** and
set the source to your branch with this folder as the root (or move `index.html` to the
repo root and serve from there).

## What's interactive

| Interaction | Behavior |
| --- | --- |
| Type in the search field | Filters listings live; suggestions bold the matched text |
| Body-style chips | Compose with the text query (e.g. `tesla` + Electric) |
| Recent searches, make tiles | Tap to fill the search field |
| Heart on a listing | Toggles save; the count shows on the Saved tab |
| Saved tab | Lists saved cars, with its own empty state |
| Sell / Account tabs | Stubbed — those screens aren't part of this prototype |
| No results | Named empty state with a Reset search action |

State lives in memory only, so a reload starts fresh.

## Design

Colors come from the CarGurus palette: `#0763D3` accent, `#05317B` navy, `#00002D` ink.
Deal badges use separate semantic colors (green / blue / amber) so they don't compete with
the accent. Prices and mileage are set in a monospaced face with tabular figures so digits
align down the column.

Light and dark themes are both defined as CSS custom properties on `:root`. Dark mode
follows `prefers-color-scheme`, and `data-theme="light"` / `data-theme="dark"` on the root
element overrides it in either direction.

## Files

- `index.html` — the prototype. Self-contained; this is the thing you open or deploy.
- `CarShoppingHome.jsx` — the same screen as a React + Tailwind component, for dropping
  into an app. It expects the Tailwind color tokens listed in the Design section above.

The two are **not** generated from each other — they were written separately, so a change
to one does not propagate to the other. `index.html` is the more complete of the two: it
adds the Saved-tab state and the tab bar behavior that the JSX version doesn't have.
