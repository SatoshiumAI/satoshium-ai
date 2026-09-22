# Satoshium Documentation

**Directory:** `/docs/`  
**Public page:** None currently present  
**Repository documentation:** `README.md`

## Purpose

The `/docs/` directory contains long-form Satoshium documentation covering platform structure, governance concepts, documentation conventions, navigation guidance, and architectural references.

This directory is documentation-oriented. It is not itself a formal Satoshium Suite institution and does not independently establish authority over the Suite institutions, their canonical objects, or their current operational relationships.

## Current Contents

The directory currently includes:

- `protocol.md` — describes an earlier Satoshium protocol and platform-layer model;
- `governance.md` — describes an earlier governance and coordination model;
- `style-guide.md` — records documentation-writing conventions and terminology preferences;
- `install.md` — explains how readers can navigate and interact with Satoshium;
- `references.md` — records architectural influences, conceptual references, and earlier platform relationships;
- `README.md` — repository-level documentation for this directory.

These files remain useful as documentation and architectural history, but individual statements within them should not automatically be treated as current Suite architecture where later Satoshium institutions, terminology, or canonical objects have superseded earlier models.

## No Public `index.html`

There is currently no `/docs/index.html` public representation for this directory.

Accordingly, this README documents the repository directory itself rather than mirroring a public page.

Whether `/docs/` should eventually receive a public `index.html` is a separate repository/documentation-structure question and should not be resolved during README reconciliation without a deliberate later review.

## Historical and Current-State Discipline

The files in this directory reflect multiple stages of Satoshium development.

They include terminology and architectural concepts such as:

- platform coordination layers;
- Canon layers;
- System Registry identifier namespaces;
- governance tools and verification-ledger concepts;
- domain-role assignments;
- simulation-layer relationships;
- Aegis compatibility concepts.

Some of these may remain historically accurate or conceptually relevant, while others may no longer represent the current Suite architecture.

README reconciliation therefore does not silently rewrite those source documents or elevate their older terminology into current institutional authority.

## Relationship to the Satoshium Suite

Current formal Suite institutional responsibilities remain separate from this documentation directory.

Where `/docs/` material discusses systems, registries, governance, verification, coordination, or other architectural concepts, those references must be interpreted in light of the current authority boundaries of the Suite.

Reference from documentation does not transfer the authority of a formal Suite institution into `/docs/`.

**REFERENCE DOES NOT TRANSFER AUTHORITY.**

Likewise:

- **Connection ≠ Identity.**
- **Reference ≠ Derivation.**
- **Reference ≠ Support.**
- **Reference ≠ Authority Transfer.**

## Documentation Role

The `/docs/` directory serves as a repository of explanatory and architectural documentation.

Its appropriate responsibilities include:

- preserving architectural explanations and historical development context;
- providing documentation conventions;
- helping readers navigate Satoshium concepts and surfaces;
- recording references and conceptual influences;
- supporting later reconciliation by exposing terminology or architectural descriptions that may have become stale.

It should not be treated as a substitute for the authoritative records, canonical objects, or operational outputs of the formal Suite institutions.

## Outstanding Reconciliation Considerations

The current documentation set contains multiple statements that should be evaluated separately rather than normalized here, including:

- older `SYS-*` System Registry identifier models;
- references to Canon as a platform-wide structural layer;
- references to Agent Governance Tool and Verification Ledger Tool;
- older domain-role mappings;
- descriptions of governance and verification architecture that may predate the current Suite institutional model;
- references to Aegis as a future governance enforcement layer;
- references to `/updates/updates.md` as the update-record location.

These are documentation and architecture-review items, not issues to resolve opportunistically inside this README.

## Repository Convention

Current directory structure:

```text
/docs/
├── README.md
├── protocol.md
├── governance.md
├── style-guide.md
├── install.md
└── references.md
```

There is currently no `index.html` in this directory.

## Maintenance

This README should:

- describe the files that actually exist in `/docs/`;
- distinguish historical documentation from current Suite authority;
- avoid reasserting superseded architectural terminology as current fact;
- preserve useful historical context where appropriate;
- flag substantive inconsistencies for deliberate later reconciliation;
- remain neutral about whether a public `/docs/index.html` should be created until that question is reviewed separately.

README reconciliation documents the architecture and repository state that exist. It does not redesign them.
