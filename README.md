# Dossira by Doxyo

**Use fictional information only. Never enter sensitive personal data, upload client records, or use this demo for an actual social-assistance case.**

This static demonstrator lets a social worker review three everyday tasks in the fictional municipality of Musterwil. The interface and examples use Swiss Standard German. The scenario is fixed on 23 November 2026 so each presentation starts with the same five dossiers, three incoming documents and three letter templates.

[Open the public demo on GitHub Pages](https://makido.github.io/dossira-by-doxyo/).

## Open locally

From the project directory, run the following command with Python 3. No package installation or build step is required.

```sh
python3 -m http.server 8017 --bind 127.0.0.1
```

Open [the local workplace](http://127.0.0.1:8017/) in a modern browser. Serve the directory over HTTP so the browser can load its JavaScript modules. If port 8017 is in use by the running preview, open the link directly. Press Ctrl+C in the server terminal to stop a server you started.

## 90-second review

| Step | Action | What to look for |
| --- | --- | --- |
| 1 | On **Arbeitsplatz**, open **3 Dokumente im Eingang**. | Three prepared items appear. Select a title to read its contents. |
| 2 | Beside **Mietzinsbestätigung**, select **Ablegen**. Search for Lea and check **Lea Muster · DEMO-1001**. Optionally add the keyword **Wohnkosten**, then select **Im Dossier ablegen**. | The inbox count falls to two. Lea’s dossier opens with the document under **Dokumente**. |
| 3 | Open **Mietzinsbestätigung** and inspect the amount and filing details. Select the dossier link under **Ablageort**. | The filed copy belongs to Lea. It can also be found under **Dokumentenablage → Abgelegte Dokumente** by name, title, keyword or document type. |
| 4 | Select **Dokument erstellen**. Keep **Terminbestätigung**, change **Termin** to **02.12.2026, 14.30 Uhr**, then select **Im Dossier ablegen**. | The text changes in **Briefvorschau** as you type. The filed copy keeps the edited appointment. **Drucken / Als PDF sichern** opens the browser print dialog before filing. |
| 5 | Select **Notiz hinzufügen → Papiernotiz erfassen**. Compare the supplied note with **Erkannter Text (Demo – simuliert)**, amend the text and select **Zur Akte hinzufügen**. | The amended entry appears as **Papiernotiz (simuliert)** in Lea’s **Aktenverlauf**, sorted by note date. |
| 6 | Select **Demo zurücksetzen** and confirm. | The workplace again shows three incoming documents. Lea’s dossier returns to two original documents and two notes. |

To try a typed note, choose **Notiz schreiben** and enter a date, title and body. The **Vorlagen** area also offers **Unterlagen anfordern** and **Gesprächsbestätigung**. Choose the destination dossier before editing. In a letter, expand **Empfänger und Absender bearbeiten** to adjust the recipient and signing details. For a clean PDF, use A4 portrait and turn off any headers and footers added by the browser.

## Local verification performed

- Opened the root preview in Chrome. Ran the complete walkthrough in Safari from a separate static server under `/dossira-by-doxyo/` using the same project files.
- Filed the rent confirmation with a keyword, reopened its contents and checked the destination and reduced inbox count.
- Changed the appointment, observed the updated sentence in the live preview and filed the letter. Also edited and filed the two other templates in Nino Beispiel’s dossier, then reopened the conversation confirmation.
- Inspected Safari’s print dialog for the edited document request. It showed a single A4 portrait page containing the letter, with application navigation and controls excluded. The check ended at print preview.
- Filed both a typed note and an amended simulated paper note. Checked the timeline, confirmed reset, and verified the original document and note counts.
- Searched for a dossier by reference and combined document search with a type filter. Both returned the expected records.
- Stopped the separate test server after loading the app, then filed and reopened an edited appointment letter and filed the prepared paper note. The corrected appointment, note image and timeline remained available. The owner’s preview server stayed running.

## GitHub Pages settings for the owner

GitHub Pages serves this repository from the root of the `main` branch. The setting is **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root)**. Relative asset paths and hash-based views keep the demo within the repository subdirectory.

## Data lifetime and boundaries

Changes live in the current tab’s JavaScript memory. Refreshing the page, closing the tab, or confirming reset discards them. The app loads its scripts and prepared artwork locally and can continue the walkthrough after loading without a network connection. A fresh visit needs the static host. Letter drafts and unfinished forms are discarded when leaving the editor. A PDF saved through the browser is a separate local file and survives a demo reset.

The document previews are synthetic examples. There is no upload or scanner input, OCR, AI, persistent archive, backend, authentication, multi-user synchronisation, server-generated PDF or DOCX, accounting, benefit decision engine, or municipal integration.

## Before any real case management

A production design would need secure server-side storage, retention and deletion rules, role-based access, audit trails, and a data-protection review covering the applicable Swiss and cantonal requirements. Municipal integrations would need explicit contracts and validation. Backup restoration, disaster recovery, operational monitoring and performance testing with representative dossier volumes would also need to be designed and tested.

## Questions for the social worker

1. When filing the rent confirmation, which details would you check before choosing between two clients with similar names?
2. Which fields in the appointment confirmation should come from the dossier, and which do you need to check or change for every letter?
3. When you reopen a corrected paper note, do you need the original handwriting beside the transcription, and how would you identify who corrected it?
