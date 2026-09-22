# Satoshium System Registry

**Directory:** `/registry/`  
**Public page:** `index.html`  
**Markdown companion:** `system-registry.md`  
**Status:** Active public System Registry surface; architectural relationship to the formal Satoshium Registry institution requires later reconciliation

## Purpose

The `/registry/` directory currently presents the **Satoshium System Registry**, a public index of named software systems identified through stable `SYS-*` identifiers.

The public page organizes systems into categories including:

- Knowledge Systems
- Intelligence Systems
- Coordination Systems
- Governance Systems
- Simulation Systems
- Documentation Systems

The page records names, identifiers, system types, status labels, access information, and links to related public or internal Satoshium surfaces.

This README documents the repository state that currently exists. It does not resolve the relationship between this older System Registry model and the later formal Satoshium Registry institution.

## Public Page Relationship

`index.html` is the principal current public representation of this directory.

It currently identifies the directory as the **Satoshium System Registry** and describes it as a canonical index of operational, foundational, developmental, internal, and experimental software systems across the broader Satoshium platform architecture.

The current public page uses the namespace:

`SYS-*`

and the status vocabulary:

- Operational
- Foundation
- In Development
- Experimental
- Internal

## Markdown Companion

`system-registry.md` functions as a repository-readable companion to the public System Registry.

However, it is not fully synchronized with the current `index.html`.

The public page currently includes systems that are absent from `system-registry.md`, including:

- `SYS-INTEL-003` — Onboarding Mentor
- `SYS-INTEL-004` — Hue Operations Console
- `SYS-SIM-002` — Satoshium Games
- `SYS-SIM-003` — Chess Signal
- `SYS-SIM-004` — Signal Coordination
- `SYS-SIM-005` — Trust Dynamics
- `SYS-SIM-006` — Satoshium WarGames Suite
- `SYS-SIM-007` — Tic-Tac-Toe Signal Explorer
- `SYS-DOC-004` — Layer Identity Icon Registry

Accordingly, the public `index.html` should currently be treated as the more complete representation of this System Registry surface.

## Current Registry Scope

The public System Registry includes the following identifier families:

- `SYS-KNOW-*`
- `SYS-INTEL-*`
- `SYS-SIG-*`
- `SYS-GOV-*`
- `SYS-SIM-*`
- `SYS-DOC-*`

These identifiers function within this directory as stable references for named platform systems.

This README does not extend those identifiers into the formal Satoshium Registry institution unless and until that relationship is explicitly reconciled and documented.

## Important Institutional Boundary

The `/registry/` System Registry predates or exists alongside the later formal **Satoshium Registry** institution.

The formal Suite institution has an established responsibility distinct from this page:

**Registry → Satoshium Registry Record**

The current System Registry page instead uses `SYS-*` identifiers to index named software systems.

Those two models must not be silently treated as identical.

Until formally reconciled:

- a `SYS-*` System Registry identifier should not automatically be treated as a Satoshium Registry Record;
- this directory should not be assumed to define the canonical object model of the formal Registry institution;
- the existence of this older registry surface does not transfer authority from the formal Registry institution;
- references from one registry model to another do not establish derivation, identity, or authority.

**REFERENCE DOES NOT TRANSFER AUTHORITY.**

Likewise:

- **Connection ≠ Identity.**
- **Reference ≠ Derivation.**
- **Reference ≠ Support.**
- **Reference ≠ Authority Transfer.**

## Aegis and Other Pre-Suite / Non-Suite Systems

The current System Registry includes **Aegis: The Agent Firewall** and other systems that are not necessarily formal Suite institutions.

Their appearance in this System Registry records their existence within the broader Satoshium platform architecture as represented by this page.

It does not make them Suite institutions.

In particular, Aegis remains external/pre-Suite unless later architecture explicitly changes that status.

## Repository Convention

Current directory structure:

```text
/registry/
├── index.html
├── system-registry.md
└── README.md
```

`README.md` documents the directory.

`index.html` provides the current public System Registry.

`system-registry.md` provides a repository-readable registry companion but currently requires synchronization with the public page.

## Source-of-Truth Discipline

For the present repository state:

- `index.html` is the principal current public representation;
- `system-registry.md` is a companion document and should not be assumed current where it conflicts with or omits entries present in `index.html`;
- `README.md` documents the directory and its boundaries;
- neither this README nor README reconciliation should resolve the architectural relationship between the `SYS-*` System Registry and the formal Satoshium Registry institution.

That relationship belongs to deliberate later reconciliation.

## Maintenance

Repository maintenance for `/registry/` should:

- keep `system-registry.md` synchronized with the systems actually displayed in `index.html` if the Markdown companion is retained;
- avoid creating new `SYS-*` identifiers merely for documentation symmetry;
- preserve the distinction between platform-system indexing and the formal Registry institution;
- avoid treating status labels on this page as formal Suite lifecycle states unless explicitly established elsewhere;
- preserve historical and operational context for systems that predate the formal Suite;
- defer redesign of the registry model to formal architectural reconciliation.

README reconciliation documents the registry surfaces that exist. It does not redesign them.
