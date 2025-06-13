'use client';

import React from 'react';
import type { Connection } from '../../types/prompt-builder';

interface ConnectionLinesProps {
  connections: Connection[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export function ConnectionLines({ connections, containerRef }: ConnectionLinesProps) {
  if (!containerRef.current || connections.length === 0) {
    return null;
  }

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none z-0"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="hsl(var(--border))"
            opacity="0.6"
          />
        </marker>
      </defs>
      
      {connections.map((connection) => (
        <g key={connection.id}>
          {/* Main connection line */}
          <path
            d={`M ${connection.points[0].x} ${connection.points[0].y} 
                L ${connection.points[1].x} ${connection.points[1].y}`}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.6"
            markerEnd="url(#arrowhead)"
          />
          
          {/* Connection points */}
          <circle
            cx={connection.points[0].x}
            cy={connection.points[0].y}
            r="3"
            fill="hsl(var(--primary))"
            opacity="0.8"
          />
          <circle
            cx={connection.points[1].x}
            cy={connection.points[1].y}
            r="3"
            fill="hsl(var(--primary))"
            opacity="0.8"
          />
        </g>
      ))}
    </svg>
  );
} 