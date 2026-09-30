/* @ds-bundle: {"format":4,"namespace":"ShookResearchDesignSystem_aa03f8","components":[{"name":"ANALYSIS_ICONS","sourcePath":"components/brand/AnalysisIcon.jsx"},{"name":"AnalysisIcon","sourcePath":"components/brand/AnalysisIcon.jsx"},{"name":"EventLockup","sourcePath":"components/brand/EventLockup.jsx"},{"name":"ForbesLockup","sourcePath":"components/brand/ForbesLockup.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"EventCard","sourcePath":"components/cards/EventCard.jsx"},{"name":"RankingCard","sourcePath":"components/cards/RankingCard.jsx"},{"name":"SpeakerCard","sourcePath":"components/cards/SpeakerCard.jsx"},{"name":"ArrowLink","sourcePath":"components/core/ArrowLink.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"FIELDS","sourcePath":"components/core/ColorField.jsx"},{"name":"ColorField","sourcePath":"components/core/ColorField.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"MessageBlock","sourcePath":"components/editorial/MessageBlock.jsx"},{"name":"SectionHeading","sourcePath":"components/editorial/SectionHeading.jsx"},{"name":"NAV_ITEMS","sourcePath":"components/navigation/SiteNav.jsx"},{"name":"SiteNav","sourcePath":"components/navigation/SiteNav.jsx"}],"sourceHashes":{"components/brand/AnalysisIcon.jsx":"c62b8c2dae8d","components/brand/EventLockup.jsx":"b67c2b352f5f","components/brand/ForbesLockup.jsx":"b2618c73ad26","components/brand/Wordmark.jsx":"640659fc4425","components/cards/EventCard.jsx":"7b8043fddabd","components/cards/RankingCard.jsx":"39bd8b404c06","components/cards/SpeakerCard.jsx":"c7c1727d46aa","components/core/ArrowLink.jsx":"6ca6e69a35f8","components/core/Button.jsx":"20ff8a4fbcfa","components/core/ColorField.jsx":"c457248121cc","components/core/Tag.jsx":"9294ddcd10a3","components/editorial/MessageBlock.jsx":"f56ac5938201","components/editorial/SectionHeading.jsx":"768b7b8f8d16","components/navigation/SiteNav.jsx":"e921321f025c","ui_kits/event_graphics/Screens.jsx":"3fe73bbdf96f","ui_kits/events/event-template.js":"cc2464791098","ui_kits/website/EventsScreen.jsx":"6001ac118327","ui_kits/website/HomeScreen.jsx":"f033dec92883","ui_kits/website/InsightScreen.jsx":"2ec87a8eae9e","ui_kits/website/RankingsScreen.jsx":"38cd79fc509d","ui_kits/website/Shell.jsx":"a540a8a31c32"},"inlinedExternals":[],"unexposedExports":[{"name":"assetBase","sourcePath":"components/brand/Wordmark.jsx"}]} */

(() => {

const __ds_ns = (window.ShookResearchDesignSystem_aa03f8 = window.ShookResearchDesignSystem_aa03f8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLORS = ["sapphire", "royal-blue", "bright-blue", "white", "black", "teal", "turquoise", "ocean", "slight-blue"];
function assetBase(explicit) {
  if (explicit) return explicit.replace(/\/$/, "");
  if (typeof window !== "undefined" && window.VERITANT_ASSET_BASE) return String(window.VERITANT_ASSET_BASE).replace(/\/$/, "");
  return "assets";
}

/** The Veritant wordmark. Never redraw, stretch, recolor or modify it — use a supplied color file. */
function Wordmark({
  color = "sapphire",
  height = 32,
  assetBase: base,
  clearspace = false,
  style,
  ...rest
}) {
  const c = COLORS.includes(color) ? color : "sapphire";
  const pad = clearspace ? Math.round(height / 3) : 0;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${assetBase(base)}/logo/veritant-${c}.svg`,
    alt: "Veritant",
    style: {
      height: `${height}px`,
      width: "auto",
      padding: pad ? `${pad}px` : undefined,
      boxSizing: "content-box",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { assetBase, Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/brand/AnalysisIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ANALYSIS_ICONS = ["benchmarks", "comparison", "relationships", "perspective", "evidence", "assessment", "alignment", "flourish", "pathways", "caliber", "connection", "momentum", "women-advisors"];

/* Colors on disk per icon. Every icon has these three; a few carry extra theme colors. */
const BASE_COLORS = ["bright-blue", "royal-blue", "white"];
const EXTRA = {
  "women-advisors": ["magenta"],
  caliber: ["turquoise"],
  assessment: ["turquoise"],
  pathways: ["magenta"]
};

/** One of the 13 proprietary Veritant analysis graphics. */
function AnalysisIcon({
  name = "caliber",
  color = "bright-blue",
  size = 64,
  watermark = false,
  assetBase: base,
  style,
  ...rest
}) {
  const n = ANALYSIS_ICONS.includes(name) ? name : "caliber";
  const available = BASE_COLORS.concat(EXTRA[n] || []);
  const c = available.includes(color) ? color : "bright-blue";
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${__ds_scope.assetBase(base)}/icons/${n}-${c}.svg`,
    alt: n.replace(/-/g, " "),
    style: {
      width: typeof size === "number" ? `${size}px` : size,
      height: typeof size === "number" ? `${size}px` : size,
      opacity: watermark ? "var(--graphic-watermark-opacity)" : undefined,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ANALYSIS_ICONS, AnalysisIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AnalysisIcon.jsx", error: String((e && e.message) || e) }); }

// components/brand/EventLockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Event titles supplied as vectors, with the colors that exist for each. */
const SUPPLIED = {
  "top-advisor-summit": ["white", "bright-blue", "sapphire", "royal-blue"],
  "top-teams-summit": ["white", "turquoise", "teal", "royal-blue"],
  "top-women-advisor-summit": ["white", "magenta", "deep-magenta", "royal-blue"]
};

/* Events whose lockup art was empty in the supplied brand assets — set in type, flagged. */
const TYPESET = {
  "top-ria-summit": ["Top", "RIA", "Summit"],
  "alternatives-summit": ["2026", "Alternatives", "Summit"],
  "on-the-road": ["On-The-Road", "Regionals"]
};
const INK = {
  white: "#FFFFFF",
  "bright-blue": "#03D0FF",
  sapphire: "#0556CC",
  "royal-blue": "#022E59",
  turquoise: "#02C9B5",
  teal: "#12797C",
  magenta: "#CE2FAC",
  "deep-magenta": "#680062",
  "midnight-blue": "#022138"
};

/** Event title lockup for a Veritant summit. */
function EventLockup({
  event = "top-advisor-summit",
  color = "white",
  height = 64,
  assetBase: base,
  style,
  ...rest
}) {
  const supplied = SUPPLIED[event];
  if (supplied) {
    const c = supplied.includes(color) ? color : supplied[0];
    return /*#__PURE__*/React.createElement("img", _extends({
      src: `${__ds_scope.assetBase(base)}/event-logos/${event}-${c}.svg`,
      alt: event.replace(/-/g, " "),
      style: {
        height: `${height}px`,
        width: "auto",
        ...style
      }
    }, rest));
  }
  const lines = TYPESET[event] || [event];
  const size = Math.round(height / (lines.length * 1.06));
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-lockup-missing": event,
    title: "Vector lockup not supplied \u2014 set in type",
    style: {
      display: "grid",
      gap: 0,
      color: INK[color] || "#FFFFFF",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-light)",
      fontSize: `${size}px`,
      lineHeight: 1.02,
      letterSpacing: "var(--tracking-eventtitle)",
      textTransform: "uppercase",
      ...style
    }
  }, rest), lines.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l)));
}
Object.assign(__ds_scope, { EventLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/EventLockup.jsx", error: String((e && e.message) || e) }); }

// components/brand/ForbesLockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLORS = ["sapphire", "royal-blue", "bright-blue", "white", "black"];

/** Forbes | Veritant co-branded lockup. Spacing, scale relationship, divider and proportions are fixed. */
function ForbesLockup({
  color = "sapphire",
  height = 28,
  assetBase: base,
  style,
  ...rest
}) {
  const c = COLORS.includes(color) ? color : "sapphire";
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${__ds_scope.assetBase(base)}/logo/forbes-veritant-${c}.svg`,
    alt: "Forbes | Veritant",
    style: {
      height: `${height}px`,
      width: "auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ForbesLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ForbesLockup.jsx", error: String((e && e.message) || e) }); }

// components/core/ArrowLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text CTA with the brand chevron: "See insights >". The chevron steps right on hover. */
function ArrowLink({
  children,
  href = "#",
  tone = "accent",
  size = "md",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const color = tone === "light" ? "var(--veritant-white)" : tone === "highlight" ? "var(--veritant-bright-blue)" : "var(--veritant-sapphire)";
  const hoverColor = tone === "light" ? "var(--veritant-slight-blue)" : "var(--veritant-bright-blue)";
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "var(--space-2)",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-roman)",
      fontSize: size === "sm" ? "var(--text-body-sm)" : size === "lg" ? "var(--text-body-lg)" : "var(--text-body)",
      color: hover ? hoverColor : color,
      textDecoration: "none",
      transition: "color var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? "translateX(2px)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }, ">"));
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/cards/EventCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Event tile: location photograph, city in caps, venue, date, "View event". */
function EventCard({
  city,
  venue,
  date,
  image,
  cta = "View event",
  href = "#",
  imageHeight = 200,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "var(--border-hairline)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), image ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${imageHeight}px`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: city,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-title)",
      fontWeight: "var(--weight-light)",
      letterSpacing: "var(--tracking-eventtitle)",
      textTransform: "uppercase",
      lineHeight: 1.1,
      color: "var(--veritant-royal-blue)"
    }
  }, city), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body)",
      color: "var(--text-body)"
    }
  }, venue), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body)",
      color: "var(--text-muted)"
    }
  }, date), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    href: href,
    size: "sm"
  }, cta))));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: "8px 16px",
    fontSize: "var(--text-body-sm)"
  },
  md: {
    padding: "12px 24px",
    fontSize: "var(--text-body)"
  },
  lg: {
    padding: "16px 32px",
    fontSize: "var(--text-body-lg)"
  }
};
const VARIANTS = {
  primary: {
    background: "var(--veritant-bright-blue)",
    color: "var(--veritant-royal-blue)",
    border: "1px solid var(--veritant-bright-blue)",
    hover: "var(--veritant-turquoise)"
  },
  secondary: {
    background: "var(--veritant-sapphire)",
    color: "var(--veritant-white)",
    border: "1px solid var(--veritant-sapphire)",
    hover: "var(--veritant-royal-blue)"
  },
  outline: {
    background: "transparent",
    color: "var(--veritant-royal-blue)",
    border: "1px solid var(--veritant-royal-blue)",
    hover: "rgba(2,46,89,.06)"
  },
  "outline-light": {
    background: "transparent",
    color: "var(--veritant-white)",
    border: "1px solid rgba(255,255,255,.6)",
    hover: "rgba(255,255,255,.12)"
  }
};

