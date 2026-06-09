import React from "react";

// Diagram: the spectrum of information work.
// Left end = tasks AI can automate (gather/process/study); right end = the
// irreducibly human end (commit/own). Theme-aware via currentColor + the
// site's Dartmouth-green accent (--prose-dartmouth). Pure SVG, no client JS.

type Stage = {
  name: string;
  sub: string;
  x: number;
  human?: boolean;
};

const STAGES: Stage[] = [
  { name: "GATHER", sub: "acquire", x: 72 },
  { name: "PROCESS", sub: "transform", x: 167 },
  { name: "STUDY", sub: "understand", x: 262 },
  { name: "COMMIT", sub: "decide, act", x: 393, human: true },
  { name: "OWN", sub: "be accountable", x: 485, human: true },
];

// SVG <text> honors `fill`, not `color` — set fill directly so the green
// stage names match the brightness of the green dots and zone labels.
const GREEN = { fill: "var(--prose-dartmouth)" } as const;

export function InformationSpectrum() {
  return (
    <figure className="not-prose my-8">
      <svg
        viewBox="0 0 560 210"
        width="100%"
        role="img"
        aria-label="A spectrum of information work. Gathering, processing, and studying sit on the automatable end that AI can handle; committing and owning sit on the irreducibly human end."
        className="block"
      >
        <title>The spectrum of information work</title>

        {/* End labels */}
        <text
          x="30"
          y="20"
          textAnchor="start"
          fontSize="11"
          className="font-mono fill-neutral-500 dark:fill-neutral-400"
        >
          &#8592; more automatable
        </text>
        <text
          x="530"
          y="20"
          textAnchor="end"
          fontSize="11"
          className="font-mono"
          style={{ fill: "var(--prose-dartmouth)" }}
        >
          irreducibly human &#8594;
        </text>

        {/* Zone brackets */}
        {/* left bracket: stages 1-3 */}
        <path
          d="M40 50 V44 H300 V50"
          fill="none"
          strokeWidth="1"
          className="stroke-neutral-300 dark:stroke-neutral-700"
        />
        <text
          x="170"
          y="38"
          textAnchor="middle"
          fontSize="11"
          className="font-mono fill-neutral-500 dark:fill-neutral-400"
        >
          AI can automate
        </text>
        {/* right bracket: stages 4-5 */}
        <path
          d="M360 50 V44 H520 V50"
          fill="none"
          strokeWidth="1"
          style={{ stroke: "var(--prose-dartmouth)" }}
          opacity="0.5"
        />
        <text
          x="440"
          y="38"
          textAnchor="middle"
          fontSize="11"
          className="font-mono"
          style={{ fill: "var(--prose-dartmouth)" }}
        >
          stays human
        </text>

        {/* Gradient spectrum bar */}
        <defs>
          <linearGradient id="spectrum-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="55%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="var(--prose-dartmouth)" />
          </linearGradient>
        </defs>
        <rect
          x="30"
          y="104"
          width="500"
          height="6"
          rx="3"
          fill="url(#spectrum-grad)"
          opacity="0.55"
        />

        {/* Divider between automatable and human */}
        <line
          x1="328"
          y1="58"
          x2="328"
          y2="168"
          strokeWidth="1"
          strokeDasharray="3 4"
          className="stroke-neutral-300 dark:stroke-neutral-700"
        />

        {/* Stage nodes + labels */}
        {STAGES.map((s) => (
          <g key={s.name}>
            <circle
              cx={s.x}
              cy={107}
              r={6}
              {...(s.human
                ? { style: { fill: "var(--prose-dartmouth)" } }
                : { className: "fill-neutral-400 dark:fill-neutral-500" })}
            />
            <text
              x={s.x}
              y={140}
              textAnchor="middle"
              fontSize="12"
              letterSpacing="0.5"
              className={
                s.human
                  ? "font-mono"
                  : "font-mono fill-neutral-700 dark:fill-neutral-200"
              }
              style={s.human ? GREEN : undefined}
            >
              {s.name}
            </text>
            <text
              x={s.x}
              y={156}
              textAnchor="middle"
              fontSize="9.5"
              className="font-mono fill-neutral-400 dark:fill-neutral-500"
            >
              {s.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="block w-full text-xs mt-3 font-mono text-gray-500 text-center leading-normal">
        Knowledge work spans a spectrum. Gathering, processing, and studying are
        the grunt work AI now does; committing and owning require human
        judgment and accountability.
      </figcaption>
    </figure>
  );
}
