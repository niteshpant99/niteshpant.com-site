import React from "react";

// Diagram: consulting's staffing pyramid becomes a diamond once AI eats the
// grunt work. Left = today's pyramid (many analysts at the base). Right = the
// diamond, drawn as the same triangle recut: a faint dashed ghost of the old
// pyramid sits behind it, base corners "cut" away, the middle bulged out where
// experienced judgment now lives. Theme-aware, pure SVG, no client JS.

const GREEN = "var(--prose-dartmouth)";

// Shared triangle geometry (apex up), reused for both panels so the diamond
// reads as the same shape recut. Left panel centered at x=140, right at x=420.
const bandFill = "stroke-neutral-400/70 dark:stroke-neutral-600";

export function PyramidToDiamond() {
  return (
    <figure className="not-prose my-8">
      <svg
        viewBox="0 0 560 268"
        width="100%"
        role="img"
        aria-label="Consulting's staffing pyramid becomes a diamond. The pyramid has many analysts at the base, fewer managers, and partners at the apex. As AI absorbs the grunt work, the base of juniors shrinks, the middle of experienced veterans bulges out, and seniors stay at the top owning accountability."
        className="block"
      >
        <title>The pyramid becomes a diamond</title>

        {/* ---------- LEFT: the pyramid (today) ---------- */}
        {/* Analysts (widest base) */}
        <polygon
          points="206.8,167 240,230 40,230 73.2,167"
          strokeWidth="1"
          className={`fill-neutral-300 dark:fill-neutral-700 ${bandFill}`}
        />
        {/* Managers */}
        <polygon
          points="173.2,103 206.8,167 73.2,167 106.8,103"
          strokeWidth="1"
          className={`fill-neutral-200 dark:fill-neutral-800 ${bandFill}`}
        />
        {/* Partners (apex) */}
        <polygon
          points="140,40 173.2,103 106.8,103"
          strokeWidth="1"
          className={`fill-neutral-100 dark:fill-neutral-900 ${bandFill}`}
        />

        <text x="140" y="86" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono fill-neutral-600 dark:fill-neutral-300">PARTNERS</text>
        <text x="140" y="139" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono fill-neutral-700 dark:fill-neutral-200">MANAGERS</text>
        <text x="140" y="203" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono fill-neutral-700 dark:fill-neutral-100">ANALYSTS</text>

        <text x="140" y="252" textAnchor="middle" fontSize="11" className="font-mono fill-neutral-500 dark:fill-neutral-400">today: the pyramid</text>

        {/* ---------- arrow ---------- */}
        <text x="280" y="120" textAnchor="middle" fontSize="9" className="font-mono fill-neutral-400 dark:fill-neutral-500">AI eats the</text>
        <text x="280" y="131" textAnchor="middle" fontSize="9" className="font-mono fill-neutral-400 dark:fill-neutral-500">grunt work</text>
        <line x1="250" y1="145" x2="304" y2="145" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <polygon points="304,145 296,141 296,149" className="fill-neutral-400 dark:fill-neutral-500" />

        {/* ---------- RIGHT: the diamond (tomorrow) ---------- */}
        {/* ghost of the old pyramid: same triangle, base corners about to be cut */}
        <polygon
          points="420,40 520,230 320,230"
          fill="none"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.6"
          className="stroke-neutral-300 dark:stroke-neutral-700"
        />

        {/* Juniors (narrow bottom point) */}
        <polygon
          points="486.3,167 420,230 353.7,167"
          strokeWidth="1"
          className={`fill-neutral-100 dark:fill-neutral-900 ${bandFill}`}
        />
        {/* Veterans (widest middle — where judgment now lives) */}
        <polygon
          points="486.3,103 520,135 486.3,167 353.7,167 320,135 353.7,103"
          strokeWidth="1"
          style={{ fill: GREEN, stroke: GREEN }}
          fillOpacity="0.16"
          strokeOpacity="0.55"
        />
        {/* Seniors (narrow top point) */}
        <polygon
          points="420,40 486.3,103 353.7,103"
          strokeWidth="1"
          className={`fill-neutral-200 dark:fill-neutral-800 ${bandFill}`}
        />

        <text x="420" y="82" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono fill-neutral-700 dark:fill-neutral-200">SENIORS</text>
        <text x="420" y="139" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono" style={{ fill: GREEN }}>VETERANS</text>
        <text x="420" y="203" textAnchor="middle" fontSize="11" letterSpacing="0.5" className="font-mono fill-neutral-500 dark:fill-neutral-400">JUNIORS</text>

        <text x="420" y="252" textAnchor="middle" fontSize="11" className="font-mono" style={{ fill: GREEN }}>tomorrow: the diamond</text>
      </svg>
      <figcaption className="block w-full text-xs mt-3 font-mono text-gray-500 text-center leading-normal">
        Cut the base off the pyramid and push out the middle: fewer juniors,
        more experienced veterans who can judge the AI&apos;s output, and seniors
        on top who still stake their name on the work.
      </figcaption>
    </figure>
  );
}