/** Square-cornered brand button. Fill shifts one step deeper in-hue on hover; no lift, no scale. */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const isFill = variant === "primary" || variant === "secondary";
  const css = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-roman)",
    letterSpacing: ".02em",
    borderRadius: "var(--radius-none)",
    cursor: disabled ? "default" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    opacity: disabled ? 0.4 : 1,
    transition: "background-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard)",
    background: hover && !disabled ? isFill ? v.hover : v.hover : v.background,
    color: hover && !disabled && variant === "primary" ? "var(--veritant-royal-blue)" : v.color,
    border: v.border,
    ...(SIZES[size] || SIZES.md),
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: css
  }, handlers, rest), children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: css
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ColorField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Approved background fills and the text color the guidelines mandate on each (p.6 / p.5). */
const FIELDS = {
  "midnight-blue": {
    background: "#022138",
    text: "#FFFFFF"
  },
  "royal-blue": {
    background: "#022E59",
    text: "#FFFFFF"
  },
  sapphire: {
    background: "#0556CC",
    text: "#FFFFFF"
  },
  "bright-blue": {
    background: "#03D0FF",
    text: "#022E59"
  },
  "ocean-blue": {
    background: "#6EB4F7",
    text: "#022E59"
  },
  teal: {
    background: "#12797C",
    text: "#FFFFFF"
  },
  turquoise: {
    background: "#02C9B5",
    text: "#022E59"
  },
  "slight-blue": {
    background: "#D2F0FC",
    text: "#022E59"
  },
  "deep-magenta": {
    background: "#680062",
    text: "#FFFFFF"
  },
  magenta: {
    background: "#CE2FAC",
    text: "#FFFFFF"
  },
  yellow: {
    background: "#F4DF19",
    text: "#022E59"
  },
  "off-white": {
    background: "#FAFAFA",
    text: "#022138"
  },
  white: {
    background: "#FFFFFF",
    text: "#022138"
  },
  /* the 12 approved gradients */
  "royal-sapphire": {
    background: "var(--gradient-royal-sapphire)",
    text: "#FFFFFF"
  },
  "ocean-slight": {
    background: "var(--gradient-ocean-slight)",
    text: "#022138"
  },
  "royal-magenta": {
    background: "var(--gradient-royal-magenta)",
    text: "#FFFFFF"
  },
  "royal-bright": {
    background: "var(--gradient-royal-bright)",
    text: "#FFFFFF"
  },
  "teal-turquoise": {
    background: "var(--gradient-teal-turquoise)",
    text: "#FFFFFF"
  },
  "deepmagenta-magenta": {
    background: "var(--gradient-deepmagenta-magenta)",
    text: "#FFFFFF"
  },
  "sapphire-bright": {
    background: "var(--gradient-sapphire-bright)",
    text: "#FFFFFF"
  },
  "royal-turquoise": {
    background: "var(--gradient-royal-turquoise)",
    text: "#FFFFFF"
  },
  "magenta-soft": {
    background: "var(--gradient-magenta-soft)",
    text: "#FFFFFF"
  },
  "bright-slight": {
    background: "var(--gradient-bright-slight)",
    text: "#022138"
  },
  "turquoise-slight": {
    background: "var(--gradient-turquoise-slight)",
    text: "#022138"
  },
  "slight-offwhite": {
    background: "var(--gradient-slight-offwhite)",
    text: "#022138"
  }
};

