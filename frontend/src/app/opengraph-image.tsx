import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Social share card (og:image + twitter:image) for every route.
 *
 * Lives at the root app segment, so /discovery and /thank-you inherit it.
 * Without this file scrapers pick the largest image on the page - which was
 * the founder photo (/diamond.png). This renders the header wordmark instead.
 *
 * Rendered by Satori: FLEXBOX ONLY (no grid), and any element with more than
 * one child needs an explicit `display: flex`. Uses the font bundled with
 * next/og - do not add a `fonts` option without checking the 500KB bundle cap.
 */

export const alt = `${site.name} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Wordmark tracking, in px. Also used as paddingLeft to cancel the trailing
// letter-space so the mark reads optically centered.
const WORDMARK_TRACKING = 26;
const TAGLINE_TRACKING = 11;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1b2a",
          backgroundImage:
            "linear-gradient(135deg, #0d1b2a 0%, #16293d 55%, #0d1b2a 100%)",
          position: "relative",
        }}
      >
        {/* Inset gold frame */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "1px solid rgba(201, 168, 76, 0.28)",
          }}
        />

        {/* Wordmark: CLARKED + gold period, same as the header brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingLeft: WORDMARK_TRACKING,
            fontSize: 146,
            letterSpacing: WORDMARK_TRACKING,
            color: "#ffffff",
          }}
        >
          CLARKED
          <span style={{ color: "#c9a84c" }}>.</span>
        </div>

        {/* Gold hairline */}
        <div
          style={{
            width: 96,
            height: 2,
            // Without flexShrink the 2px rule collapses sub-pixel in the
            // column flex container and antialiases to washed-out grey.
            flexShrink: 0,
            marginTop: 44,
            marginBottom: 34,
            backgroundColor: "#c9a84c",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            paddingLeft: TAGLINE_TRACKING,
            fontSize: 31,
            letterSpacing: TAGLINE_TRACKING,
            color: "#c9a84c",
          }}
        >
          {site.tagline.toUpperCase()}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 78,
            display: "flex",
            fontSize: 21,
            letterSpacing: 4,
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
