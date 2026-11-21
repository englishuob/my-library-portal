# Ayman’s Library — My Office

A gradual rebuild of My Library, hosted on GitHub Pages. The approved glass portal opens the Library and Writing Workspace. Private files remain in Google Drive; no user data, OAuth credentials or access tokens are bundled in the repository.

## Current release: research v0.6

- **Books:** authorize `drive.readonly`, locate My Library or the selected folder, read Library_Metadata.json and enabled additional libraries, deduplicate sources, and open PDFs in the browser viewer. Other formats open in Drive. Original files, metadata, favorites and reading positions are not modified.
- **Notes:** display comments, research notes, reflections and quotations from existing metadata, plus material records from the original research bridge. Original notes open read-only with a Create editable copy action. New notes support manual save/edit, source and page links, Arabic/English text, search and progressive listing.
- **Projects:** display existing research-bridge projects, create projects, edit title/description and link books/notes. Project tabs show real linked sources and notes, including unavailable-item messages. Writing opens the separate writing workspace; it does not automatically copy project content.
- **Enable saving:** explicitly reconnect with `drive.readonly` plus `drive.file`. Both permissions use the same session/account. Saves append separate immutable files with the existing `aymanResearchBridge=event-v1` public custom property and JSON description format. This implementation never PATCHes, deletes or changes sharing on an original research/source file. Public custom properties are visible to applications authorized for the file; they do not make a file publicly shared.
- **Revision handling:** check the current heads before saving, reject stale edits, retain concurrent branches and flag conflicts. No automatic retry after uncertain saves. If a network error occurs, refresh and check the saved record before retrying.
- **Writer v0.5:** explicit Save to Drive creates/updates native Google documents created by this workspace. Open lists those documents. Supports basic paragraphs, headings, bold/italic/underline, bullet lists and RTL/LTR; complex documents are rejected instead of flattened. Saves use revision checks. Drafts/scratchpad are temporary until explicitly saved.

Unconnected Research Tray, Ideas Board and Insights are identified as pending in connected mode. Signed-out interfaces contain clearly labelled samples. Import/export dialogs, sample pinning and other preview-only tools are not production file operations. System/Light/Dark appearance is shared across the portal pages.

## Connection and privacy

Configure a Web OAuth client for the website origin in Google Cloud, enable Drive API (and Docs API for writing), and configure the test account/scopes. See [DRIVE_SETUP.md](DRIVE_SETUP.md). The owner has already configured these and confirmed real library reading and native document save/reopen in Arabic and English on 21 November 2026.

Only public connection settings (client ID and optional folder ID) and appearance preferences are stored in localStorage. Access tokens, catalogues, research data and drafts stay in page memory. Reconnect after a page reload. Disconnect/expiry clears connected research and catalogue data. Disconnect drops the page session; revoking the app grant is a separate Google Account action. Folder selection is an app filter, not a folder-scoped OAuth grant. Research bridge discovery searches the authorized account's owned research event files across Drive.

## Validation

Run `node drive.test.cjs`, `node research.test.cjs` and `node writing-cloud.test.cjs`.

Synthetic tests cover metadata imports/deduplication, folder pagination, readonly write rejection, Arabic, immutable save/reload/edit, stale revisions, concurrent branches, project links, token lifetime, formatting and unsupported documents. Browser checks use local synthetic OAuth/Drive transport and exercise note save, source linking and project tabs; these fixtures are not published. Real Notes/Projects authorization and save/reopen still need the owner's browser session; synthetic tests do not establish real-account success.

## Hosting

Static HTML/CSS/JavaScript, no build required. Serve the repository root or use GitHub Pages main/root. `index.html` is the portal, `library.html` the Library and `writing.html` the writer. `drive-model.js` and `research-model.js` adapt existing data; `drive.js` handles authorized API calls; `research-ui.js` renders research controls. Never add a client secret, token, downloaded metadata, private fixture or personal file to this public repository.
