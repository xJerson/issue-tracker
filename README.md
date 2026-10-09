# Issue Tracker

A portfolio-ready React application for operating a product incident from report through QA, release, closure, and reopening.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Ticket changes are persisted in the browser with `localStorage`.

## What it demonstrates

- React component composition, Hooks, controlled inputs, and derived state.
- Real routes for the dashboard (`/`) and operational queue (`/tickets`).
- A structured incident lifecycle with triage, blockers, QA decisions, release, closure, and reopening.
- Search, filtering, sorting, pagination, activity history, and comments.
- Material UI responsive interface and accessible controls.

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/App.jsx` | Application state, ticket operations, and routes. |
| `src/features/dashboard` | Dashboard-level presentation. |
| `src/features/issues` | Ticket workflow, forms, filters, queue, and detail views. |
| `src/features/issues/data` | Seed data, catalog options, and browser persistence. |

## Workflow

`Reported → Triaged → In progress → In review → QA validation → Ready to release → Released → Closed`

QA requires notes. A failed validation returns the ticket to development; a passed validation continues to release. Closing requires a resolution summary, while reopening requires a reason and returns the ticket to triage.

## Quality commands

```bash
npm run lint
npm run test
npm run build
```
