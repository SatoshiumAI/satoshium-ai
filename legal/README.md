# Satoshium Legal & Policies

**Directory:** `/legal/`  
**Public entry page:** `index.html`  
**Status:** Active public legal and policy section

## Purpose

The `/legal/` directory contains the public legal and policy materials for the Satoshium platform.

The directory provides a central legal entry point together with dedicated pages addressing privacy, terms of use, trademark treatment, and platform disclaimers.

This README documents the repository structure and relationship among those materials. It does not replace, reinterpret, or expand the legal language contained in the published pages.

## Public Legal Pages

The current public legal section consists of:

- `index.html` — Legal & Policies entry page
- `privacy.html` — Privacy Policy
- `terms.html` — Terms of Use
- `trademark.html` — Trademark Notice
- `disclaimer.html` — Disclaimer

The legal landing page links these pages together through a common Legal Navigation section.

## Markdown Companions

The directory also contains Markdown versions or companion documents:

- `privacy.md`
- `terms.md`
- `trademark.md`
- `disclaimer.md`
- `legal.md`

The four page-specific Markdown files substantially correspond to their public HTML counterparts and function as repository-readable versions of those legal materials.

`legal.md` is broader than the current public `index.html` and combines multiple legal topics into one document. Because the public legal structure now uses separate dedicated pages, `legal.md` should not automatically be treated as the canonical source for the entire legal section unless that role is deliberately retained.

## Public Page Relationship

`index.html` is the principal public entry point for `/legal/`.

The dedicated HTML policy pages are the public-facing representations of their respective subjects:

```text
/legal/
├── index.html
├── privacy.html
├── terms.html
├── trademark.html
├── disclaimer.html
├── privacy.md
├── terms.md
├── trademark.md
├── disclaimer.md
├── legal.md
└── README.md
```

Where both HTML and Markdown versions of the same policy are retained, they should remain substantively synchronized.

## Current Legal Scope

The public materials currently address:

- the experimental and evolving nature of Satoshium;
- informational, educational, research, and exploratory use;
- privacy and basic information-handling practices;
- cookies, analytics, logs, and third-party services;
- permitted and prohibited platform use;
- intellectual-property and trademark treatment;
- warranty and liability disclaimers;
- third-party links and services;
- forward-looking or conceptual material;
- contact through `contact@satoshium.ai`.

These topics are documented here only as the present contents of the legal section. This README does not make independent legal claims about their sufficiency or enforceability.

## Trademark Material

The public Trademark Notice states that **SATOSHIUM™** is a trademark owned by **Christopher D. Burris** and describes permitted reference, prohibited use, reservation of rights, and the public surfaces on which the mark may appear.

The legal landing page also identifies Satoshium™ as a protected brand identifier and directs visitors to the dedicated Trademark Notice.

The README should remain descriptive of those published statements and should not convert trademark status, scope, registration status, or application status into claims beyond the language actually maintained in the legal materials.

## Authority and Institutional Boundary

The `/legal/` directory is a legal and policy surface for the public Satoshium platform.

It is not a formal Satoshium Suite institution and does not create, redefine, or transfer the canonical responsibilities of Atlas, Navigator, Certifier, Registry, Chronicle, Anchor, Beacon, or Attestor.

Legal references to tools, governance, certification, infrastructure, experimental systems, or other Satoshium components should therefore be read as legal or descriptive scope language rather than as architectural definitions.

**REFERENCE DOES NOT TRANSFER AUTHORITY.**

## Source-of-Truth Discipline

For repository maintenance:

- the published HTML pages should remain the principal public representations;
- their corresponding Markdown files should remain synchronized where retained;
- `README.md` documents the directory and should not duplicate the policies word-for-word;
- `legal.md` should not silently become a competing source of truth if the dedicated legal pages are intended to govern their respective subjects;
- substantive legal language changes should be deliberate and reflected consistently across corresponding HTML and Markdown versions.

## Maintenance

Legal-section maintenance should include periodic review for:

- consistency between each HTML page and its Markdown companion;
- consistency of platform descriptions across the legal pages;
- consistent ownership and contact language;
- stale references to platform features or architectural terminology;
- broken or outdated legal-navigation links;
- clear versioning or revision history if later adopted;
- preservation of the distinction between legal scope language and formal Suite architecture.

Repository reconciliation should document the legal structure that exists without opportunistically redesigning either the legal framework or the Suite architecture.
