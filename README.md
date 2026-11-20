# Ayman’s Library — My Office

A gradual rebuild of My Library. This release is an interface prototype, with the approved glass portal and a unified Library dashboard.

## Preview

Open `index.html` and select a destination. Enter opens the selected preview in the same tab, without a password. All sample sources, notes, projects, illustrations and statistics are demonstration content. No personal files, Google account access, authentication secrets or backend services are included.

## Interfaces

Dashboard, book cards and list, source details, sample reader, notes and note dialog, projects and project tabs, research tray, ideas board, writing layout and document chooser, tags, collections, sample insights, help and compact settings dialogs. Navigation changes content inside one dashboard shell. System, Light and Dark share the portal theme preference.

## Scope

Navigation, sample filtering/sorting, book selection, theme switching, sidebar collapse and dialog interactions work locally. Pin changes and checkboxes last only for the current page session. Writing is an unsaved local preview. Form submissions show a preview acknowledgement and never upload or save data. The reader shows original illustrative placeholder prose, not book contents. Mind-map nodes open sample details; dragging and freehand links are not connected. Functional integrations are planned separately.

## Files

`index.html`, `styles.css`, `app.js`: portal. `library.html`, `library.css`, `library.js`: workspace. No installation or build required. Serve the folder with any static HTTP server or GitHub Pages.

## Writing Workspace preview v0.3

`writing.html`, `writing.css` and `writing.js` provide a dedicated glass writing interface. The Portal destination and Library navigation both open it in the same tab. A startup chooser stays open until dismissed or a document is chosen. The workspace includes a searchable sample document list, pinned sample documents, numbered open tabs, new-document templates, a temporary editable document, basic formatting, RTL/LTR, word count, outline, research cards, scratchpad, focus mode, appearance and layout settings, and matching close-workspace dialogs. Unpinning the document panel enables pointer-leave hiding; opening and closing it changes the editor layout.

Documents and scratchpad contents are in page memory only. Switching tabs preserves those edits during the current page session; refreshing or navigating away clears them. Only theme preferences are stored in the browser. Import and export dialogs are visual previews and do not process files. No Google Docs, Drive, account authentication, or cloud saving has been connected.
