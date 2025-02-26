// app/essays/interactive-grid.tsx
"use client";

import { InteractiveGridPattern } from "../../components/ui/interactive-grid-pattern";
import { cn } from "../../lib/utils";
import React from "react";

interface InteractiveGridProps {
    children: React.ReactNode;
  }
  

export function InteractiveGrid( {children}: InteractiveGridProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-left justify-center rounded-lg bg-background mb-2">
      
      <div className="relative z-20">  {/* Add this wrapper with z-10 */}
        {children}
      </div>

      <InteractiveGridPattern
        className={cn(
            "",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-primary/20 pointer-events-none"
      />
    </div>
  );
}