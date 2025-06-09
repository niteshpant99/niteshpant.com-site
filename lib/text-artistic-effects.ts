/**
 * Artistic effects for text phases
 * Adds visual flair while maintaining readability
 */

export interface TextParticle {
  x: number;
  y: number;
  size: number;
  importance: number;
  vx: number;
  vy: number;
  life: number;
}

export interface TextConnection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
  strength: number;
}

/**
 * Generate subtle connections between nearby text particles
 */
export function generateTextConnections(
  particles: TextParticle[],
  isInTextPhase: boolean,
  maxConnections: number = 50
): TextConnection[] {
  if (!isInTextPhase) return [];
  
  const connections: TextConnection[] = [];
  const maxDistance = 25; // Short connections for text clarity
  
  // Only connect high-importance particles (text particles)
  const textParticles = particles.filter(p => p.importance > 0.8);
  
  for (let i = 0; i < textParticles.length && connections.length < maxConnections; i++) {
    const p1 = textParticles[i];
    let connectionCount = 0;
    
    for (let j = i + 1; j < textParticles.length && connectionCount < 2; j++) {
      const p2 = textParticles[j];
      
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance && distance > 3) {
        // Calculate connection strength based on distance and particle importance
        const strength = (1 - distance / maxDistance) * Math.min(p1.importance, p2.importance);
        
        connections.push({
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          alpha: strength * 0.3, // Subtle connections
          strength
        });
        
        connectionCount++;
      }
    }
  }
  
  return connections;
}

/**
 * Add subtle particle trails for text particles
 */
export function addTextParticleTrails(
  particles: TextParticle[],
  isInTextPhase: boolean,
  time: number
): TextParticle[] {
  if (!isInTextPhase) return [];
  
  const trails: TextParticle[] = [];
  
  // Only create trails for important text particles that are moving
  for (const particle of particles) {
    if (particle.importance > 0.85) {
      const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      
      // Only add trails if particle is moving enough
      if (velocity > 0.1) {
        const trailLength = Math.min(velocity * 50, 15); // Scale trail with velocity
        
        // Create 2-3 trail particles behind the main particle
        for (let i = 1; i <= 3; i++) {
          const trailAlpha = (4 - i) / 4; // Fade out trail
          const trailDistance = (i / 3) * trailLength;
          
          // Calculate trail position opposite to velocity
          const normalizedVx = particle.vx / Math.max(velocity, 0.001);
          const normalizedVy = particle.vy / Math.max(velocity, 0.001);
          
          trails.push({
            x: particle.x - normalizedVx * trailDistance,
            y: particle.y - normalizedVy * trailDistance,
            size: particle.size * trailAlpha * 0.7,
            importance: particle.importance * trailAlpha,
            vx: particle.vx * 0.8,
            vy: particle.vy * 0.8,
            life: particle.life
          });
        }
      }
    }
  }
  
  return trails;
}

/**
 * Create glow effect around text particles
 */
export function addTextGlowEffect(
  particles: TextParticle[],
  isInTextPhase: boolean,
  time: number
): TextParticle[] {
  if (!isInTextPhase) return [];
  
  const glowParticles: TextParticle[] = [];
  
  for (const particle of particles) {
    if (particle.importance > 0.8) {
      // Create a gentle pulsing glow
      const pulseIntensity = 0.5 + 0.3 * Math.sin(time * 2 + particle.x * 0.01);
      
      // Add glow particles around the main particle
      const glowRadius = particle.size * 1.5;
      const glowParticleCount = 4;
      
      for (let i = 0; i < glowParticleCount; i++) {
        const angle = (i / glowParticleCount) * Math.PI * 2;
        const distance = glowRadius * (0.8 + 0.2 * Math.random());
        
        glowParticles.push({
          x: particle.x + Math.cos(angle) * distance,
          y: particle.y + Math.sin(angle) * distance,
          size: particle.size * 0.3,
          importance: 0.2 * pulseIntensity, // Low importance so they don't interfere
          vx: particle.vx * 0.5,
          vy: particle.vy * 0.5,
          life: particle.life
        });
      }
    }
  }
  
  return glowParticles;
}

/**
 * Create shader data for text connections rendering
 */
export function prepareConnectionRenderData(
  connections: TextConnection[]
): {
  positions: Float32Array;
  alphas: Float32Array;
  count: number;
} {
  const positions = new Float32Array(connections.length * 4); // x1, y1, x2, y2
  const alphas = new Float32Array(connections.length * 2); // alpha1, alpha2
  
  for (let i = 0; i < connections.length; i++) {
    const conn = connections[i];
    const baseIndex = i * 4;
    const alphaIndex = i * 2;
    
    positions[baseIndex] = conn.x1;
    positions[baseIndex + 1] = conn.y1;
    positions[baseIndex + 2] = conn.x2;
    positions[baseIndex + 3] = conn.y2;
    
    alphas[alphaIndex] = conn.alpha;
    alphas[alphaIndex + 1] = conn.alpha * 0.5; // Fade out towards end
  }
  
  return {
    positions,
    alphas,
    count: connections.length
  };
} 