/**
 * The brand's background primitive: an approved solid field, an approved gradient, or full-bleed
 * photography with a directional brand-color protection field. Sets the mandated text color.
 */
function ColorField({
  children,
  fill = "royal-blue",
  image,
  protect = "left",
  pad = "var(--card-pad)",
  style,
  ...rest
}) {
  const f = FIELDS[fill] || FIELDS["royal-blue"];
  const scrim = protect === "bottom" ? "var(--scrim-midnight-bottom)" : protect === "none" ? null : "var(--scrim-royal)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: f.background,
      color: image ? "#FFFFFF" : f.text,
      padding: pad,
      borderRadius: "var(--radius-none)",
      ...style
    }
  }, rest), image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : null, image && scrim ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: scrim
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, children));
}
Object.assign(__ds_scope, { FIELDS, ColorField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ColorField.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small letterspaced label for dates, categories, section eyebrows and hashtags. */
function Tag({
  children,
  tone = "quiet",
  variant = "plain",
  style,
  ...rest
}) {
  const TONES = {
    quiet: {
      color: "var(--text-muted)",
      border: "var(--line-hairline)",
      fill: "transparent"
    },
    accent: {
      color: "var(--veritant-sapphire)",
      border: "var(--veritant-sapphire)",
      fill: "var(--veritant-sapphire)"
    },
    bright: {
      color: "var(--veritant-bright-blue)",
      border: "var(--veritant-bright-blue)",
      fill: "var(--veritant-bright-blue)"
    },
    light: {
      color: "var(--veritant-white)",
      border: "rgba(255,255,255,.5)",
      fill: "var(--veritant-white)"
    }
  };
  const t = TONES[tone] || TONES.quiet;
  const filled = variant === "solid";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-medium)",
      fontSize: "var(--text-eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: variant === "plain" ? 0 : "6px 10px",
      color: filled ? tone === "bright" || tone === "light" ? "var(--veritant-royal-blue)" : "var(--veritant-white)" : t.color,
      background: filled ? t.fill : "transparent",
      border: variant === "outline" ? `1px solid ${t.border}` : "none",
      borderRadius: "var(--radius-none)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/RankingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ranking tile from the digital-graphics system: date, all-caps ranking name, "View ranking". */
function RankingCard({
  title,
  date,
  fill = "sapphire",
  graphic,
  cta = "View ranking",
  href = "#",
  height = 300,
  assetBase,
  style,
  ...rest
}) {
  const light = ["bright-blue", "ocean-blue", "turquoise", "slight-blue", "yellow", "off-white", "white", "bright-slight", "turquoise-slight", "slight-offwhite", "ocean-slight"].includes(fill);
  return /*#__PURE__*/React.createElement(__ds_scope.ColorField, _extends({
    fill: fill,
    pad: "var(--space-6)",
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: `${height}px`,
      ...style
    }
  }, rest), graphic ? /*#__PURE__*/React.createElement(__ds_scope.AnalysisIcon, {
    name: graphic,
    color: light ? "royal-blue" : "white",
    size: "72%",
    watermark: true,
    assetBase: assetBase,
    style: {
      position: "absolute",
      right: "-14%",
      bottom: "-16%",
      pointerEvents: "none"
    }
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: light ? "quiet" : "light",
    style: light ? {
      color: "var(--veritant-royal-blue)",
      opacity: .8
    } : undefined
  }, date), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: "inherit",
      fontSize: "var(--text-headline)",
      fontWeight: "var(--weight-light)",
      lineHeight: 1.05,
      letterSpacing: "var(--tracking-statement)",
      textTransform: "uppercase",
      margin: "var(--space-8) 0 var(--space-6)",
      position: "relative"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    href: href,
    tone: light ? "accent" : "light",
    size: "sm"
  }, cta));
}
Object.assign(__ds_scope, { RankingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/RankingCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/SpeakerCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Featured-speaker graphic used across social and event screens: event lockup upper-left,
 * portrait right, name/title/org and date/location bottom-left.
 */
function SpeakerCard({
  name,
  role,
  org,
  photo,
  photoPosition = "center top",
  event = "top-advisor-summit",
  lockupColor = "white",
  fill = "sapphire",
  eyebrow = "Featured speaker",
  date,
  location,
  hashtag,
  width = 480,
  assetBase,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.ColorField, _extends({
    fill: fill,
    pad: 0,
    style: {
      width: `${width}px`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 42%",
      minHeight: `${Math.round(width * 0.62)}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.EventLockup, {
    event: event,
    color: lockupColor,
    height: 54,
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, eyebrow ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "light",
    style: {
      marginBottom: "var(--space-2)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-subtitle)",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1.15
    }
  }, name), role ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      lineHeight: 1.3
    }
  }, role) : null, org ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      lineHeight: 1.3
    }
  }, org) : null, date || location ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      marginTop: "var(--space-4)",
      opacity: .85
    }
  }, date, date && location ? /*#__PURE__*/React.createElement("br", null) : null, location) : null, hashtag ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-caption)",
      letterSpacing: ".04em",
      marginTop: "var(--space-3)",
      opacity: .8
    }
  }, hashtag) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: photoPosition
    }
  }) : null)));
}
Object.assign(__ds_scope, { SpeakerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SpeakerCard.jsx", error: String((e && e.message) || e) }); }

// components/editorial/MessageBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The headline / body / CTA pair that is the brand's core messaging unit (p.31).
 * Left-aligned always. `caps` switches to the all-caps statement mode.
 */
function MessageBlock({
  headline,
  body,
  cta,
  href = "#",
  caps = false,
  tone = "dark",
  size = "md",
  maxWidth = 560,
  style,
  ...rest
}) {
  const SIZES = {
    sm: "var(--text-headline)",
    md: "var(--text-display-md)",
    lg: "var(--text-display-lg)",
    xl: "var(--text-display-xl)"
  };
  const onColor = tone === "light";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: `${maxWidth}px`,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      textAlign: "left",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: onColor ? "var(--veritant-white)" : "var(--veritant-royal-blue)",
      fontSize: SIZES[size] || SIZES.md,
      fontWeight: "var(--weight-light)",
      lineHeight: caps ? "var(--leading-statement)" : "var(--leading-display)",
      letterSpacing: caps ? "var(--tracking-eventtitle)" : "var(--tracking-statement)",
      textTransform: caps ? "uppercase" : "none"
    }
  }, headline), body ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: onColor ? "var(--text-on-dark-soft)" : "var(--text-body)",
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--leading-body)"
    }
  }, body) : null, cta ? /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    href: href,
    tone: onColor ? "light" : "accent"
  }, cta) : null);
}
Object.assign(__ds_scope, { MessageBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/MessageBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Section eyebrow + title, optionally with a supporting line and a trailing rule. */
function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "dark",
  rule = true,
  style,
  ...rest
}) {
  const onColor = tone === "light";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: onColor ? "light" : "accent"
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: onColor ? "var(--veritant-white)" : "var(--veritant-royal-blue)",
      fontSize: "var(--text-headline)",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-headline)"
    }
  }, title), sub ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: onColor ? "var(--text-on-dark-soft)" : "var(--text-muted)",
      fontSize: "var(--text-body)",
      maxWidth: 620
    }
  }, sub) : null, rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: onColor ? "var(--line-on-dark)" : "var(--line-hairline)",
      marginTop: "var(--space-4)"
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NAV_ITEMS = ["About Veritant", "Survey", "Events", "Rankings", "Research", "Marketing", "News & Insights", "The Masters List"];

/**
 * veritantresearch.com header: light brand strip with the Sapphire wordmark over a Royal Blue nav
 * bar, Bright Blue CTA — per the designer's note on the website mock.
 */
function SiteNav({
  items = NAV_ITEMS,
  active = "Rankings",
  cta = "Apply today",
  onNavigate,
  assetBase,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--veritant-white)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5) var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    color: "sapphire",
    height: 26,
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Top Wealth Advisor Directory"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNavigate && onNavigate(cta)
  }, cta))), /*#__PURE__*/React.createElement("nav", {
    style: {
      background: "var(--veritant-royal-blue)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-8)",
      padding: "0 var(--space-10)"
    }
  }, items.map(item => {
    const on = item === active;
    return /*#__PURE__*/React.createElement("a", {
      key: item,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(item);
      },
      style: {
        padding: "16px 0",
        fontSize: "var(--text-caption)",
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        fontWeight: "var(--weight-roman)",
        color: on ? "var(--veritant-bright-blue)" : "var(--veritant-white)",
        borderBottom: on ? "2px solid var(--veritant-bright-blue)" : "2px solid transparent",
        textDecoration: "none",
        transition: "color var(--duration-fast) var(--ease-standard)"
      }
    }, item);
  })));
}
Object.assign(__ds_scope, { NAV_ITEMS, SiteNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/event_graphics/Screens.jsx
try { (() => {
const {
  ColorField,
  EventLockup,
  AnalysisIcon,
  ForbesLockup,
  Wordmark,
  Tag
} = window.ShookResearchDesignSystem_aa03f8;
const A2 = window.VERITANT_ASSET_BASE || "../../assets";

/* All screens are drawn at 1280×720 — the LED / presentation ratio used across the summit system. */
const STAGE = {
  width: 1280,
  height: 720,
  position: "relative",
  overflow: "hidden"
};
const THEMES = {
  "top-advisor-summit": {
    fill: "royal-sapphire",
    lockup: "bright-blue",
    accent: "#03D0FF",
    icon: "caliber",
    hashtag: "#ForbesVeritantTopAdvisor"
  },
  "top-teams-summit": {
    fill: "teal-turquoise",
    lockup: "white",
    accent: "#02C9B5",
    icon: "assessment",
    hashtag: "#ForbesVeritantTopTeams"
  },
  "top-women-advisor-summit": {
    fill: "deepmagenta-magenta",
    lockup: "white",
    accent: "#CE2FAC",
    icon: "women-advisors",
    hashtag: "#ForbesVeritantTopWomen"
  }
};

/** Opening / transition screen: event title, signature graphic, dates. */
function StageScreen({
  event = "top-advisor-summit",
  date = "October 13-16, 2026",
  place = "Las Vegas, NV"
}) {
  const t = THEMES[event];
  return /*#__PURE__*/React.createElement(ColorField, {
    fill: t.fill,
    pad: 0,
    style: STAGE
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: t.icon,
    color: "white",
    size: 900,
    watermark: true,
    assetBase: A2,
    style: {
      position: "absolute",
      right: -180,
      bottom: -300,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: 72,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    color: "white",
    height: 30,
    assetBase: A2
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EventLockup, {
    event: event,
    color: t.lockup,
    height: 230,
    assetBase: A2
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#fff",
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: ".04em",
      marginTop: 40
    }
  }, date, " \xB7 ", place))));
}

/** Session screen: time, session title, speaker, moderator and introduction credits. */
function SessionScreen({
  event = "top-advisor-summit",
  time = "12:00-12:30 PM",
  title = "Infrastructure of the future",
  speaker = {
    name: "Sean Klimczak",
    role: "Global Head of Infrastructure and Chairman of BXINFRA",
    org: "Blackstone"
  },
  moderator = {
    name: "Lora Cooperman",
    org: "Morgan Stanley Private Wealth Management"
  },
  intro = {
    name: "Jeanette Pieper",
    role: "Managing Director",
    org: "Blackstone Private Wealth"
  }
}) {
  const t = THEMES[event];
  const credit = (label, p) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 15,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.2
    }
  }, p.name), p.role ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#D2F0FC",
      fontSize: 17,
      lineHeight: 1.35
    }
  }, p.role) : null, p.org ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#D2F0FC",
      fontSize: 17,
      lineHeight: 1.35
    }
  }, p.org) : null);
  return /*#__PURE__*/React.createElement(ColorField, {
    fill: "midnight-blue",
    pad: 0,
    style: STAGE
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: t.icon,
    color: "bright-blue",
    size: 780,
    watermark: true,
    assetBase: A2,
    style: {
      position: "absolute",
      right: -200,
      top: -160,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: 72,
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(EventLockup, {
    event: event,
    color: t.lockup,
    height: 130,
    assetBase: A2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 20,
      letterSpacing: ".14em",
      textTransform: "uppercase"
    }
  }, time), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "#fff",
      fontSize: 62,
      fontWeight: 300,
      lineHeight: 1.02,
      letterSpacing: ".01em",
      textTransform: "uppercase",
      margin: "20px 0 8px",
      maxWidth: 780
    }
  }, title), credit("Speaker", speaker), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40
    }
  }, credit("Moderator", moderator), credit("Introduction", intro)))));
}

/** Speaker screen: session title, portrait, credits and the event hashtag. */
function SpeakerScreen({
  event = "top-advisor-summit",
  title = "State of cybersecurity",
  kicker = "Introduction",
  name = "George Irwin",
  role = "Vice President, Sales,",
  org = "Fidelity",
  photo = A2 + "/photography/speaker-george-irwin.png"
}) {
  const t = THEMES[event];
  return /*#__PURE__*/React.createElement(ColorField, {
    fill: t.fill,
    pad: 0,
    style: STAGE
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "1fr 470px"
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: 72,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: 810
    }
  }, /*#__PURE__*/React.createElement(EventLockup, {
    event: event,
    color: t.lockup,
    height: 120,
    assetBase: A2
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontSize: 18,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      opacity: .85
    }
  }, kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "#fff",
      fontSize: 68,
      fontWeight: 300,
      lineHeight: 1.02,
      textTransform: "uppercase",
      letterSpacing: ".01em",
      margin: "16px 0 28px",
      maxWidth: 640
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontSize: 30,
      fontWeight: 500
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#D2F0FC",
      fontSize: 19
    }
  }, role), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#D2F0FC",
      fontSize: 19
    }
  }, org)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: 666
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 17,
      letterSpacing: ".04em"
    }
  }, t.hashtag))));
}

/** Partner thank-you screen. Partner logos were not supplied — slots are left deliberately blank. */
function PartnersScreen({
  event = "top-advisor-summit"
}) {
  const t = THEMES[event];
  const tier = (label, n, h) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: t.accent,
      fontSize: 15,
      letterSpacing: ".18em",
      textTransform: "uppercase",
      marginBottom: 14
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18
    }
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: h,
      border: "1px dashed rgba(255,255,255,.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,.45)",
      fontSize: 12,
      letterSpacing: ".1em",
      textTransform: "uppercase"
    }
  }, "Partner logo"))));
  return /*#__PURE__*/React.createElement(ColorField, {
    fill: "royal-blue",
    pad: 0,
    style: STAGE
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: 72,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EventLockup, {
    event: event,
    color: t.lockup,
    height: 104,
    assetBase: A2
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#fff",
      fontSize: 26,
      fontWeight: 300,
      marginTop: 22
    }
  }, "Thank you to those who made this possible."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, tier("Title partners", 2, 88), tier("Presenting partners", 4, 68), tier("Platinum partners", 6, 56)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "auto",
      color: "rgba(255,255,255,.5)",
      fontSize: 13
    }
  }, "Partner marks were not included in the supplied brand assets \u2014 slots left blank intentionally.")));
}

/** Wayfinding / signage screen: registration, agenda and room direction. */
function WayfindingScreen({
  event = "top-advisor-summit",
  heading = "Registration",
  lines = ["Check-in, Swag Bags,", "Event Information"]
}) {
  const t = THEMES[event];
  return /*#__PURE__*/React.createElement(ColorField, {
    fill: "sapphire",
    pad: 0,
    style: STAGE
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: "pathways",
    color: "white",
    size: 760,
    watermark: true,
    assetBase: A2,
    style: {
      position: "absolute",
      left: -220,
      bottom: -260,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      padding: 72,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(EventLockup, {
    event: event,
    color: "white",
    height: 110,
    assetBase: A2
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "#fff",
      fontSize: 96,
      fontWeight: 300,
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: ".02em"
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, lines.map(l => /*#__PURE__*/React.createElement("p", {
    key: l,
    style: {
      color: "#D2F0FC",
      fontSize: 30,
      fontWeight: 300,
      lineHeight: 1.3
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    color: "white",
    height: 26,
    assetBase: A2
  }))));
}
Object.assign(window, {
  StageScreen,
  SessionScreen,
  SpeakerScreen,
  PartnersScreen,
  WayfindingScreen,
  THEMES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/event_graphics/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/events/event-template.js
try { (() => {
/* Shared behaviour for both event page directions.
   1. Theme map — the per-event content that travels with the color theme.
   2. Theme switcher — demo control only; not part of the delivered page.
   3. Scroll reveal — opacity + short travel, per the brand's restrained motion rules. */
(function () {
  /* Resolves an asset path, preferring a bundler-inlined blob URL when the standalone
     export has provided one via window.__resources. */
  function res(id, path) {
    return window.__resources && window.__resources[id] || path;
  }
  var THEMES = {
    "top-advisor": {
      label: "Top Advisor",
      name: "Top Advisor Summit",
      lockup: res("lockupTopAdvisor", "../../assets/event-logos/top-advisor-summit-white.svg"),
      icon: res("iconCaliber", "../../assets/icons/caliber-white.svg"),
      iconField: res("iconCaliber", "../../assets/icons/caliber-white.svg"),
      hashtag: "#ForbesVeritantTopAdvisor",
      dates: "October 13\u201316, 2026",
      venue: "The Wynn",
      city: "Las Vegas, NV",
      swatch: "#0556CC"
    },
    "top-teams": {
      label: "Top Teams",
      name: "Top Teams Summit",
      lockup: res("lockupTopTeams", "../../assets/event-logos/top-teams-summit-white.svg"),
      icon: res("iconAssessment", "../../assets/icons/assessment-white.svg"),
      iconField: res("iconAssessment", "../../assets/icons/assessment-white.svg"),
      hashtag: "#ForbesVeritantTopTeams",
      dates: "March 1\u20133, 2027",
      venue: "Fontainebleau",
      city: "Miami Beach, FL",
      swatch: "#12797C"
    },
    "top-women": {
      label: "Top Women",
      name: "Top Women Advisor Summit",
      lockup: res("lockupTopWomen", "../../assets/event-logos/top-women-advisor-summit-white.svg"),
      icon: res("iconWomenAdvisors", "../../assets/icons/women-advisors-white.svg"),
      iconField: res("iconWomenAdvisors", "../../assets/icons/women-advisors-white.svg"),
      hashtag: "#ForbesVeritantTopWomen",
      dates: "May 11\u201313, 2027",
      venue: "The Boca Raton",
      city: "Boca Raton, FL",
      swatch: "#680062"
    },
    "top-ria": {
      label: "Top RIA",
      name: "Top RIA Summit",
      lockup: null,
      /* vector lockup not supplied in the brand assets — set in type */
      icon: res("iconPathways", "../../assets/icons/pathways-white.svg"),
      iconField: res("iconPathways", "../../assets/icons/pathways-white.svg"),
      hashtag: "#ForbesVeritantTopRIA",
      dates: "June 8\u201310, 2027",
      venue: "The Langham",
      city: "Chicago, IL",
      swatch: "#022E59"
    }
  };
  function applyTheme(key) {
    var t = THEMES[key];
    if (!t) return;
    document.body.setAttribute("data-event-theme", key);
    document.querySelectorAll("[data-themed-lockup]").forEach(function (el) {
      var type = el.getAttribute("data-themed-lockup");
      if (type === "img") {
        if (t.lockup) {
          el.src = t.lockup;
          el.alt = t.name;
          el.style.display = "";
        } else {
          el.style.display = "none";
        }
      } else {
        el.textContent = t.name;
        el.style.display = t.lockup ? "none" : "";
      }
    });
    document.querySelectorAll("[data-themed-icon]").forEach(function (el) {
      el.src = t.icon;
    });
    document.querySelectorAll("[data-themed-name]").forEach(function (el) {
      el.textContent = t.name;
    });
    document.querySelectorAll("[data-themed-hashtag]").forEach(function (el) {
      el.textContent = t.hashtag;
    });
    document.querySelectorAll("[data-themed-dates]").forEach(function (el) {
      el.textContent = t.dates;
    });
    document.querySelectorAll("[data-themed-venue]").forEach(function (el) {
      el.textContent = t.venue;
    });
    document.querySelectorAll("[data-themed-city]").forEach(function (el) {
      el.textContent = t.city;
    });
    document.querySelectorAll("[data-themed-line]").forEach(function (el) {
      el.textContent = t.venue + "  \u00b7  " + t.dates + "  \u00b7  " + t.city;
    });
    document.querySelectorAll("[data-theme-btn]").forEach(function (b) {
      var on = b.getAttribute("data-theme-btn") === key;
      b.style.outline = on ? "2px solid #FFFFFF" : "2px solid transparent";
      b.style.outlineOffset = "2px";
    });
  }
  function buildSwitcher() {
    var bar = document.createElement("div");
    bar.setAttribute("data-demo-control", "");
    bar.style.cssText = "position:fixed;left:20px;bottom:20px;z-index:200;background:rgba(2,33,56,.94);padding:12px 14px;display:flex;align-items:center;gap:12px";
    var lbl = document.createElement("span");
    lbl.textContent = "Event theme";
    lbl.style.cssText = "font-family:var(--font-display);font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.62)";
    bar.appendChild(lbl);
    Object.keys(THEMES).forEach(function (key) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-theme-btn", key);
      b.title = THEMES[key].label;
      b.style.cssText = "width:26px;height:26px;border:none;cursor:pointer;background:" + THEMES[key].swatch;
      b.onclick = function () {
        applyTheme(key);
      };
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
  }
  function reveal() {
    var seen = new Set();
    [".rv-group > *", "[data-rv]"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        if (seen.has(el) || el.closest("header") || el.hasAttribute("data-demo-control")) return;
        seen.add(el);
        el.classList.add("rv");
        el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.06
    });
    seen.forEach(function (el) {
      io.observe(el);
    });
  }
  window.VERITANT_EVENT_THEMES = THEMES;
  window.applyEventTheme = applyTheme;
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(document.body.getAttribute("data-event-theme") || "top-advisor");
    buildSwitcher();
    reveal();
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/events/event-template.js", error: String((e && e.message) || e) }); }

// ui_kits/website/EventsScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  ColorField,
  EventCard,
  SpeakerCard,
  SectionHeading,
  EventLockup,
  Tag,
  Button,
  ArrowLink
} = window.ShookResearchDesignSystem_aa03f8;
const SUMMITS = [{
  event: "top-advisor-summit",
  fill: "sapphire",
  lockup: "bright-blue",
  date: "October 13-16, 2026",
  place: "Las Vegas, NV"
}, {
  event: "top-teams-summit",
  fill: "teal",
  lockup: "turquoise",
  date: "June 9-11, 2027",
  place: "Austin, TX"
}, {
  event: "top-women-advisor-summit",
  fill: "deep-magenta",
  lockup: "magenta",
  date: "May 11-13, 2027",
  place: "The Boca Raton"
}];
const REGIONALS = [{
  city: "Chicago",
  venue: "The St. Regis Chicago",
  date: "September 3, 2026",
  image: window.A + "/photography/venue-chicago.png"
}, {
  city: "San Francisco",
  venue: "The Merchants Exchange",
  date: "November 17, 2026",
  image: window.A + "/photography/venue-san-francisco.png"
}, {
  city: "Beverly Hills",
  venue: "The Maybourne Beverly Hills",
  date: "November 19, 2026",
  image: window.A + "/photography/venue-beverly-hills.jpg"
}, {
  city: "Boston",
  venue: "The Newbury Boston",
  date: "December 2, 2026",
  image: window.A + "/photography/texture-architecture.jpg"
}];
function EventsScreen() {
  const [tab, setTab] = React.useState("Summits");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColorField, {
    fill: "midnight-blue",
    image: window.A + "/photography/event-audience.jpg",
    protect: "left",
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "88px 40px",
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "light"
  }, "Events"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "var(--veritant-white)",
      fontSize: "var(--text-display-md)",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-display)",
      margin: "20px 0 16px"
    }
  }, "Where the industry connects."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-on-dark-soft)",
      fontSize: "var(--text-body-lg)"
    }
  }, "We bring the industry into one room, where advisors, management, sponsors, and capital converge."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      borderBottom: "var(--border-hairline)",
      padding: "0 40px"
    }
  }, ["Summits", "On-The-Road"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    onClick: () => setTab(t),
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "18px 0",
      marginRight: 32,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-caption)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: t === tab ? "var(--veritant-sapphire)" : "var(--text-muted)",
      borderBottom: t === tab ? "2px solid var(--veritant-sapphire)" : "2px solid transparent"
    }
  }, t))), tab === "Summits" ? /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "48px 40px 72px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--gutter)"
    }
  }, SUMMITS.map(s => /*#__PURE__*/React.createElement(ColorField, {
    key: s.event,
    fill: s.fill,
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      alignItems: "center",
      gap: 32,
      padding: "36px 32px"
    }
  }, /*#__PURE__*/React.createElement(EventLockup, {
    event: s.event,
    color: s.lockup,
    height: 88
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--veritant-white)",
      fontSize: "var(--text-subtitle)",
      fontWeight: "var(--weight-light)"
    }
  }, s.date), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-on-dark-soft)",
      marginTop: 4
    }
  }, s.place), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(ArrowLink, {
    tone: "light"
  }, "View event"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Featured speakers",
    title: "Top Advisor Summit 2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "var(--gutter)",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(SpeakerCard, {
    width: 560,
    name: "Michael Patterson",
    role: "Founding Partner, Co-President",
    org: "HPS Investment Partners",
    photo: window.A + "/photography/speaker-michael-patterson.jpg",
    date: "October 13-16, 2026",
    location: "Las Vegas, NV",
    fill: "sapphire",
    hashtag: "#ForbesVeritantTopAdvisor"
  }), /*#__PURE__*/React.createElement(SpeakerCard, {
    width: 560,
    name: "George Irwin",
    role: "Vice President, Sales",
    org: "Fidelity",
    photo: window.A + "/photography/speaker-george-irwin.png",
    date: "October 13-16, 2026",
    location: "Las Vegas, NV",
    fill: "royal-blue",
    hashtag: "#ForbesVeritantTopAdvisor"
  })))) : /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "48px 40px 72px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "On-The-Road",
    title: "45 states. Top advisors. One powerful network.",
    sub: "Regional gatherings that bring the research to the advisors who shape it."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--gutter)",
      marginTop: 32
    }
  }, REGIONALS.map(e => /*#__PURE__*/React.createElement(EventCard, _extends({
    key: e.city
  }, e))))));
}
Object.assign(window, {
  EventsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EventsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  ColorField,
  MessageBlock,
  RankingCard,
  EventCard,
  SectionHeading,
  Button,
  ArrowLink,
  Tag,
  EventLockup,
  AnalysisIcon
} = window.ShookResearchDesignSystem_aa03f8;
const RANKINGS = [{
  title: "Best-in-State Wealth Management Teams",
  date: "April 2026",
  fill: "sapphire",
  graphic: "benchmarks"
}, {
  title: "Top Wealth Management Teams – High Net Worth",
  date: "March 2026",
  fill: "royal-blue",
  graphic: "comparison"
}, {
  title: "Top 250 Wealth Advisors",
  date: "Sep 2026",
  fill: "royal-sapphire",
  graphic: "caliber"
}, {
  title: "Top Women Wealth Advisors",
  date: "Aug 2026",
  fill: "bright-blue",
  graphic: "women-advisors"
}];
const EVENTS = [{
  city: "Chicago",
  venue: "The St. Regis Chicago",
  date: "September 3, 2026",
  image: window.A + "/photography/venue-chicago.png"
}, {
  city: "San Francisco",
  venue: "The Merchants Exchange",
  date: "November 17, 2026",
  image: window.A + "/photography/venue-san-francisco.png"
}, {
  city: "Beverly Hills",
  venue: "The Maybourne Beverly Hills",
  date: "November 19, 2026",
  image: window.A + "/photography/venue-beverly-hills.jpg"
}, {
  city: "Las Vegas",
  venue: "Wynn Las Vegas",
  date: "October 13-16, 2026",
  image: window.A + "/photography/event-keynote-stage.png"
}];
function HomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColorField, {
    fill: "royal-sapphire",
    pad: 0,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: "pathways",
    color: "bright-blue",
    size: 620,
    watermark: true,
    style: {
      position: "absolute",
      right: -140,
      bottom: -220,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "88px 40px 96px"
    }
  }, /*#__PURE__*/React.createElement(MessageBlock, {
    tone: "light",
    size: "lg",
    maxWidth: 720,
    headline: "We measure twice, publish once.",
    body: "Veritant's value lies in its proprietary methodology, deep advisor relationships, access to elite networks and independent authority in defining what excellence truly means in the industry."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNavigate("Rankings")
  }, "See insights"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-light",
    onClick: () => onNavigate("About Veritant")
  }, "How it works")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 40px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Rankings",
    title: "The 2026 research calendar",
    sub: "Independent research highlighting the professionals who bring discipline, perspective, and purpose to advice."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--gutter)",
      marginTop: 32
    }
  }, RANKINGS.map(r => /*#__PURE__*/React.createElement(RankingCard, _extends({
    key: r.title
  }, r, {
    height: 280,
    onClick: () => onNavigate("Rankings"),
    style: {
      cursor: "pointer"
    }
  }))))), /*#__PURE__*/React.createElement(ColorField, {
    fill: "midnight-blue",
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "64px 40px"
    }
  }, /*#__PURE__*/React.createElement(EventLockup, {
    event: "top-advisor-summit",
    color: "bright-blue",
    height: 96
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--veritant-white)",
      fontSize: "var(--text-title)",
      fontWeight: "var(--weight-light)",
      marginTop: 28
    }
  }, "October 13-16, 2026 \xB7 Las Vegas, NV"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-on-dark-soft)",
      marginTop: 16,
      maxWidth: 460
    }
  }, "Featured speaker Michael Patterson, Founding Partner and Co-President, HPS Investment Partners."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNavigate("Events")
  }, "Learn more"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 320
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.A + "/photography/speaker-michael-patterson.jpg",
    alt: "Michael Patterson",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 28%"
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 40px"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Events",
    title: "Where the industry connects",
    sub: "On-The-Road regionals and the summit series bring advisors, management, sponsors and capital into one room."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--gutter)",
      marginTop: 32
    }
  }, EVENTS.map(e => /*#__PURE__*/React.createElement(EventCard, _extends({
    key: e.city
  }, e, {
    href: "#"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 40px 72px",
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--gutter)"
    }
  }, [{
    fill: "sapphire",
    tag: "News & Insights",
    h: "Anyone can list advisors. Instead, we defined excellence.",
    cta: "Discover more"
  }, {
    fill: "teal-turquoise",
    tag: "Research",
    h: "We set the industry standard.",
    cta: "Explore insights"
  }, {
    fill: "deepmagenta-magenta",
    tag: "Methodology",
    h: "Rankings are the output. Rigor is the asset.",
    cta: "See how it works"
  }].map(c => /*#__PURE__*/React.createElement(ColorField, {
    key: c.h,
    fill: c.fill,
    pad: "var(--space-8)",
    style: {
      minHeight: 240,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "light"
  }, c.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: "inherit",
      fontSize: "var(--text-title)",
      fontWeight: "var(--weight-light)",
      lineHeight: 1.15,
      marginBottom: 20
    }
  }, c.h), /*#__PURE__*/React.createElement(ArrowLink, {
    tone: "light",
    size: "sm"
  }, c.cta))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/InsightScreen.jsx
try { (() => {
const {
  ColorField,
  Tag,
  ArrowLink,
  AnalysisIcon,
  ForbesLockup
} = window.ShookResearchDesignSystem_aa03f8;
function InsightScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColorField, {
    fill: "slight-blue",
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "64px 40px 56px",
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "accent"
  }, "News & Insights \xB7 March 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "var(--veritant-royal-blue)",
      fontSize: "var(--text-display-md)",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-display)",
      margin: "20px 0 20px"
    }
  }, "Rising above market volatility: who will prevail?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--text-body)",
      maxWidth: 680
    }
  }, "When markets test everyone, Veritant's research helps define the advisors whose process, judgment, and relationships continue to hold up."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 340,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.A + "/photography/texture-glass.jpg",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("article", {
    style: {
      padding: "64px 40px",
      display: "grid",
      gridTemplateColumns: "220px minmax(0,680px)",
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Written by"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: "var(--weight-medium)",
      color: "var(--veritant-royal-blue)"
    }
  }, "Veritant Research"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line-hairline)"
    }
  }), /*#__PURE__*/React.createElement(Tag, null, "Share"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--text-muted)"
    }
  }, "#ForbesVeritantTopAdvisor"), /*#__PURE__*/React.createElement(ForbesLockup, {
    color: "sapphire",
    height: 20,
    style: {
      marginTop: 12
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("p", null, "Our methodology is exhaustive. Independence is non-negotiable, and our rankings aren't driven by AUM alone. Every firm is evaluated using the same criteria, applied the same way \u2014 quantitative discipline alongside qualitative review, including references, interviews and regulatory review."), /*#__PURE__*/React.createElement("p", null, "Short-term growth doesn't offset long-term inconsistency. Pattern recognition built over years, not weeks, is what separates a strong quarter from a durable practice. Behind every ranking is a conversation with the advisor, their clients and the community they serve."), /*#__PURE__*/React.createElement(ColorField, {
    fill: "royal-blue",
    pad: "var(--space-8)",
    style: {
      margin: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--veritant-white)",
      fontSize: "var(--text-headline)",
      fontWeight: "var(--weight-light)",
      lineHeight: 1.15,
      letterSpacing: "var(--tracking-statement)"
    }
  }, "Rankings are the output. Rigor is the asset.")), /*#__PURE__*/React.createElement("p", null, "We exist to elevate the industry, not just rank it. Every interview, every event, every insight points toward the same conviction: that advisors shape lives, and the standard we hold them to should reflect that."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      borderTop: "var(--border-hairline)",
      paddingTop: 24,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: "evidence",
    color: "royal-blue",
    size: 64
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: "var(--weight-medium)",
      color: "var(--veritant-royal-blue)"
    }
  }, "Read the methodology"), /*#__PURE__*/React.createElement(ArrowLink, {
    size: "sm"
  }, "See how it works"))))));
}
Object.assign(window, {
  InsightScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/InsightScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/RankingsScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  ColorField,
  RankingCard,
  SectionHeading,
  Tag,
  Button,
  AnalysisIcon
} = window.ShookResearchDesignSystem_aa03f8;
const ALL = [{
  title: "Top 250 Wealth Advisors",
  date: "Sep 2026",
  fill: "royal-blue",
  graphic: "caliber"
}, {
  title: "Best-in-State Wealth Management Teams",
  date: "April 2026",
  fill: "sapphire",
  graphic: "benchmarks"
}, {
  title: "Top Women Wealth Advisors",
  date: "Aug 2026",
  fill: "deepmagenta-magenta",
  graphic: "women-advisors"
}, {
  title: "Top Wealth Management Teams – High Net Worth",
  date: "March 2026",
  fill: "royal-sapphire",
  graphic: "comparison"
}, {
  title: "Top RIA Firms",
  date: "May 2026",
  fill: "teal",
  graphic: "assessment"
}, {
  title: "Best-in-State Wealth Advisors",
  date: "June 2026",
  fill: "bright-blue",
  graphic: "alignment"
}, {
  title: "Top Next-Generation Advisors",
  date: "July 2026",
  fill: "royal-turquoise",
  graphic: "momentum"
}, {
  title: "The Masters List",
  date: "December 2026",
  fill: "midnight-blue",
  graphic: "evidence"
}];
const FILTERS = ["All rankings", "Advisors", "Teams", "Firms", "By state"];
function RankingsScreen({
  onNavigate
}) {
  const [filter, setFilter] = React.useState("All rankings");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColorField, {
    fill: "royal-blue",
    pad: 0,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: "benchmarks",
    color: "bright-blue",
    size: 520,
    watermark: true,
    style: {
      position: "absolute",
      right: -80,
      top: -120,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "64px 40px 56px",
      maxWidth: 780
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "light"
  }, "Rankings"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "var(--veritant-white)",
      fontSize: "var(--text-display-md)",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-display)",
      margin: "20px 0 18px"
    }
  }, "Where independent research reveals the quality of great advice."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-on-dark-soft)",
      fontSize: "var(--text-body-lg)",
      maxWidth: 620
    }
  }, "A disciplined look at the advisors setting higher standards for service, insight, and client impact."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "48px 40px 72px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      borderBottom: "var(--border-hairline)",
      paddingBottom: 16,
      marginBottom: 32
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    type: "button",
    onClick: () => setFilter(f),
    style: {
      border: "none",
      background: f === filter ? "var(--veritant-royal-blue)" : "transparent",
      color: f === filter ? "var(--veritant-white)" : "var(--text-muted)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-caption)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      padding: "10px 16px",
      cursor: "pointer"
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--gutter)"
    }
  }, ALL.map(r => /*#__PURE__*/React.createElement(RankingCard, _extends({
    key: r.title
  }, r, {
    height: 280
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--veritant-slight-blue)",
      padding: "28px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-title)",
      fontWeight: "var(--weight-light)",
      color: "var(--veritant-royal-blue)"
    }
  }, "Top RIA Firms \xB7 2026 list"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-body)",
      marginTop: 6
    }
  }, "Final deadline: May 10th. Complete your survey today.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate("Survey")
  }, "Apply today"))));
}
Object.assign(window, {
  RankingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/RankingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
const {
  Wordmark,
  ForbesLockup,
  ArrowLink,
  Tag,
  AnalysisIcon
} = window.ShookResearchDesignSystem_aa03f8;
const A = "../../assets";
const FOOTER_COLS = [["Rankings", ["Top 250 Wealth Advisors", "Best-in-State Teams", "Top Women Wealth Advisors", "Top RIA Firms"]], ["Events", ["Top Advisor Summit", "Top Teams Summit", "Top Women Advisor Summit", "On-The-Road"]], ["Company", ["About Veritant", "Methodology", "News & Insights", "Contact"]]];
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--veritant-midnight-blue)",
      color: "var(--text-on-dark)",
      padding: "64px 40px 32px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(AnalysisIcon, {
    name: "connection",
    color: "bright-blue",
    size: 420,
    watermark: true,
    style: {
      position: "absolute",
      right: -120,
      top: -120,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    color: "white",
    height: 26
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--text-on-dark-soft)",
      maxWidth: 280
    }
  }, "Independent research defining advisor excellence in wealth management."), /*#__PURE__*/React.createElement(ForbesLockup, {
    color: "white",
    height: 22,
    style: {
      marginTop: 8
    }
  })), FOOTER_COLS.map(([head, items]) => /*#__PURE__*/React.createElement("div", {
    key: head,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "light"
  }, head), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      color: "var(--text-on-dark-soft)",
      fontSize: "var(--text-body-sm)",
      textDecoration: "none"
    }
  }, i))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 48,
      paddingTop: 20,
      borderTop: "1px solid var(--line-on-dark)",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--text-caption)",
      color: "var(--text-on-dark-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Veritant Research LLC"), /*#__PURE__*/React.createElement("span", null, "Terms \xB7 Privacy \xB7 Methodology")));
}

/** Directory year strip from the website mock. */
function DirectoryStrip({
  years = ["2026", "2025", "2024", "2023", "2022"],
  active = "2026"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--veritant-slight-blue)",
      padding: "14px 40px",
      display: "flex",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-caption)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--veritant-royal-blue)"
    }
  }, "Top Wealth Advisor Directory"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, years.map(y => /*#__PURE__*/React.createElement("a", {
    key: y,
    href: "#",
    style: {
      fontSize: "var(--text-body-sm)",
      color: y === active ? "var(--veritant-sapphire)" : "var(--text-muted)",
      fontWeight: y === active ? "var(--weight-medium)" : "var(--weight-light)",
      textDecoration: "none"
    }
  }, y))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(ArrowLink, {
    size: "sm"
  }, "Complete your survey")));
}
Object.assign(window, {
  Footer,
  DirectoryStrip,
  A
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ANALYSIS_ICONS = __ds_scope.ANALYSIS_ICONS;

__ds_ns.AnalysisIcon = __ds_scope.AnalysisIcon;

__ds_ns.EventLockup = __ds_scope.EventLockup;

__ds_ns.ForbesLockup = __ds_scope.ForbesLockup;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.RankingCard = __ds_scope.RankingCard;

__ds_ns.SpeakerCard = __ds_scope.SpeakerCard;

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FIELDS = __ds_scope.FIELDS;

__ds_ns.ColorField = __ds_scope.ColorField;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.MessageBlock = __ds_scope.MessageBlock;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.NAV_ITEMS = __ds_scope.NAV_ITEMS;

__ds_ns.SiteNav = __ds_scope.SiteNav;

})();
