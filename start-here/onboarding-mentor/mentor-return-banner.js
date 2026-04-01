/**
 * mentor-return-banner.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable, zero-dependency browser component for Satoshium pages.
 *
 * Reads URL parameters left by the Onboarding Mentor and renders a lightweight
 * banner when the visitor arrived via the mentor tool. If the params are absent
 * or the source is not "onboarding-mentor", the script exits silently.
 *
 * ─── Parameters read from window.location.search ─────────────────────────────
 *
 *   mentor_source — must be "onboarding-mentor" to trigger the banner
 *   mentor_stage  — orientation stage (e.g. "systems", "dev", "foundations")
 *   mentor_path   — recommendation slug (e.g. "track-whats-happening-in-satoshium")
 *   mentor_intent — visitor's intent classification (e.g. "contributor", "explorer")
 *                   optional; when present, shows an intent pill beside the stage pill
 *
 * ─── How to include on any Satoshium HTML page ───────────────────────────────
 *
 *   Place this script tag near the top of <body>:
 *
 *   <script src="/mentor-return-banner.js" defer></script>
 *
 *   Or load it from the mentor app's static URL:
 *
 *   <script src="https://mentor.satoshium.ai/mentor-return-banner.js" defer></script>
 *
 *   The banner injects itself at the top of <body> automatically.
 *   No markup changes needed — it is fully self-contained.
 *
 * ─── Incremental adoption across Satoshium domains ───────────────────────────
 *
 *   Add the <script> tag to each domain independently. No coordination needed.
 *   Pages that don't carry mentor params are unaffected (zero DOM changes).
 *
 *   Recommended rollout order:
 *     1. satoshium.ai/updates/    (systems layer — highest mentor traffic)
 *     2. satoshium.dev/           (dev layer)
 *     3. satoshium.info/          (foundations layer)
 *     4. satoshium.xyz/labs       (vision / architecture layer)
 *     5. satoshium.net/systems    (systems / infrastructure layer)
 *
 * ─── Future integration hooks ─────────────────────────────────────────────────
 *
 *   TODO (Canon): When Canon identity is available, also read a Canon session
 *   token from the URL params to pre-fill the visitor's identity context in the
 *   page — enabling cross-domain continuity without a login step.
 *
 *   TODO (Registry): Emit an arrival event when the banner renders:
 *     { mentor_source, mentor_stage, mentor_path, destination, arrivedAt }
 *   Use a Registry endpoint or a lightweight beacon() call. Ownership of this
 *   event intentionally lives on the destination page, not in the Mentor itself,
 *   so the Registry records actual arrivals rather than navigation intents.
 *
 *   TODO (Aegis): If the destination is gated, check Aegis eligibility before
 *   surfacing the banner — or replace it with an Aegis verification prompt.
 */

