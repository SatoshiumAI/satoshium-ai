# Satoshium Onboarding Mentor

**Directory:** `/start-here/onboarding-mentor/`  
**Public entry page:** `index.html`  
**Deployment documentation:** `DEPLOYMENT-NOTES.md`  
**Status:** Active static onboarding application

## Purpose

The `/start-here/onboarding-mentor/` directory contains the **Satoshium Onboarding Mentor**, a browser-based orientation application designed to guide visitors through Satoshium in a structured way.

The application is deployed as a static single-page application (SPA) and is intended to help users understand Satoshium through guided stages, contextual paths, and return-to-mentor navigation.

This README documents the repository implementation and directory role. It does not redefine Satoshium onboarding architecture or the broader Suite.

## Current Directory Role

The directory currently contains the deployed onboarding application and supporting files required for its operation.

The documented deployment tree includes:

```text
/start-here/onboarding-mentor/
├── index.html
├── favicon.svg
├── opengraph.jpg
├── mentor-return-banner.js
├── banner-demo.html
├── DEPLOYMENT-NOTES.md
├── README.md
└── assets/
    ├── index-*.css
    └── index-*.js
```

## Public Application

`index.html` is the application entry point.

It loads:

- the shared Satoshium platform topbar;
- the bundled application stylesheet;
- the bundled JavaScript application;
- the `#root` element used by the SPA;
- the shared Satoshium sayings and footer.

The substantive Onboarding Mentor interface is rendered by the bundled client-side application rather than being written directly into the HTML file.

## Static Application Model

The current deployment notes establish that the Onboarding Mentor is a fully static build.

It currently requires:

- no server-side logic;
- no API dependency;
- no authentication dependency;
- no database.

Application state is stored locally in the browser using `localStorage` under:

`SatoshiumMentorState`

This README records that implementation detail only. It does not elevate browser-local state into a canonical Satoshium record or institutional object.

## Deployment Path

The current build assumes the exact deployment path:

`/start-here/onboarding-mentor/`

Asset references in `index.html` are hardcoded to that base path.

Accordingly, moving the application to another path without rebuilding the application would break asset loading.

The deployment notes identify the build-time `BASE_PATH` mechanism as the proper method for changing the location.

## Mentor Return Banner

The directory also includes `mentor-return-banner.js`, a standalone client-side utility intended for use on destination Satoshium pages.

When a visitor arrives with mentor context parameters such as:

`mentor_source=onboarding-mentor`

the script can display a return banner and orientation context that helps the visitor return to the Mentor workflow.

The banner is a navigation/orientation aid. It does not transfer the authority or responsibility of the destination page into the Mentor, or vice versa.

**REFERENCE DOES NOT TRANSFER AUTHORITY.**

## Banner Demonstration

`banner-demo.html` is a demonstration and adoption example for the return-banner script.

It documents:

- sample mentor query parameters;
- the expected banner behavior;
- how another Satoshium page can include the script;
- how the banner remains inactive when mentor context is absent.

The demo page is implementation documentation and test material, not an independent public architecture layer.

## Relationship to `/start-here/`

The Onboarding Mentor is a specialized onboarding surface beneath the broader `/start-here/` section.

The parent Start Here directory provides the general orientation entry point.

The Onboarding Mentor provides a more structured guided experience.

This relationship is navigational and functional. The Mentor is not itself a formal Satoshium Suite institution.

## Source-of-Truth Discipline

For this directory:

- `index.html` is the deployed application entry point;
- bundled JavaScript and CSS provide the active application behavior and presentation;
- `DEPLOYMENT-NOTES.md` documents deployment and runtime assumptions;
- `mentor-return-banner.js` provides the reusable return-navigation behavior;
- `banner-demo.html` demonstrates banner adoption;
- `README.md` documents the directory and repository responsibilities.

README maintenance should not attempt to reconstruct or redefine application behavior that is implemented inside the bundled application files.

## Authority Boundary

The Onboarding Mentor is an orientation interface.

It may refer visitors to Satoshium institutions, systems, tools, pages, or external surfaces, but those references do not transfer:

- identity;
- provenance;
- support;
- canonical responsibility;
- institutional authority.

**Connection ≠ Identity.**  
**Reference ≠ Derivation.**  
**Reference ≠ Support.**  
**Reference ≠ Authority Transfer.**

## Maintenance

Repository maintenance for `/start-here/onboarding-mentor/` should:

- preserve the exact deployment base path unless the application is intentionally rebuilt;
- keep `DEPLOYMENT-NOTES.md` synchronized with the deployed implementation;
- keep return-banner documentation aligned with the actual script URL and behavior;
- avoid duplicating application logic in README documentation;
- distinguish implementation/test files from public architectural documentation;
- preserve browser-local application state as implementation state rather than canonical Satoshium data;
- update asset references only as part of a deliberate rebuild or deployment change.

README reconciliation documents the onboarding implementation that exists. It does not redesign it.
