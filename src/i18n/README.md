# Translations (i18n)

The site is built in **English** (site root) and **Russian** (`/ru/`).

## Locale files

- `en.json` — English strings
- `ru.json` — Russian strings

Keys are nested in JSON and flattened at build time (`nav.aboutUs` → `nav_aboutUs`).

## Using translations in HTML

This project uses gulp-file-include with **`prefix: '@'`** (one at-sign). In templates:

```html
<a href="@localePrefix/about-us">@nav_aboutUs</a>
```

Use **one** `@` before each key — not `@@`. With `@@`, the build leaves a stray `@` before every translated word.

Build context also provides:

| Variable        | English   | Russian |
| --------------- | --------- | ------- |
| `@localePrefix` | _(empty)_ | `/ru`   |
| `@htmlLang`     | `en`      | `ru`    |
| `@locale`       | `en`      | `ru`    |

Static assets (CSS, JS, images) use **root paths** (`/styles/`, `/js/`, `/img/`) so they load correctly from both `/` and `/ru/`.

## Product `fullDescription` (shop product pages)

Use **one `<p class="text-normal">` per paragraph** inside `fullDescription` in `products.js` (and Russian overrides in `products.ru.js`). The build adds spacing between paragraphs automatically.

- Section titles: add `product-detail__desc-heading` on the `<p>`, e.g. `<p class="text-normal product-detail__desc-heading"><b>What you get:</b></p>`
- Legacy text with `<br>` between sentences still works: the build splits on `<br>` and creates `<p>` blocks.

## Adding copy for a page

1. Add keys to `en.json` and `ru.json`.
2. Replace hardcoded text in the page HTML with `@your_key`.
3. Run `npm run dev` or `npm run build`.

Shared chrome (header, footer, forms, cookies) is already translated. Page body text on inner pages is still English on `/ru/` until you add keys for that page.

## Naming rules

- Do **not** use keys that start with `for` or `if` right after `@` (e.g. avoid `@form_*`) — gulp-file-include treats `@for` and `@if` as control directives. Use `contact_*` instead of `form_*`.
- Do **not** use `@if` / `else` blocks — only `@if { ... }` without `else` is supported.