(function () {
  "use strict";

  // ─── 1. Read parameters ────────────────────────────────────────────────────

  var params  = new URLSearchParams(window.location.search);
  var source  = params.get("mentor_source");
  var stage   = params.get("mentor_stage")  || "";
  var path    = params.get("mentor_path")   || "";
  var intent  = params.get("mentor_intent") || "";

  // Guard: only render when the visitor arrived from the Onboarding Mentor.
  if (source !== "onboarding-mentor") return;

  // ─── 2. Humanize values ───────────────────────────────────────────────────

  /**
   * Maps orientation stage keys to human-readable labels.
   * Matches the STAGE_LABELS map in orientation-stages.ts.
   */
  var STAGE_LABELS = {
    foundations:  "Foundations",
    vision:       "Vision",
    architecture: "Architecture",
    systems:      "Systems",
    dev:          "Dev",
    registry:     "Registry",
  };

  /**
   * Maps mentor_intent param values to human-readable display labels.
   *
   * Intent classification is set by the Onboarding Mentor wizard (Step 3) and
   * carried forward through every stage navigation URL as mentor_intent=<key>.
   * Unknown or absent values are ignored — the intent pill is not rendered.
   *
   * TODO (Canon): A Canon-aware system would derive intent from the visitor's
   * persistent profile rather than a URL param, removing the need to thread
   * mentor_intent through every link. Until Canon is live, the URL param is
   * the reliable cross-domain carrier.
   */
  var INTENT_LABELS = {
    explorer:      "Explorer",
    builder:       "Builder",
    researcher:    "Researcher",
    contributor:   "Contributor",
    developer:     "Developer",
    institutional: "Institutional",
  };

  /**
   * Per-intent suggestion lists rendered in the adaptive entry panel.
   *
   * Each item carries:
   *   text  — visible link label
   *   url   — canonical Satoshium destination for this suggestion
   *   stage — orientation stage to encode as mentor_stage on the destination
   *             URL so the destination page's banner shows the correct depth
   *
   * Suggestions are intent-scoped, not stage-scoped: a Contributor visiting
   * any stage page sees the same three contributor-relevant starting points.
   * This keeps the panel immediately actionable rather than redundant with
   * the stage-specific next-step pill already in the banner.
   *
   * TODO (Canon): When Canon is live, swap this static map for a dynamic
   * personalised list derived from the visitor's Canon learning graph —
   * surfaces the specific modules, threads, or workspaces most relevant to
   * their recorded depth rather than a generic intent-bucket fallback.
   *
   * TODO (Registry): Each suggestion click could emit a Registry event:
   *   { action: "suggestion_click", intent, stage, suggestion: item.text, … }
   * enabling the Registry to track which suggestions drive the most forward
   * engagement per intent type.
   */
  var INTENT_SUGGESTIONS = {
    explorer: [
      { text: "Read the Manifesto",       url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
      { text: "Explore the Architecture", url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      { text: "Visit Start Here",         url: "https://satoshium.ai/start-here/",   stage: "foundations"   },
    ],
    builder: [
      { text: "Review system modules",    url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      { text: "Explore agent frameworks", url: "https://satoshium.dev/",             stage: "dev"           },
      { text: "Inspect labs prototypes",  url: "https://satoshium.ai/updates/",      stage: "systems"       },
    ],
    researcher: [
      { text: "Study architecture layers",   url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      { text: "Review Canon structure",      url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      { text: "Explore knowledge workspace", url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
    ],
    contributor: [
      { text: "Visit Satoshium Dev",               url: "https://satoshium.dev/", stage: "dev"      },
      { text: "Review governance routing",         url: "https://satoshium.net/", stage: "registry" },
      { text: "Inspect agent firewall components", url: "https://satoshium.dev/", stage: "dev"      },
    ],
    developer: [
      { text: "Open Satoshium Dev",      url: "https://satoshium.dev/", stage: "dev" },
      { text: "Review API structure",    url: "https://satoshium.dev/", stage: "dev" },
      { text: "Explore build environment", url: "https://satoshium.dev/", stage: "dev" },
    ],
    institutional: [
      { text: "Review governance model",  url: "https://satoshium.net/",              stage: "registry"      },
      { text: "Inspect registry layer",   url: "https://satoshium.net/",              stage: "registry"      },
      { text: "Study trust architecture", url: "https://satoshium.ai/architecture/",  stage: "architecture"  },
    ],
  };

  /**
   * Stage-aware suggestion lists: intent → stage → suggestions.
   *
   * Lookup priority in buildSuggestionPanel():
   *   1. INTENT_STAGE_SUGGESTIONS[intent][stage]  — most specific; stage + intent match
   *   2. INTENT_SUGGESTIONS[intent]               — fallback; intent-only, stage ignored
   *   3. null                                     — no panel rendered
   *
   * Rationale for stage granularity:
   *   A Contributor visiting the Systems layer is close to hands-on work and needs
   *   action-oriented entry points (Dev links, firewall inspection, onboarding paths).
   *   The same Contributor at the Dev layer has already passed the threshold — they
   *   need governance, coordination, and integration context for deeper participation.
   *   At Registry, they're in infrastructure territory: trust architecture, governance
   *   model, and Canon node structure become the relevant next steps.
   *
   *   The flat INTENT_SUGGESTIONS values above serve as the fallback for any
   *   intent+stage combination not explicitly mapped here — they are never removed.
   *
   * TODO (Canon): Replace this static matrix with a Canon-aware dynamic lookup that
   * personalises suggestions from the visitor's recorded learning graph, not just
   * their URL params. The intent × stage matrix is the pre-Canon approximation.
   *
   * TODO (Registry): Each suggestion click emits:
   *   { action: "suggestion_click", intent, stage, item: text, timestamp }
   * The Registry accumulates these to surface which intent×stage combinations
   * drive the most forward engagement, feeding back into Canon personalisation.
   */
  var INTENT_STAGE_SUGGESTIONS = {

    explorer: {
      foundations: [
        { text: "Browse the Manifesto",        url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
        { text: "Explore the Architecture",    url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Visit Start Here",            url: "https://satoshium.ai/start-here/",   stage: "foundations"   },
      ],
      vision: [
        { text: "Read the Vision document",    url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
        { text: "Study the principles",        url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
        { text: "Explore architecture context",url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
      architecture: [
        { text: "Study system design",         url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Map module relationships",    url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Explore vision context",      url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
      ],
    },

    builder: {
      architecture: [
        { text: "Study system modules",        url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Map component dependencies",  url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Review design patterns",      url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
      systems: [
        { text: "Inspect live tools",          url: "https://satoshium.ai/updates/",      stage: "systems"       },
        { text: "Explore labs prototypes",     url: "https://satoshium.ai/updates/",      stage: "systems"       },
        { text: "Track system updates",        url: "https://satoshium.ai/updates/",      stage: "systems"       },
      ],
      dev: [
        { text: "Open Satoshium Dev",          url: "https://satoshium.dev/",             stage: "dev"           },
        { text: "Review contribution guidelines", url: "https://satoshium.dev/",          stage: "dev"           },
        { text: "Explore build environment",   url: "https://satoshium.dev/",             stage: "dev"           },
      ],
    },

    researcher: {
      foundations: [
        { text: "Study the foundational principles", url: "https://satoshium.ai/start-here/",   stage: "foundations"   },
        { text: "Review origin documents",     url: "https://satoshium.ai/start-here/",   stage: "foundations"   },
        { text: "Explore the Manifesto",       url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
      ],
      vision: [
        { text: "Analyse vision architecture", url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
        { text: "Map philosophical layers",    url: "https://satoshium.ai/manifesto/",    stage: "vision"        },
        { text: "Study design intent",         url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
      architecture: [
        { text: "Deep-dive architecture layers", url: "https://satoshium.ai/architecture/", stage: "architecture" },
        { text: "Review Canon structure",      url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Study system topology",       url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
    },

    contributor: {
      systems: [
        { text: "Visit Satoshium Dev",                url: "https://satoshium.dev/", stage: "dev"      },
        { text: "Inspect agent firewall components",   url: "https://satoshium.dev/", stage: "dev"      },
        { text: "Explore contributor entry points",   url: "https://satoshium.dev/", stage: "dev"      },
      ],
      dev: [
        { text: "Review registry participation model", url: "https://satoshium.net/", stage: "registry" },
        { text: "Inspect governance routing",          url: "https://satoshium.net/", stage: "registry" },
        { text: "Explore Canon integration",           url: "https://satoshium.ai/architecture/", stage: "architecture" },
      ],
      registry: [
        { text: "Study governance coordination",   url: "https://satoshium.net/",              stage: "registry"      },
        { text: "Review trust architecture",       url: "https://satoshium.ai/architecture/",  stage: "architecture"  },
        { text: "Inspect Canon node structure",    url: "https://satoshium.ai/architecture/",  stage: "architecture"  },
      ],
    },

    developer: {
      architecture: [
        { text: "Review system architecture docs", url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Study module dependencies",       url: "https://satoshium.ai/architecture/", stage: "architecture"  },
        { text: "Explore design patterns",         url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
      systems: [
        { text: "Inspect live infrastructure",    url: "https://satoshium.ai/updates/",      stage: "systems"       },
        { text: "Review agent APIs",              url: "https://satoshium.dev/",             stage: "dev"           },
        { text: "Explore system tooling",         url: "https://satoshium.ai/updates/",      stage: "systems"       },
      ],
      dev: [
        { text: "Open contribution dashboard",    url: "https://satoshium.dev/",             stage: "dev"           },
        { text: "Review active build priorities", url: "https://satoshium.dev/",             stage: "dev"           },
        { text: "Explore API structure",          url: "https://satoshium.dev/",             stage: "dev"           },
      ],
      registry: [
        { text: "Study registry API surface",     url: "https://satoshium.net/",             stage: "registry"      },
        { text: "Inspect namespace routing",      url: "https://satoshium.net/",             stage: "registry"      },
        { text: "Review build toolchain",         url: "https://satoshium.dev/",             stage: "dev"           },
      ],
    },

    institutional: {
      foundations: [
        { text: "Review foundational governance model", url: "https://satoshium.ai/start-here/", stage: "foundations"  },
        { text: "Study trust framework",          url: "https://satoshium.ai/architecture/",  stage: "architecture"  },
        { text: "Explore Satoshium principles",   url: "https://satoshium.ai/manifesto/",     stage: "vision"        },
      ],
      vision: [
        { text: "Study institutional alignment",  url: "https://satoshium.ai/manifesto/",     stage: "vision"        },
        { text: "Review mission architecture",    url: "https://satoshium.ai/architecture/",  stage: "architecture"  },
        { text: "Explore governance vision",      url: "https://satoshium.ai/manifesto/",     stage: "vision"        },
      ],
      systems: [
        { text: "Study infrastructure governance", url: "https://satoshium.ai/updates/",     stage: "systems"       },
        { text: "Review systems coordination",    url: "https://satoshium.ai/updates/",      stage: "systems"       },
        { text: "Inspect operational model",      url: "https://satoshium.net/",             stage: "registry"      },
      ],
      registry: [
        { text: "Review governance model",        url: "https://satoshium.net/",             stage: "registry"      },
        { text: "Inspect registry coordination",  url: "https://satoshium.net/",             stage: "registry"      },
        { text: "Study trust architecture",       url: "https://satoshium.ai/architecture/", stage: "architecture"  },
      ],
    },

  };

  /**
   * Maps each orientation stage to its primary Satoshium destination URL.
   *
   * When the next-stage pill is clicked, the visitor is navigated to this URL
   * with mentor context parameters appended so the destination page can render
   * its own return banner and orientation breadcrumb.
   *
   * URL selection rationale:
   *   foundations → satoshium.info/start-here/ — the public onboarding entry point
   *   vision      → satoshium.ai/manifesto/    — the canonical vision document
   *   architecture → satoshium.ai/architecture/ — the system design overview
   *   systems     → satoshium.ai/updates/       — live systems layer dispatches
   *   dev         → satoshium.dev/              — the developer contribution hub
   *   registry    → satoshium.net/              — the registry / infrastructure layer
   *
   * TODO: Verify each path slug is live before enabling the banner on production
   * destination pages. These are canonical intent URLs — update if site structure
   * changes without updating mentor-return-banner.js.
   *
   * TODO (Aegis): For gated destinations (e.g. registry), intercept before
   * navigation and surface an Aegis eligibility prompt instead of linking directly.
   */
  var STAGE_DESTINATIONS = {
    foundations:  "https://satoshium.ai/start-here/",
    vision:       "https://satoshium.ai/manifesto/",
    architecture: "https://satoshium.ai/architecture/",
    systems:      "https://satoshium.ai/updates/",
    dev:          "https://satoshium.dev/",
    registry:     "https://satoshium.net/",
  };

  /**
   * Builds a contextual destination URL for the next-stage link.
   *
   * Mirrors the logic of appendMentorContext() in mentor-context.ts —
   * kept as a local inline function since this banner is a zero-dependency
   * standalone script that cannot import the TypeScript module.
   *
   * Parameters appended:
   *   mentor_source=onboarding-mentor  (always — trigger for the return banner)
   *   mentor_stage=<nextStage>         (the destination's own stage, not the current one)
   *   mentor_path=<path>               (the same original recommendation slug)
   *   mentor_intent=<intent>           (preserved when present — omitted when absent)
   *
   * Using nextStage (not the current stage) as mentor_stage means the destination
   * page's banner will correctly show ITS own stage and ITS own next step,
   * advancing the visitor's visible orientation depth as they navigate deeper.
   *
   * mentor_intent is threaded transparently through every hop so the intent
   * pill persists across the full forward/backward navigation chain. It is only
   * written to the URL when the `intent` variable has a truthy value.
   *
   * @param {string} baseUrl   - The raw destination URL from STAGE_DESTINATIONS
   * @param {string} nextStg   - The next orientation stage key (e.g. "dev")
   * @param {string} pathSlug  - The mentor_path value to carry forward
   * @returns {string}         - The contextualised URL with params appended
   */
  function buildContextUrl(baseUrl, nextStg, pathSlug) {
    try {
      var parsed = new URL(baseUrl);
      parsed.searchParams.set("mentor_source", "onboarding-mentor");
      parsed.searchParams.set("mentor_stage",  nextStg);
      if (pathSlug) parsed.searchParams.set("mentor_path", pathSlug);
      if (intent)   parsed.searchParams.set("mentor_intent", intent);
      return parsed.toString();
    } catch (_) {
      return baseUrl;
    }
  }

  /**
   * Maps recommendation slugs to their full display titles.
   * Covers all slugs from mentor-routes.ts and mentor-next-steps.ts.
   * Auto-humanization is used as a fallback for unknown slugs.
   */
  var PATH_LABELS = {
    // Foundations
    "start-with-the-foundations":              "Start With the Foundations",
    "begin-exploring-satoshium":               "Begin Exploring Satoshium",
    "go-deeper-orientation-and-principles":    "Go Deeper: Orientation and Principles",

    // Vision
    "the-vision-and-philosophy":               "The Vision and Philosophy",
    "discover-the-vision-behind-satoshium":    "Discover the Vision Behind Satoshium",
    "go-deeper-vision-and-principles":         "Go Deeper: Vision and Principles",

    // Architecture
    "understand-how-the-system-works":         "Understand How the System Works",
    "go-deeper-system-architecture":           "Go Deeper: System Architecture",

    // Systems
    "explore-the-live-tools-and-labs":         "Explore the Live Tools and Labs",
    "track-whats-happening-in-satoshium":      "Track What's Happening in Satoshium",
    "go-deeper-systems-and-infrastructure":    "Go Deeper: Systems and Infrastructure",
    "go-deeper-active-experiments-and-labs":   "Go Deeper: Active Experiments and Labs",

    // Dev
    "build-inside-the-satoshium-universe":               "Build Inside the Satoshium Universe",
    "find-your-entry-point-as-a-contributor":            "Find Your Entry Point as a Contributor",
    "go-deeper-the-builder-and-contributor-path":        "Go Deeper: The Builder and Contributor Path",
    "go-deeper-technical-contribution-paths":            "Go Deeper: Technical Contribution Paths",
    "go-deeper-active-build-priorities":                 "Go Deeper: Active Build Priorities",
  };

  /**
   * Humanizes a slug by looking it up in PATH_LABELS, falling back to
   * replacing hyphens with spaces and title-casing each word.
   */
  function humanizePath(slug) {
    if (PATH_LABELS[slug]) return PATH_LABELS[slug];
    return slug
      .split("-")
      .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
      .join(" ");
  }

  /**
   * Ordered progression of all orientation stages — low to high depth.
   * Matches STAGE_ORDER in orientation-stages.ts.
   *
   * Used to compute the next suggested step shown in the banner.
   * When the visitor is at "registry" (the final stage), no next step exists.
   *
   * TODO (Canon): In a Canon-aware system this could reflect the visitor's
   * true cross-session depth rather than the single URL param value, enabling
   * accurate "next step" suggestions even when the visitor has already progressed
   * further on a different device or domain.
   */
  var STAGE_ORDER = [
    "foundations",
    "vision",
    "architecture",
    "systems",
    "dev",
    "registry",
  ];

  /**
   * The next orientation stage after the visitor's current stage.
   * Null when: stage is unknown, stage is "registry" (final), or stage is absent.
   */
  var nextStage = (function () {
    var idx = STAGE_ORDER.indexOf(stage);
    if (idx === -1 || idx === STAGE_ORDER.length - 1) return null;
    return STAGE_ORDER[idx + 1];
  })();

  var nextStageLabel = nextStage ? STAGE_LABELS[nextStage] : null;

  var stageLabel = STAGE_LABELS[stage] || (stage ? humanizePath(stage) : null);
  var pathLabel  = path ? humanizePath(path) : null;

  // ─── 3. Mentor URL ────────────────────────────────────────────────────────

  /**
   * URL of the Onboarding Mentor application.
   * Replace with the live deployed URL once the mentor is published.
   *
   * TODO: Update to the canonical deployed URL (e.g. https://mentor.satoshium.ai)
   * once the mentor app is live. Pages adopting this banner should pin this URL
   * to a stable production endpoint, not a dev preview.
   */
  var MENTOR_URL = "https://satoshium.ai/mentor";

  // ─── 4. Styles (all inline — no external CSS required) ───────────────────

  var GOLD    = "#c9a84c";
  var GOLD_DIM = "rgba(201,168,76,0.12)";
  var BG      = "#0d0d12";
  var BORDER  = "rgba(201,168,76,0.25)";
  var TEXT    = "#e8e0cc";
  var MUTED   = "rgba(232,224,204,0.45)";
  var FONT    = "'Sora', 'Inter', system-ui, -apple-system, sans-serif";

  // ─── 5. Build orientation map ────────────────────────────────────────────

  /**
   * Builds the horizontal 6-stage orientation progress bar displayed above
   * the banner. Gives the visitor an immediate visual fix on where they are
   * in the Satoshium learning ladder.
   *
   * Node visual states:
   *   completed (past)  — filled gold circle with ✓, clickable link back to
   *                       that stage's destination with mentor context preserved
   *   current           — bright gold circle with inner dot and glow
   *   future            — dim dark circle, dim label
   *
   * Connector lines between nodes reflect completion state:
   *   past→past         — gold dim line
   *   past→current      — gold dim line (same, showing progress up to now)
   *   current→future    — gray dim line
   *   future→future     — gray dim line
   *
   * Backward navigation: clicking a completed node navigates to that stage's
   * canonical Satoshium destination with mentor context appended, so the
   * destination page's banner correctly shows the visitor at THAT stage's
   * depth with its own next step.
   *
   * TODO (Canon): Cross-device Canon awareness would allow this map to reflect
   * the visitor's TRUE orientation depth across all sessions, not just the
   * current page's mentor_stage URL param. Completed nodes would be determined
   * by Canon profile data rather than URL position alone.
   *
   * TODO (Registry): Each backward-navigation click could emit a Registry event:
   *   { action: "orientation_back", fromStage: stage, toStage: s, path, timestamp }
   * allowing the Registry to track lateral and backward orientation movement
   * alongside the primary forward progression events from Step 4.
   */
  function buildOrientationMap() {
    var currentIdx = STAGE_ORDER.indexOf(stage);

    var mapContainer = document.createElement("div");
    mapContainer.id = "mentor-orientation-map";
    Object.assign(mapContainer.style, {
      width:          "100%",
      boxSizing:      "border-box",
      background:     BG,
      borderBottom:   "1px solid rgba(201,168,76,0.06)",
      padding:        "10px 24px 12px",
      display:        "flex",
      justifyContent: "center",
      fontFamily:     FONT,
    });

    var track = document.createElement("div");
    Object.assign(track.style, {
      display:    "flex",
      alignItems: "flex-start",
      width:      "100%",
      maxWidth:   "640px",
    });

    STAGE_ORDER.forEach(function (s, idx) {
      var isPast    = currentIdx !== -1 && idx < currentIdx;
      var isCurrent = idx === currentIdx;

      // ── Node wrapper (circle + label stacked) ──────────────────────────
      // For past stages the entire node (circle + label) is an <a> so that
      // both the checkmark and the stage name text are part of the same link,
      // giving a larger click target and ensuring any selector that looks up
      // the stage label also finds an anchor with the correct href.
      var backHref = isPast && STAGE_DESTINATIONS[s]
        ? buildContextUrl(STAGE_DESTINATIONS[s], s, path)
        : null;

      var nodeWrap = document.createElement(backHref ? "a" : "div");
      if (backHref) {
        nodeWrap.href   = backHref;
        nodeWrap.target = "_blank";
        nodeWrap.rel    = "noopener noreferrer";
        nodeWrap.title  = "Return to: " + STAGE_LABELS[s];
      }
      Object.assign(nodeWrap.style, {
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            "5px",
        flex:           "0 0 auto",
        textDecoration: "none",
        cursor:         backHref ? "pointer" : "default",
      });

      // ── Circle ────────────────────────────────────────────────────────
      // Always a <div>; the parent nodeWrap carries the <a> for past nodes.
      var circle = document.createElement("div");
      Object.assign(circle.style, {
        width:          "22px",
        height:         "22px",
        borderRadius:   "50%",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       "11px",
        fontWeight:     "600",
        flexShrink:     "0",
        transition:     "box-shadow 0.2s, background 0.2s",
        boxSizing:      "border-box",
      });

      if (isPast) {
        Object.assign(circle.style, {
          background: "rgba(201,168,76,0.28)",
          border:     "1px solid rgba(201,168,76,0.50)",
          color:      GOLD,
        });
        circle.textContent = "✓";
        if (backHref) {
          nodeWrap.addEventListener("mouseover", function () {
            circle.style.background = "rgba(201,168,76,0.45)";
            circle.style.boxShadow  = "0 0 8px rgba(201,168,76,0.35)";
          });
          nodeWrap.addEventListener("mouseout", function () {
            circle.style.background = "rgba(201,168,76,0.28)";
            circle.style.boxShadow  = "none";
          });
        }
      } else if (isCurrent) {
        Object.assign(circle.style, {
          background: GOLD,
          border:     "1px solid " + GOLD,
          boxShadow:  "0 0 10px rgba(201,168,76,0.50)",
        });
        // Inner dot
        var innerDot = document.createElement("div");
        Object.assign(innerDot.style, {
          width:        "6px",
          height:       "6px",
          borderRadius: "50%",
          background:   "#0a0a0f",
          flexShrink:   "0",
        });
        circle.appendChild(innerDot);
      } else {
        // Future
        Object.assign(circle.style, {
          background: "rgba(255,255,255,0.04)",
          border:     "1px solid rgba(255,255,255,0.09)",
        });
      }

      // ── Label ────────────────────────────────────────────────────────────
      var nodeLabel = document.createElement("span");
      nodeLabel.textContent = STAGE_LABELS[s];
      Object.assign(nodeLabel.style, {
        fontSize:      "9px",
        letterSpacing: "0.04em",
        whiteSpace:    "nowrap",
        textAlign:     "center",
        color: isPast    ? "rgba(201,168,76,0.50)"
             : isCurrent ? GOLD
             :              "rgba(255,255,255,0.14)",
        fontWeight: isCurrent ? "600" : "400",
      });

      nodeWrap.appendChild(circle);
      nodeWrap.appendChild(nodeLabel);
      track.appendChild(nodeWrap);

      // ── Connector line (inserted between nodes, not after the last) ──────
      if (idx < STAGE_ORDER.length - 1) {
        var connector = document.createElement("div");
        Object.assign(connector.style, {
          flex:       "1",
          height:     "1px",
          marginTop:  "11px",   // aligns with the vertical center of a 22px circle
          alignSelf:  "flex-start",
          background: isPast ? "rgba(201,168,76,0.30)" : "rgba(255,255,255,0.07)",
        });
        track.appendChild(connector);
      }
    });

    mapContainer.appendChild(track);
    return mapContainer;
  }

  // ─── 6. Build banner element ──────────────────────────────────────────────

  var banner = document.createElement("div");
  banner.id = "mentor-return-banner";

  Object.assign(banner.style, {
    position:        "relative",
    width:           "100%",
    boxSizing:       "border-box",
    background:      BG,
    borderBottom:    "1px solid " + BORDER,
    borderLeft:      "3px solid " + GOLD,
    padding:         "10px 48px 10px 18px",
    display:         "flex",
    alignItems:      "center",
    gap:             "14px",
    flexWrap:        "wrap",
    fontFamily:      FONT,
    zIndex:          "9999",
  });

  // Gold diamond badge
  var badge = document.createElement("div");
  Object.assign(badge.style, {
    width:           "20px",
    height:          "20px",
    background:      GOLD,
    borderRadius:    "3px",
    transform:       "rotate(45deg)",
    flexShrink:      "0",
    opacity:         "0.85",
  });

  // Text block
  var textBlock = document.createElement("div");
  Object.assign(textBlock.style, {
    display:   "flex",
    alignItems: "center",
    flexWrap:  "wrap",
    gap:       "6px 14px",
    flex:      "1",
    minWidth:  "0",
  });

  function makeSpan(text, styles) {
    var el = document.createElement("span");
    el.textContent = text;
    Object.assign(el.style, styles);
    return el;
  }

  // "You arrived here from Onboarding Mentor"
  textBlock.appendChild(makeSpan("You arrived here from Onboarding Mentor", {
    color:      TEXT,
    fontSize:   "12px",
    fontWeight: "500",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
  }));

  // Separator dot
  if (stageLabel || pathLabel) {
    textBlock.appendChild(makeSpan("·", { color: MUTED, fontSize: "11px" }));
  }

  // Stage label
  if (stageLabel) {
    var stagePill = document.createElement("span");
    Object.assign(stagePill.style, {
      display:       "inline-flex",
      alignItems:    "center",
      gap:           "4px",
      background:    GOLD_DIM,
      border:        "1px solid " + BORDER,
      borderRadius:  "4px",
      padding:       "1px 7px",
    });

    stagePill.appendChild(makeSpan("Stage", {
      color:         MUTED,
      fontSize:      "10px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }));
    stagePill.appendChild(makeSpan(stageLabel, {
      color:      GOLD,
      fontSize:   "11px",
      fontWeight: "500",
    }));

    textBlock.appendChild(stagePill);

    /**
     * Intent pill — shown when mentor_intent is present and recognized.
     *
     * Intentionally lower visual priority than the stage pill: the cooler
     * silver-lavender tone (vs warm gold) signals secondary context, keeping
     * the visitor's eye on their current stage first, intent second.
     *
     * Sits between the stage pill and the next-stage pill to preserve the
     * natural left-to-right reading order:
     *   Stage: Systems  |  Intent: Contributor  |  Next: Dev →
     *
     * Not rendered when mentor_intent is absent or not in INTENT_LABELS —
     * silently omitted so pages without intent context are unaffected.
     *
     * TODO (Canon): In a Canon-aware system, intent would be read from the
     * visitor's Canon profile rather than the URL param, and could be a richer
     * classification (e.g. "core contributor", "institutional researcher") than
     * the six base types the mentor wizard currently assigns.
     */
    var intentLabel = intent ? INTENT_LABELS[intent] : null;
    if (intentLabel) {
      var intentPill = document.createElement("span");
      Object.assign(intentPill.style, {
        display:      "inline-flex",
        alignItems:   "center",
        gap:          "4px",
        background:   "rgba(170,165,210,0.08)",
        border:       "1px solid rgba(170,165,210,0.22)",
        borderRadius: "4px",
        padding:      "1px 7px",
      });

      intentPill.appendChild(makeSpan("Intent", {
        color:         "rgba(200,195,230,0.45)",
        fontSize:      "10px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }));
      intentPill.appendChild(makeSpan(intentLabel, {
        color:      "rgba(200,195,230,0.80)",
        fontSize:   "11px",
        fontWeight: "500",
      }));

      textBlock.appendChild(intentPill);
    }

    /**
     * Next-stage pill — shown when a next stage exists (i.e. current stage is
     * not "registry"). Intentionally dimmer than the primary stage pill to
     * establish visual hierarchy: where you are vs. where you're headed.
     *
     * Not rendered when:
     *   - mentor_stage is "registry" (final stage — no next step)
     *   - mentor_stage is absent or unrecognized (nextStageLabel is null)
     *
     * TODO (Canon): When Canon is live, link this pill to a Canon-aware next
     * step computed from the visitor's full cross-session profile, not just
     * the single URL param value. The label text might change to reflect a
     * personalised next action rather than the raw stage name.
     */
    if (nextStageLabel) {
      /**
       * Next-stage pill rendered as a clickable <a> link.
       *
       * Navigates to the next stage's primary Satoshium destination URL with
       * mentor context parameters appended (mentor_source, mentor_stage=nextStage,
       * mentor_path=original slug). The destination page's banner will then
       * correctly show the visitor at the next depth level with ITS own next step.
       *
       * mentor_stage is set to nextStage (not the current stage) so the chain
       * of orientation context advances correctly with each hop:
       *   systems page → "Next: Dev" → clicks → satoshium.dev/?mentor_stage=dev&...
       *   satoshium.dev banner → shows "Stage: Dev | Next: Registry"
       *
       * If no destination URL exists for nextStage (future expansion), the link
       * falls back to a non-clickable span via the href guard below.
       */
      var nextDestBase = STAGE_DESTINATIONS[nextStage];
      var nextHref = nextDestBase
        ? buildContextUrl(nextDestBase, nextStage, path)
        : null;

      var nextPill = document.createElement(nextHref ? "a" : "span");

      if (nextHref) {
        nextPill.href   = nextHref;
        nextPill.target = "_blank";
        nextPill.rel    = "noopener noreferrer";
        nextPill.title  = "Continue to next orientation step: " + nextStageLabel;
      }

      Object.assign(nextPill.style, {
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "4px",
        background:     "rgba(201,168,76,0.06)",
        border:         "1px solid rgba(201,168,76,0.15)",
        borderRadius:   "4px",
        padding:        "1px 7px",
        textDecoration: "none",
        cursor:         nextHref ? "pointer" : "default",
        transition:     "background 0.2s, border-color 0.2s",
      });

      if (nextHref) {
        nextPill.addEventListener("mouseover", function () {
          nextPill.style.background   = "rgba(201,168,76,0.12)";
          nextPill.style.borderColor  = "rgba(201,168,76,0.30)";
        });
        nextPill.addEventListener("mouseout", function () {
          nextPill.style.background   = "rgba(201,168,76,0.06)";
          nextPill.style.borderColor  = "rgba(201,168,76,0.15)";
        });
      }

      nextPill.appendChild(makeSpan("Next", {
        color:         "rgba(232,224,204,0.3)",
        fontSize:      "10px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }));
      nextPill.appendChild(makeSpan(nextStageLabel, {
        color:      "rgba(201,168,76,0.55)",
        fontSize:   "11px",
        fontWeight: "500",
      }));

      nextPill.setAttribute("data-mentor-next-stage", nextStage);
      if (nextHref) nextPill.setAttribute("data-mentor-next-href", nextHref);
      nextPill.id = "mentor-next-stage-pill";
      textBlock.appendChild(nextPill);
    }
  }

  // Path label
  if (pathLabel) {
    textBlock.appendChild(makeSpan("·", { color: MUTED, fontSize: "11px" }));
    textBlock.appendChild(makeSpan(pathLabel, {
      color:    MUTED,
      fontSize: "11px",
      fontStyle: "italic",
    }));
  }

  // "Return to Mentor" link
  var returnLink = document.createElement("a");
  returnLink.href        = MENTOR_URL;
  returnLink.textContent = "Return to Mentor →";
  Object.assign(returnLink.style, {
    color:          GOLD,
    fontSize:       "11px",
    fontWeight:     "500",
    textDecoration: "none",
    letterSpacing:  "0.02em",
    whiteSpace:     "nowrap",
    opacity:        "0.8",
    transition:     "opacity 0.2s",
    flexShrink:     "0",
  });
  returnLink.addEventListener("mouseover",  function () { returnLink.style.opacity = "1"; });
  returnLink.addEventListener("mouseout",   function () { returnLink.style.opacity = "0.8"; });

  // Dismiss button (×)
  var dismiss = document.createElement("button");
  dismiss.textContent = "×";
  dismiss.setAttribute("aria-label", "Dismiss");
  Object.assign(dismiss.style, {
    position:   "absolute",
    top:        "50%",
    right:      "14px",
    transform:  "translateY(-50%)",
    background: "none",
    border:     "none",
    cursor:     "pointer",
    color:      MUTED,
    fontSize:   "18px",
    lineHeight: "1",
    padding:    "0 2px",
  });
  // dismissTarget is set to the outerWrap below after it is constructed,
  // so the dismiss animation collapses the entire group (map + banner) together.
  var dismissTarget = null;

  dismiss.addEventListener("click", function () {
    var el = dismissTarget || banner;
    el.style.transition = "opacity 0.25s, max-height 0.3s";
    el.style.opacity    = "0";
    el.style.maxHeight  = "0";
    el.style.overflow   = "hidden";
    el.style.padding    = "0";
    el.style.borderWidth = "0";
    setTimeout(function () { el.remove(); }, 320);
  });

  // ─── 6. Assemble and inject ───────────────────────────────────────────────

  banner.appendChild(badge);
  banner.appendChild(textBlock);
  banner.appendChild(returnLink);
  banner.appendChild(dismiss);

  /**
   * Outer wrapper groups the orientation map and the banner into a single DOM
   * element so they animate together when dismissed and can be targeted as a
   * unit by destination pages that want to reposition the entire component
   * (e.g. inside a sticky header rather than at the top of <body>).
   *
   * Structure injected as first child of <body>:
   *
   *   <div id="mentor-orientation-wrapper">         ← outerWrap
   *     <div id="mentor-orientation-map"> … </div>  ← progress bar (above)
   *     <div id="mentor-return-banner">  … </div>   ← info strip (below)
   *   </div>
   *
   * Destination pages may move the entire group by replacing:
   *   document.body.prepend(outerWrap)
   * with:
   *   document.getElementById("your-header").prepend(outerWrap)
   */
  var orientationMap = buildOrientationMap();

  var outerWrap = document.createElement("div");
  outerWrap.id = "mentor-orientation-wrapper";
  Object.assign(outerWrap.style, {
    width:    "100%",
    position: "relative",
    zIndex:   "9999",
  });

  outerWrap.appendChild(orientationMap);
  outerWrap.appendChild(banner);

  // Connect the dismiss handler to the entire wrapper so both the progress
  // bar and the banner row collapse together in a single smooth animation.
  dismissTarget = outerWrap;

  // ─── 7. Build suggestion panel ───────────────────────────────────────────

  /**
   * Builds the adaptive entry panel injected immediately below the orientation
   * wrapper when mentor_intent is present and recognized.
   *
   * Returns null when intent is absent or unrecognized — the caller skips
   * injection in that case so pages without intent context are unaffected.
   *
   * Panel structure:
   *   <div id="mentor-suggestion-panel">
   *     <p>Suggested next actions for Contributors:</p>
   *     <ul>
   *       <li>• <a href="…">Visit Satoshium Dev</a></li>
   *       …
   *     </ul>
   *   </div>
   *
   * Each suggestion link uses buildContextUrl() so mentor_source, mentor_stage,
   * mentor_path, and mentor_intent are all carried to the destination — the
   * destination's banner will render correctly for that stage and intent.
   *
   * The panel is intentionally NOT grouped inside the orientation wrapper so
   * it persists after the dismiss animation collapses the wrapper. This gives
   * the visitor actionable next steps even after they close the banner strip.
   *
   * TODO (Aegis): Gate institutional suggestions behind Aegis eligibility before
   * surfacing registry and governance links to unverified visitors.
   */
  function buildSuggestionPanel() {
    var intentLabel  = intent ? INTENT_LABELS[intent] : null;
    if (!intentLabel) return null;

    // Lookup priority:
    //   1. INTENT_STAGE_SUGGESTIONS[intent][stage]  — stage + intent match (most specific)
    //   2. INTENT_SUGGESTIONS[intent]               — intent-only fallback (stage absent/unmapped)
    //   3. null                                     — no panel rendered
    var stageMap    = INTENT_STAGE_SUGGESTIONS[intent];
    var suggestions = (stageMap && stage && stageMap[stage])
      || INTENT_SUGGESTIONS[intent]
      || null;

    if (!suggestions || !suggestions.length) return null;

    // "Institutional" is already a collective noun; all others take "-s".
    var intentPlural = intent === "institutional" ? intentLabel : intentLabel + "s";

    var panel = document.createElement("div");
    panel.id = "mentor-suggestion-panel";
    Object.assign(panel.style, {
      width:        "100%",
      boxSizing:    "border-box",
      background:   "#0d0d12",
      borderBottom: "1px solid rgba(201,168,76,0.12)",
      borderLeft:   "3px solid rgba(201,168,76,0.28)",
      padding:      "11px 18px 13px",
      fontFamily:   FONT,
      zIndex:       "9998",
    });

    // Title
    var title = document.createElement("p");
    title.textContent = "Suggested next actions for " + intentPlural + ":";
    Object.assign(title.style, {
      margin:        "0 0 8px",
      color:         MUTED,
      fontSize:      "10px",
      fontWeight:    "500",
      letterSpacing: "0.07em",
      textTransform: "uppercase",
    });
    panel.appendChild(title);

    // Suggestion list
    var list = document.createElement("ul");
    Object.assign(list.style, {
      margin:        "0",
      padding:       "0",
      listStyle:     "none",
      display:       "flex",
      flexDirection: "column",
      gap:           "5px",
    });

    suggestions.forEach(function (item) {
      var li = document.createElement("li");
      Object.assign(li.style, {
        display:    "flex",
        alignItems: "flex-start",
        gap:        "7px",
      });

      // Bullet
      var dot = document.createElement("span");
      dot.textContent = "•";
      Object.assign(dot.style, {
        color:      GOLD,
        opacity:    "0.45",
        flexShrink: "0",
        fontSize:   "12px",
        lineHeight: "1.5",
      });

      // Suggestion link — uses the suggestion's own canonical stage as
      // mentor_stage so the destination page's banner shows the correct depth.
      var href = buildContextUrl(item.url, item.stage, path);
      var link = document.createElement("a");
      link.href        = href;
      link.target      = "_blank";
      link.rel         = "noopener noreferrer";
      link.textContent = item.text;
      Object.assign(link.style, {
        color:          "rgba(232,224,204,0.70)",
        fontSize:       "12px",
        lineHeight:     "1.5",
        textDecoration: "none",
        transition:     "color 0.15s",
      });
      link.addEventListener("mouseover", function () { link.style.color = GOLD; });
      link.addEventListener("mouseout",  function () { link.style.color = "rgba(232,224,204,0.70)"; });

      li.appendChild(dot);
      li.appendChild(link);
      list.appendChild(li);
    });

    panel.appendChild(list);
    return panel;
  }

  var suggestionPanel = buildSuggestionPanel();

  // ─── 8. Inject ───────────────────────────────────────────────────────────

  /**
   * Injects the orientation wrapper (progress bar + banner) as the first child
   * of <body>, then inserts the suggestion panel immediately after it when present.
   *
   * Final DOM order at the top of <body>:
   *
   *   <div id="mentor-orientation-wrapper">    ← progress bar + banner strip
   *   <div id="mentor-suggestion-panel">        ← adaptive entry panel (intent only)
   *   … original page content …
   *
   * The panel intentionally sits outside the wrapper so it remains visible after
   * the dismiss animation collapses the orientation wrapper — the visitor retains
   * their suggested next steps even after closing the banner.
   *
   * Destination pages may reposition both elements by targeting their IDs directly:
   *   document.getElementById("mentor-orientation-wrapper")
   *   document.getElementById("mentor-suggestion-panel")
   */
  function inject() {
    if (document.body) {
      document.body.prepend(outerWrap);
      if (suggestionPanel) outerWrap.insertAdjacentElement("afterend", suggestionPanel);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        document.body.prepend(outerWrap);
        if (suggestionPanel) outerWrap.insertAdjacentElement("afterend", suggestionPanel);
      });
    }
  }

  inject();

})();
