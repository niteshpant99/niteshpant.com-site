"use client";

import { useState } from "react";
import React from "react";

import { cn } from "../../lib/utils";

interface MeteorsProps extends React.HTMLAttributes<HTMLSpanElement> {
  number?: number;
}

// Generate meteor styles outside component to avoid impure function calls during render
function generateMeteorStyles(count: number): Array<React.CSSProperties> {
  return [...new Array(count)].map((_, index) => ({
    top: -5,
    // Use deterministic pseudo-random values based on index
    left: `${((index * 37) % 100)}%`,
    animationDelay: `${(((index * 13) % 10) / 10 + 0.2).toFixed(1)}s`,
    animationDuration: `${((index * 7) % 8) + 2}s`,
  }));
}

export const Meteors = ({ number = 20, ...props }: MeteorsProps) => {
  const [meteorStyles] = useState<Array<React.CSSProperties>>(() =>
    generateMeteorStyles(number)
  );

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
          )}
          style={style}
          {...props}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
};
