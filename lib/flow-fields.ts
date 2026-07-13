/**
 * Flow Field Mathematics System
 * Defines mathematical functions that create organic movement patterns
 * for particles in the generative art system.
 */

import { VisualParams } from './content-to-visual';

export type FlowFieldFunction = (
  x: number,
  y: number,
  time: number,
  params: VisualParams,
  canvasWidth: number,
  canvasHeight: number
) => { vx: number; vy: number };

/**
 * Seeded pseudo-random number generator for deterministic randomness
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

/**
 * Smooth noise function for organic patterns
 */
function smoothNoise(x: number, y: number, seed: number): number {
  const random = new SeededRandom(seed + Math.floor(x) * 123 + Math.floor(y) * 456);
  const intX = Math.floor(x);
  const intY = Math.floor(y);
  const fracX = x - intX;
  const fracY = y - intY;

  // Bilinear interpolation
  const a = random.next();
  random.next(); // advance for b
  const b = random.next();
  random.next(); // advance for c
  const c = random.next();
  random.next(); // advance for d
  const d = random.next();

  const i1 = a * (1 - fracX) + b * fracX;
  const i2 = c * (1 - fracX) + d * fracX;
  
  return i1 * (1 - fracY) + i2 * fracY;
}

export const flowFields: Record<string, FlowFieldFunction> = {
  /**
   * SPIRAL FLOW
   * Creates a spiraling inward/outward pattern
   * Good for philosophical, contemplative content
   */
  spiral: (x, y, time, params, canvasWidth, canvasHeight) => {
    const centerX = canvasWidth * 0.5;
    const centerY = canvasHeight * 0.5;
    
    // Distance and angle from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // Normalize distance for better control
    const maxDistance = Math.min(canvasWidth, canvasHeight) * 0.5;
    const normalizedDistance = distance / maxDistance;
    
    // Spiral parameters - reduced for gentler movement
    const spiralTightness = 0.001 + params.flowComplexity * 0.003;
    const rotationSpeed = 0.3 + params.rhythm * 1.0;
    
    // Create a balanced inward/outward flow based on distance
    const breathing = Math.sin(time * rotationSpeed + normalizedDistance * 2) * 0.4;
    let inwardSpeed;
    
    if (normalizedDistance < 0.3) {
      // Close to center - very gentle outward push to prevent clustering
      inwardSpeed = -0.05 + breathing * 0.1;
    } else if (normalizedDistance > 0.8) {
      // Far from center - stronger inward pull
      inwardSpeed = 0.15 + params.centerGravity * 0.2 + breathing * 0.05;
    } else {
      // Middle area - gentle spiral motion
      inwardSpeed = breathing * 0.08;
    }
    
    // Calculate spiral velocity
    const spiralAngle = angle + distance * spiralTightness + time * rotationSpeed * 0.5;
    
    // Reduce turbulence in center area
    const turbulenceStrength = params.turbulence * (0.5 + normalizedDistance * 0.5);
    const turbulenceX = (smoothNoise(x * 0.008, y * 0.008, params.seed) - 0.5) * turbulenceStrength;
    const turbulenceY = (smoothNoise(x * 0.008 + 100, y * 0.008, params.seed) - 0.5) * turbulenceStrength;
    
    // Rotational component
    const rotationalVelocity = 0.3 + params.flowComplexity * 0.2;
    
    return {
      vx: Math.cos(spiralAngle) * inwardSpeed + Math.cos(angle + Math.PI * 0.5) * rotationalVelocity + turbulenceX,
      vy: Math.sin(spiralAngle) * inwardSpeed + Math.sin(angle + Math.PI * 0.5) * rotationalVelocity + turbulenceY
    };
  },

  /**
   * WAVE FLOW
   * Creates undulating wave patterns
   * Good for technical, structured content
   */
  wave: (x, y, time, params, canvasWidth, canvasHeight) => {
    const waveFreq = 0.005 + params.flowComplexity * 0.01;
    const waveSpeed = 0.3 + params.rhythm * 1.5;
    
    // Multiple wave layers for complexity
    const wave1 = Math.sin(x * waveFreq + time * waveSpeed) * 0.5;
    const wave2 = Math.sin(y * waveFreq * 1.3 + time * waveSpeed * 0.8) * 0.3;
    const wave3 = Math.sin((x + y) * waveFreq * 0.7 + time * waveSpeed * 1.2) * 0.2;
    
    const combinedWave = wave1 + wave2 + wave3;
    
    // Symmetry influence
    const symmetryInfluence = params.symmetry;
    const asymmetricNoise = (1 - symmetryInfluence) * 
      (smoothNoise(x * 0.003, y * 0.003, params.seed) - 0.5);
    
    // Calculate velocity
    const baseVx = Math.cos(combinedWave + asymmetricNoise * 2) * 0.5;
    const baseVy = Math.sin(combinedWave + asymmetricNoise * 2) * 0.5;
    
    // Add turbulence
    const turbulenceX = (smoothNoise(x * 0.008, y * 0.008, params.seed) - 0.5) * params.turbulence;
    const turbulenceY = (smoothNoise(x * 0.008 + 200, y * 0.008, params.seed) - 0.5) * params.turbulence;
    
    return {
      vx: baseVx + turbulenceX,
      vy: baseVy + turbulenceY
    };
  },

  /**
   * ORGANIC BLOOM
   * Creates expanding/contracting circular patterns
   * Good for personal, emotional content
   */
  organic: (x, y, time, params, canvasWidth, canvasHeight) => {
    const centerX = canvasWidth * 0.5;
    const centerY = canvasHeight * 0.5;
    
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // Breathing pattern
    const breathingSpeed = 0.4 + params.rhythm * 1.2;
    const breathingIntensity = 0.3 + params.centerGravity * 0.7;
    const breathing = Math.sin(time * breathingSpeed) * breathingIntensity;
    
    // Organic distortion using multiple noise layers
    const organicNoise1 = smoothNoise(x * 0.003, y * 0.003, params.seed) - 0.5;
    const organicNoise2 = smoothNoise(x * 0.007, y * 0.007, params.seed + 1000) - 0.5;
    const organicDistortion = (organicNoise1 + organicNoise2 * 0.5) * params.flowComplexity;
    
    // Radial movement with breathing
    const radialVelocity = breathing + organicDistortion;
    
    // Rotational component for swirling effect
    const rotationalVelocity = organicNoise1 * 0.5 + params.turbulence * 0.3;
    
    // Calculate final velocity
    const vx = Math.cos(angle) * radialVelocity + Math.cos(angle + Math.PI * 0.5) * rotationalVelocity;
    const vy = Math.sin(angle) * radialVelocity + Math.sin(angle + Math.PI * 0.5) * rotationalVelocity;
    
    return { vx, vy };
  },

  /**
   * FRACTAL FLOW
   * Creates self-similar patterns at different scales
   * Good for AI, complex technical content
   */
  fractal: (x, y, time, params, canvasWidth, canvasHeight) => {
    let vx = 0;
    let vy = 0;
    
    // Multiple scales of noise for fractal effect
    const scales = [0.001, 0.003, 0.007, 0.015];
    const weights = [0.5, 0.3, 0.15, 0.05];
    
    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i] * (1 + params.flowComplexity);
      const weight = weights[i];
      
      const noiseX = smoothNoise(
        x * scale + time * 0.1 * (i + 1), 
        y * scale + time * 0.15 * (i + 1), 
        params.seed + i * 1000
      );
      const noiseY = smoothNoise(
        x * scale + time * 0.12 * (i + 1) + 500, 
        y * scale + time * 0.08 * (i + 1), 
        params.seed + i * 1000 + 500
      );
      
      vx += (noiseX - 0.5) * weight;
      vy += (noiseY - 0.5) * weight;
    }
    
    // Symmetry influence
    if (params.symmetry > 0.5) {
      const centerX = canvasWidth * 0.5;
      const centerY = canvasHeight * 0.5;
      const dx = x - centerX;
      const dy = y - centerY;
      const symmetryForce = (params.symmetry - 0.5) * 2;
      
      vx += -dx * 0.0001 * symmetryForce;
      vy += -dy * 0.0001 * symmetryForce;
    }
    
    // Apply rhythm as a global modulation
    const rhythmModulation = 1 + Math.sin(time * (params.rhythm * 2 + 0.5)) * 0.3;
    
    return {
      vx: vx * rhythmModulation,
      vy: vy * rhythmModulation
    };
  }
};

/**
 * Helper function to blend between flow fields
 * Allows smooth transitions or combinations
 */
export function blendFlowFields(
  field1: FlowFieldFunction,
  field2: FlowFieldFunction,
  blend: number // 0-1
): FlowFieldFunction {
  return (x, y, time, params, canvasWidth, canvasHeight) => {
    const v1 = field1(x, y, time, params, canvasWidth, canvasHeight);
    const v2 = field2(x, y, time, params, canvasWidth, canvasHeight);
    return {
      vx: v1.vx * (1 - blend) + v2.vx * blend,
      vy: v1.vy * (1 - blend) + v2.vy * blend
    };
  };
} 