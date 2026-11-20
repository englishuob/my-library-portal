# Ayman’s Library — My Office

A gradual rebuild of My Library. This release is an interface prototype, with the approved glass portal and a unified Library dashboard.

## Preview

Open `index.html` and select a destination. Enter opens the selected preview in the same tab, without a password. All sample sources, notes, projects, illustrations and statistics are demonstration content. No personal files or authentication secrets are bundled. Optional read-only Google Drive authorization is described below.

## Interfaces

Dashboard, book cards and list, source details, sample reader, notes and note dialog, projects and project tabs, research tray, ideas board, writing layout and document chooser, tags, collections, sample insights, help and compact settings dialogs. Navigation changes content inside one dashboard shell. System, Light and Dark share the portal theme preference.

## Scope

Navigation, sample filtering/sorting, book selection, theme switching, sidebar collapse and dialog interactions work locally. Pin changes and checkboxes last only for the current page session. Writing is an unsaved local preview. Form submissions show a preview acknowledgement and never upload or save data. The reader shows original illustrative placeholder prose, not book contents. Mind-map nodes open sample details; dragging and freehand links are not connected. The optional read-only book connection is described below; writing and research synchronization are planned separately.

## Files

`index.html`, `styles.css`, `app.js`: portal. `library.html`, `library.css`, `library.js`: workspace. No installation or build required. Serve the folder with any static HTTP server or GitHub Pages.

## Writing Workspace preview v0.3

`writing.html`, `writing.css` and `writing.js` provide a dedicated glass writing interface. The Portal destination and Library navigation both open it in the same tab. A startup chooser stays open until dismissed or a document is chosen. The workspace includes a searchable sample document list, pinned sample documents, numbered open tabs, new-document templates, a temporary editable document, basic formatting, RTL/LTR, word count, outline, research cards, scratchpad, focus mode, appearance and layout settings, and matching close-workspace dialogs. Unpinning the document panel enables pointer-leave hiding; opening and closing it changes the editor layout.

Documents and scratchpad contents are in page memory only. Switching tabs preserves those edits during the current page session; refreshing or navigating away clears them. Only theme preferences are stored in the browser. Import and export dialogs are visual previews and do not process files. No Google Docs, Drive, account authentication, or cloud saving has been connected.

## Read-only Google Drive integration v0.4

The Library toolbar now provides **Connect Drive**, also available through Account and Customize → Connection. The connection uses Google Identity Services and the Drive REST API. It requests only `https://www.googleapis.com/auth/drive.readonly`. That Google permission covers readable files across the authorized account; this implementation limits its listing to the selected Library folder and the enabled additional locations in that folder's metadata. Folder selection is an application boundary, not a folder-scoped OAuth permission.

The connection discovers a unique `My Library` folder, or uses a folder URL/ID supplied in Connection settings. It reads the existing `Library_Metadata.json` without migration or writes, follows enabled `__library.storageLocations`, handles paginated listings and deduplicates file IDs. It excludes password files, metadata backups and `Writing - ` documents. Supported source listings include PDF, EPUB, Google Docs, DOCX and text. Source IDs remain strings; missing authors, dates or page counts are not invented. `favorite` is displayed as the source's saved favorite, not assumed to be the previous app's separately stored pinned list.

PDF files are fetched with a Bearer header into a temporary Blob and displayed in the browser's PDF viewer. The token is never put in the iframe URL. Files that cannot be downloaded, unsupported in-app formats and viewer failures have an Open in Google Drive alternative. The new reader does not save pages or bookmarks. In connected mode, unconnected notes/projects/research/ideas/insights display a connection-stage message instead of mixing sample data with the real catalogue. Category and tag views use the read source metadata.

The OAuth client ID and optional folder ID are stored in the current browser's localStorage. Access tokens, source contents and catalogues stay in page memory. Refreshing or navigating to another page requires reconnecting; expired access or Disconnect clears the connected view. Disconnect ends this page's session; it does not revoke the application's Google grant. Users can revoke that grant in Google Account permissions. No files or sharing permissions are changed.

### One-time Google setup still required

No OAuth client ID or account grant is bundled with this repository. The code is prepared, but live authorization and real-book browser verification cannot complete until an owner configures Google Cloud. See `DRIVE_SETUP.md`. The previously accessible ChatGPT Drive connection is independent of authorization for this public website.

### Validation

Run `node drive.test.cjs` to verify synthetic normalization, system-file exclusion, folder validation, pagination, cross-folder deduplication, GET-only requests, memory-only token storage and cancellation of stale authorization callbacks. Browser interface checks use local synthetic fixtures, not copied user data. The fixtures are excluded from the published files. Production signed-out navigation and the setup dialog can be checked before Cloud configuration; successful real OAuth and private-file access remain pending.
