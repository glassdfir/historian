# Historian

Read browser history, and any other SQLite database.

Drop in Chrome, Edge, Brave, Firefox or Safari databases and Historian recognizes them, converts every timestamp format to UTC and decodes visit types and download states. Drop several at once to get one combined timeline across browsers. Add the `-wal` file and it merges the committed transactions the database file hasn't caught up on yet. Anything else gets a table browser that recognizes timestamp columns, a hex view for blobs, and a SQL console.

**Good for:** Browser history from a forensic image, recovering the last few minutes of activity from a WAL file, and poking at any app's SQLite store.

**Live:** https://jon.glass/historian/

| Browser | Files | Reports |
|---|---|---|
| Chromium (Chrome, Edge, Brave, Opera, Vivaldi) | `History`, `Cookies`, `Login Data`, `Web Data`, `Shortcuts` | Visits, URLs, Downloads, Search Terms, Most Visited, Omnibox Shortcuts, Cookies, Saved Logins, Autofill |
| Firefox | `places.sqlite`, `cookies.sqlite`, `formhistory.sqlite` | Visits, Places, Downloads, Bookmarks, Typed Input, Form History, Cookies |
| Safari | `History.db` | Visits (with redirects), History Items |

A single self-contained page: SQLite is compiled to WebAssembly and embedded, so it works offline and nothing you load leaves the browser. Open `index.html` or serve the folder over HTTPS. Uses the shared suite script at `/assets/suite/handoff.js` from [jon.glass](https://jon.glass) to send rows to Shifu, Recap and Tessera and to take SQLite files from Hexes, so cross-tool handoff only works when served from jon.glass.

Cookie values and saved passwords are shown as encrypted blobs: decrypting them needs the OS keychain or DPAPI. Deleted records in freelist pages are not carved.

## Building

`index.html` is generated: edit `src/index.src.html`, then `npm install && npm run build` to embed [sql.js](https://github.com/sql-js/sql.js).

## License

MIT © 2026 [Jon Glass](https://jon.glass/). Use it however you like; just keep the copyright notice. See [LICENSE](LICENSE).

Embeds [sql.js](https://github.com/sql-js/sql.js) (MIT) and SQLite (public domain).
