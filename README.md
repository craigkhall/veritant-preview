# `_mw_dev` — Veritant site (working / preview)

All site pages and assets live **here**. Maps to the **`preview`** remote when you ask to stage.

Edit HTML / CSS / JS / assets in this folder. Local preview from repo root:

```bash
python3 -m http.server 8765 --directory _mw_dev
```

Then open http://127.0.0.1:8765/

Methodology: http://127.0.0.1:8765/methodology.html

**Invent is LIVE** — do not push invent from this folder. Sync into `_invent_push/` first; invent push only after explicit approval. See `_shipping/REPO_MAP.md`.

Sibling folders at repo root (not site content):

| Folder | Role |
|--------|------|
| `_invent_prelaunch_push/` | Password / GTM blue-page gate |
| `_invent_push/` | Invent payload (synced from this folder) → **LIVE** when pushed |
| `_shipping/` | Allowlists, sync script, lane docs |
