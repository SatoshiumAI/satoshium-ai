# Satoshium Onboarding Redirect

**Public page:** `index.html`  
**Current destination:** `/start-here/onboarding-mentor/`  
**Status:** Active redirect surface

## Purpose

This directory currently serves as a redirect entry point into the Satoshium onboarding experience.

Its `index.html` immediately redirects visitors to:

`/start-here/onboarding-mentor/`

The page also provides a visible fallback link for visitors whose browser does not complete the automatic redirect.

## Repository Role

This directory does not currently present independent public content, define a separate onboarding model, or establish a distinct Satoshium institutional responsibility.

Its present role is limited to routing visitors to the active **Onboarding Mentor** destination.

## Public Page Relationship

`index.html` is the active public representation of this directory.

It currently contains:

- an immediate HTML meta refresh;
- a fallback link to the same destination;
- minimal styling for the brief redirect state;
- keyboard-focus styling for accessibility.

The destination page at `/start-here/onboarding-mentor/` remains responsible for the substantive onboarding experience.

## Authority Boundary

This redirect surface is navigational only.

It does not inherit or transfer the authority, responsibility, canonical objects, or institutional role of the destination it references.

**REFERENCE DOES NOT TRANSFER AUTHORITY.**

Likewise:

- **Connection ≠ Identity.**
- **Reference ≠ Derivation.**
- **Reference ≠ Support.**
- **Reference ≠ Authority Transfer.**

## Repository Convention

The current directory requires only the files needed to perform and document the redirect:

```text
<directory>/
├── index.html
└── README.md
```

Additional files should not be introduced unless this directory later acquires an independent implemented role.

## Maintenance

Repository maintenance for this redirect should:

- keep the redirect destination synchronized with the active onboarding path;
- preserve the fallback navigation link;
- avoid duplicating the substantive content of the Onboarding Mentor page;
- remove or revise the redirect only when the public navigation architecture actually changes;
- keep the HTML structurally valid and accessible.

README reconciliation documents the routing structure that exists. It does not redesign the onboarding architecture.
