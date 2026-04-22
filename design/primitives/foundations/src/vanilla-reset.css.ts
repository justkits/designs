import { globalStyle, layer } from "@vanilla-extract/css";

const reset = layer("reset");

/**
 * Prefer border-box
 */
globalStyle("*, *::before, *::after", {
  "@layer": {
    [reset]: {
      boxSizing: "border-box",
    },
  },
});

/**
 * Remove default margins, paddings, and text adjusts
 */
globalStyle("html, body, p, h1, h2, h3, h4, h5, h6", {
  "@layer": {
    [reset]: {
      margin: 0,
      padding: 0,
      MozTextSizeAdjust: "none",
      WebkitTextSizeAdjust: "none",
      textSizeAdjust: "none",
    },
  },
});

/**
 * Set core typography defaults
 */
globalStyle("b, strong", {
  "@layer": {
    [reset]: {
      fontWeight: "bolder",
    },
  },
});
globalStyle("small", {
  "@layer": {
    [reset]: {
      fontSize: "80%",
    },
  },
});
globalStyle("code, kbd, samp, pre", {
  "@layer": {
    [reset]: {
      fontFamily: "monospace, monospace",
      fontSize: "1em",
    },
  },
});
globalStyle("sub, sup", {
  "@layer": {
    [reset]: {
      fontSize: "75%",
      lineHeight: 0,
      position: "relative",
      verticalAlign: "baseline",
    },
  },
});
globalStyle("sub", {
  "@layer": {
    [reset]: {
      bottom: "-0.25em",
    },
  },
});
globalStyle("sup", {
  "@layer": {
    [reset]: {
      top: "-0.5em",
    },
  },
});

/**
 * Set core form element defaults
 */
globalStyle("button, input, select, textarea", {
  "@layer": {
    [reset]: {
      fontFamily: "inherit",
      fontSize: "100%",
      lineHeight: 1.15,
      margin: 0,
      background: "none",
      border: "none",
    },
  },
});
globalStyle("button, input", {
  "@layer": {
    [reset]: {
      overflow: "visible",
    },
  },
});
globalStyle("button, select", {
  "@layer": {
    [reset]: {
      textTransform: "none",
    },
  },
});
globalStyle("button, [type='button'], [type='reset'], [type='submit']", {
  "@layer": {
    [reset]: {
      appearance: "none",
      WebkitAppearance: "none",
      cursor: "pointer",
    },
  },
});
globalStyle(
  "button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner",
  {
    "@layer": {
      [reset]: {
        borderStyle: "none",
        padding: 0,
      },
    },
  },
);
globalStyle("input[type='search']", {
  "@layer": {
    [reset]: {
      appearance: "none",
      WebkitAppearance: "none",
    },
  },
});
globalStyle("input[type='search']::-webkit-search-decoration", {
  "@layer": {
    [reset]: {
      appearance: "none",
      WebkitAppearance: "none",
    },
  },
});
globalStyle("fieldset", {
  "@layer": {
    [reset]: {
      margin: 0,
      padding: 0,
      border: "none",
    },
  },
});

/**
 * Remove list styles
 */
globalStyle("ol, ul", {
  "@layer": {
    [reset]: {
      listStyle: "none",
    },
  },
});

/**
 * Remove default table styles
 */
globalStyle("table", {
  "@layer": {
    [reset]: {
      borderCollapse: "collapse",
      borderSpacing: 0,
    },
  },
});

/**
 * Remove default media styles
 */
globalStyle("img, svg, video", {
  "@layer": {
    [reset]: {
      display: "block",
      maxWidth: "100%",
      height: "auto",
    },
  },
});

/**
 * Remove default link styles
 */
globalStyle("a", {
  "@layer": {
    [reset]: {
      color: "inherit",
      textDecoration: "none",
    },
  },
});

/**
 * Remove default dialog styles
 */
globalStyle("table", {
  "@layer": {
    [reset]: {
      margin: 0,
      padding: 0,
      border: "none",
      background: "none",
      maxWidth: "none",
      maxHeight: "none",
    },
  },
});
