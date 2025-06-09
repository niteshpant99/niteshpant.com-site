'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { analyzeContent, VisualParams } from '../lib/content-to-visual';
import { flowFields } from '../lib/flow-fields';
import { SimpleWebGLRenderer } from '../lib/simple-webgl-renderer';

interface GenerativeEssayHeroProps {
  title: string;
  summary: string;
  tags: string;
  className?: string;
}

export default function GenerativeEssayHero({
  title,
  summary,
  tags,
  className = ''
}: GenerativeEssayHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<SimpleWebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const visualParamsRef = useRef<VisualParams | null>(null);
  
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Main initialization and animation loop
  useEffect(() => {
    if (!isClient || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Analyze content to get visual parameters
    visualParamsRef.current = analyzeContent(title, summary, tags);
    const visualParams = visualParamsRef.current;

    // Try WebGL first, fallback to Canvas2D if not supported
    const renderer = new SimpleWebGLRenderer(canvas);
    rendererRef.current = renderer;

    // Get the appropriate flow field
    const flowField = flowFields[visualParams.flowField] || flowFields.spiral;

    // Handle canvas sizing with device pixel ratio
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for performance
      const rect = container.getBoundingClientRect();
      
      // Set actual size in memory
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Ensure canvas CSS size matches
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Notify renderer of resize
      renderer.resize(canvas.width, canvas.height);
      
      // Reinitialize particles after resize
      renderer.initializeParticles(visualParams, title, summary, tags);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Performance monitoring
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let fps = 60;

    // Animation variables
    const startTime = performance.now();
    let lastTime = startTime;

    // Main animation loop
    const animate = (currentTime: number) => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      const time = (currentTime - startTime) / 1000;
      
      // Update FPS counter
      frameCount++;
      if (currentTime - lastFpsTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsTime = currentTime;
        
        // Performance warning
        if (fps < 30) {
          console.warn(`Generative hero performance: ${fps} FPS`);
        }
      }

      // Update particle system
      renderer.update(flowField, time, visualParams, deltaTime);
      
      // Render frame
      const isDarkMode = resolvedTheme === 'dark';
      renderer.render(isDarkMode);

      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, [isClient, title, summary, tags, resolvedTheme, isPaused]);

  // Handle manual pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Server-side render placeholder
  if (!isClient) {
    return (
      <div 
        className={`w-full bg-background ${className}`}
        style={{ aspectRatio: '4/3' }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ aspectRatio: '4/3' }}
      role="img"
      aria-label={`Abstract generative art for "${title}"`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Pause/Play Control */}
      {isHovered && (
        <button
          onClick={togglePause}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-sm transition-opacity hover:bg-black/30 dark:hover:bg-white/30"
          aria-label={isPaused ? 'Play animation' : 'Pause animation'}
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white dark:text-black">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white dark:text-black">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>
      )}
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10 pointer-events-none" />
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-xs text-black/50 dark:text-white/50 font-mono">
          {visualParamsRef.current?.flowField} formation | 
          {Math.round((visualParamsRef.current?.density || 0) * 800 + 300)} particles | Typography Animation
        </div>
      )}
    </div>
  );
} 