# Google Drive connection setup

This is a one-time owner setup for the read-only Library connection. Do not publish Drive data, Google account passwords, access tokens or client secrets in the repository. A browser OAuth client ID is public and may be entered in the Library's Connection settings.

1. In Google Cloud Console, create or select the project that will own this connection.
2. Enable **Google Drive API** in that project. No paid service or billing upgrade is required by this implementation; do not add one simply to configure it.
3. Configure Google Auth Platform branding and audience. For a personal account, an External app in Testing with the intended account added as a test user can be used for initial testing. Review any verification requirements Google displays for the chosen scope before wider distribution.
4. Declare `https://www.googleapis.com/auth/drive.readonly` as the requested data-access scope. No write scope is used at this stage. The Google permission covers the account's accessible files; the application only lists the chosen library folders.
5. Create an OAuth client of type **Web application**. Add the Authorized JavaScript origin `https://mylbrry.github.io` (no `/myoffice/` path). The token model uses the Google popup; this code does not use a redirect callback URL.
6. For local testing only, an owner may additionally authorize `http://localhost:4173` or `http://127.0.0.1:4173` if Google accepts that origin. Do not use either as the deployed website origin.
7. Copy only the client ID ending in `.apps.googleusercontent.com`. Do not copy the client secret into this website or send it in chat.
8. Open the deployed Library. Click **Connect Drive**, enter the client ID, and optionally enter the intended Library folder URL/ID. Leaving it empty discovers an accessible folder named exactly `My Library`; if several match, select the intended folder explicitly.
9. Click **Connect with Google** and authorize the intended account. The account must already have read access to the library folders and files. No public sharing is needed. Stop and inspect unexpected permissions; the only requested scope is Drive read-only.
10. Verify book counts, the additional-folder warning if any, category filters, and two real source selections. Load a PDF in the reader and compare it with the original. Verify that metadata and source modified times remain unchanged. Test Disconnect and reconnect.

If the browser blocks the Google popup, allow it for this site and retry. An expired token requires a user-triggered reconnect. The connection does not store refresh tokens. If Cloud reports origin mismatch, check the exact Authorized JavaScript origin. If the Drive API is disabled, enable it in the same project that owns the client ID.

The first live account authorization and private PDF test are pending until the Google Cloud setup is completed.

Official references:
- https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/workspace/drive/api/guides/api-specific-auth
- https://developers.google.com/workspace/drive/api/guides/search-files

## Writing Workspace connection (v0.5)

The Library remains read-only. The Writing Workspace uses a separate, page-memory token requesting only `https://www.googleapis.com/auth/drive.file`.

Owner setup, using the same **My Office Web** client:
1. Enable **Google Docs API** in the same Google Cloud project. Keep Drive API enabled.
2. Add `https://www.googleapis.com/auth/drive.file` in Google Auth Platform → Data Access, retaining the existing read-only scope for the Library.
3. Open Writing Workspace → Connect Google. The existing public client ID is reused on the same browser; enter it if missing.
4. Authorize with the same Google account. Create a disposable document named **My Office — connection test**.
5. Enter English and Arabic text, headings, bold, italic, underline and simple bullets. Click **Save to Drive** and wait for **Saved in Google Drive**.
6. Refresh, reconnect, select **Open → Open from Google Drive**, and reopen the test document. Confirm text and supported formatting survived. Make another edit, Save, then check in Google Docs independently.

Saved files are **native Google Docs in My Drive root**, marked with a private application property; existing library sources and Library_Metadata.json are not modified. The picker lists only documents created by this workspace. Pinning, scratchpad notes and unsaved local drafts remain session-only. No autosave, existing-document import, cloud research integration or export is implied.

This first connection supports basic paragraphs, three heading levels, bold, italic, underline, simple bullets and paragraph direction. Complex documents (tables, multiple tabs, links, images, suggestions, headers/footers/footnotes) are rejected rather than flattened. Editing these is deferred to Google Docs. Supported-format drafts are limited to 100,000 characters and bounded formatting requests.

Saving uses Google Docs revision guards. If the cloud revision differs, save a new document to preserve both versions. Network/API errors retain the local draft. A file ID returned during creation is retained for retry instead of blindly creating another file. If creation succeeds but its response is lost, inspect Drive before retrying; do not assume no file was created. Save is explicit; wait for success before leaving. Session expiry requires reconnecting and never stores an access token.

References: [Drive scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth), [Docs batch updates and write control](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/batchUpdate).
