'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { analyzeContent } from '../lib/content-to-visual';
import { flowFields } from '../lib/flow-fields';
import { GenerativeHero } from '../lib/generative-hero';

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
  const heroRef = useRef<GenerativeHero | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    // Reset state
    setError(null);
    setIsReady(false);

    let hero: GenerativeHero | null = null;
    let visualParams: any = null;
    let flowField: any = null;

    try {
      // Get visual parameters and flow field
      visualParams = analyzeContent(title, summary, tags);
      flowField = flowFields[visualParams.flowField] || flowFields.spiral;
      
      console.log('Analyzed content:', { title, flowField: visualParams.flowField, density: visualParams.density });

      // Handle canvas sizing with proper initialization timing
      const initializeSystem = () => {
        try {
          // Get container dimensions
          const rect = container.getBoundingClientRect();
          
          if (rect.width === 0 || rect.height === 0) {
            console.warn('Container has no dimensions, retrying...');
            setTimeout(initializeSystem, 100);
            return;
          }

          // Set canvas size with device pixel ratio
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          console.log(`Canvas sized: ${canvas.width}x${canvas.height} (display: ${rect.width}x${rect.height})`);

          // Initialize hero system
          hero = new GenerativeHero(canvas);
          heroRef.current = hero;

          // Initialize particles
          hero.initializeParticles(visualParams);
          
          setIsReady(true);
          console.log('Generative hero system ready');

        } catch (err) {
          console.error('Failed to initialize generative hero:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      };

      // Handle window resize
      const handleResize = () => {
        if (!hero || !container) return;
        
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          hero.resize(canvas.width, canvas.height);
          
          // Re-initialize particles for new size
          hero.initializeParticles(visualParams);
        }
      };

      // Animation loop
      const startTime = performance.now();
      let lastTime = startTime;

      const animate = (currentTime: number) => {
        if (isPaused || !hero || !isReady) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        const deltaTime = Math.min((currentTime - lastTime) / 1000, 1/30); // Cap at 30fps minimum
        const time = (currentTime - startTime) / 1000;
        
        try {
          // Update and render
          hero.update(deltaTime, time, flowField, visualParams);
          hero.render(resolvedTheme === 'dark', time);
        } catch (err) {
          console.error('Animation error:', err);
          setError('Animation failed');
        }

        lastTime = currentTime;
        animationRef.current = requestAnimationFrame(animate);
      };

      // Start initialization
      initializeSystem();
      
      // Set up resize handler
      window.addEventListener('resize', handleResize);

      // Start animation loop
      animationRef.current = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (hero) {
          hero.dispose();
        }
        heroRef.current = null;
        setIsReady(false);
      };

    } catch (err) {
      console.error('Failed to initialize generative hero system:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize');
    }
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
        style={{ aspectRatio: '5/3' }}
        aria-hidden="true"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <div 
        className={`relative w-full overflow-hidden bg-background ${className} flex items-center justify-center`}
        style={{ aspectRatio: '5/3' }}
      >
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Unable to load visual</p>
          <p className="text-xs opacity-60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ aspectRatio: '5/3' }}
      role="img"
      aria-label={`Abstract generative art for "${title}"`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      {/* Loading state */}
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
        </div>
      )}
      
      {/* Pause/Play Control */}
      {isHovered && isReady && (
        <button
          onClick={togglePause}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110"
          aria-label={isPaused ? 'Play animation' : 'Pause animation'}
          title={isPaused ? 'Play animation' : 'Pause animation'}
        >
          {isPaused ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>
      )}
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && isReady && (
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground font-mono">
          {heroRef.current?.particles?.length || 0} particles
        </div>
      )}
      

    </div>
  );
} 