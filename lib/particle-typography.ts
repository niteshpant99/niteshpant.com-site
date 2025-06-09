/**
 * Particle Typography & Animation System
 * Creates recognizable text, symbols, and patterns using particles
 * with smooth choreographed animations between formations.
 */

import { VisualParams } from './content-to-visual';
import { extractKeywords, formatForDisplay, ExtractedKeywords } from './keyword-extraction';

export interface FormationPoint {
  x: number;
  y: number;
  size: number;
  importance: number; // 0-1, affects particle attraction strength
  layer: number;
}

export interface Formation {
  points: FormationPoint[];
  name: string;
  duration: number; // How long to stay in this formation (seconds)
}

export interface AnimationSequence {
  formations: Formation[];
  currentFormationIndex: number;
  nextFormationIndex: number;
  transitionProgress: number; // 0-1
  transitionDuration: number; // seconds
  timeInCurrentFormation: number;
  isInTextPhase: boolean; // Whether we're showing text (for stable display)
  extractedKeywords: ExtractedKeywords;
}

/**
 * Generate dense, artistic text points with multiple particles per position
 */
export function generateTextFormation(
  text: string, 
  x: number, 
  y: number, 
  fontSize: number = 60,
  maxWidth: number = 600
): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  // Enhanced character to point mapping with better readability
  const charMaps = getCharacterMaps();
  
  // Calculate text metrics for centering
  const estimatedWidth = text.length * fontSize * 0.6;
  let currentX = x - estimatedWidth * 0.5;
  const currentY = y;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    
    if (char === ' ') {
      currentX += fontSize * 0.4;
      continue;
    }
    
    const charPattern = charMaps[char] || charMaps['?']; // Fallback
    
    // Create multiple particles per character point for thickness and readability
    for (const point of charPattern) {
      const baseX = currentX + point.x * fontSize * 0.09;
      const baseY = currentY + point.y * fontSize * 0.09;
      
      // Main particle
      points.push({
        x: baseX,
        y: baseY,
        size: 3.5 + point.importance * 2, // Larger particles
        importance: 0.9, // High but not rigid
        layer: 1
      });
      
      // Add surrounding particles for thickness (making text bolder)
      const offsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Orthogonal
        [-1, -1], [1, 1], [-1, 1], [1, -1] // Diagonal
      ];
      
      for (const [dx, dy] of offsets) {
        // Only add some surrounding particles to avoid overcrowding
        if (Math.random() < 0.7) {
          points.push({
            x: baseX + dx * 2,
            y: baseY + dy * 2,
            size: 2.5 + point.importance,
            importance: 0.85, // Slightly less important than center
            layer: 1
          });
        }
      }
    }
    
    currentX += fontSize * 0.6; // Good character spacing
  }
  
  return points;
}

/**
 * Generate symbol formations based on content type
 */
export function generateSymbolFormation(
  symbol: string,
  centerX: number,
  centerY: number,
  size: number = 100
): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  switch (symbol) {
    case 'network':
      return createNetworkSymbol(centerX, centerY, size);
    case 'heart':
      return createHeartSymbol(centerX, centerY, size);
    case 'spiral':
      return createSpiralSymbol(centerX, centerY, size);
    case 'star':
      return createStarSymbol(centerX, centerY, size);
    case 'wave':
      return createWaveSymbol(centerX, centerY, size);
    default:
      return createCircleSymbol(centerX, centerY, size);
  }
}

/**
 * Create animation sequence based on essay content
 */
export function createAnimationSequence(
  title: string,
  tags: string,
  params: VisualParams,
  canvasWidth: number,
  canvasHeight: number
): AnimationSequence {
  const formations: Formation[] = [];
  const centerX = canvasWidth * 0.5;
  const centerY = canvasHeight * 0.5;
  
  // Extract meaningful keywords from the title
  const extractedKeywords = extractKeywords(title, tags.split(',').map(t => t.trim()));
  
  // Formation 1: Primary keyword
  const primaryKeyword = formatForDisplay(extractedKeywords.primary, title);
  formations.push({
    points: generateTextFormation(primaryKeyword, centerX, centerY - 20, 55, canvasWidth * 0.8),
    name: 'primary-text',
    duration: 5.0 // Longer display for readability
  });
  
  // Formation 2: Secondary keyword (if available)
  if (extractedKeywords.secondary) {
    const secondaryKeyword = formatForDisplay(extractedKeywords.secondary, title);
    formations.push({
      points: generateTextFormation(secondaryKeyword, centerX, centerY + 20, 45, canvasWidth * 0.8),
      name: 'secondary-text',
      duration: 4.5
    });
  }
  
  // Formation 3: Symbol based on content type
  const symbolType = getSymbolFromTags(tags);
  formations.push({
    points: generateSymbolFormation(symbolType, centerX, centerY, 90),
    name: symbolType,
    duration: 4.0
  });
  
  // Formation 4: Abstract pattern
  formations.push({
    points: createAbstractPattern(params, centerX, centerY, Math.min(canvasWidth, canvasHeight) * 0.3),
    name: 'pattern',
    duration: 5.0
  });
  
  // Formation 5: Organic movement
  formations.push({
    points: createOrganicFormation(centerX, centerY, Math.min(canvasWidth, canvasHeight) * 0.4),
    name: 'organic',
    duration: 6.0
  });
  
  return {
    formations,
    currentFormationIndex: 0,
    nextFormationIndex: 1,
    transitionProgress: 0,
    transitionDuration: 1.5, // Faster transitions for better flow
    timeInCurrentFormation: 0,
    isInTextPhase: true, // Start with text phase
    extractedKeywords
  };
}

/**
 * Update animation sequence
 */
export function updateAnimationSequence(
  sequence: AnimationSequence,
  deltaTime: number
): AnimationSequence {
  const updated = { ...sequence };
  
  updated.timeInCurrentFormation += deltaTime;
  
  const currentFormation = updated.formations[updated.currentFormationIndex];
  
  // Update text phase status
  updated.isInTextPhase = currentFormation.name.includes('text');
  
  // Check if it's time to transition
  if (updated.timeInCurrentFormation >= currentFormation.duration) {
    // Start transition to next formation
    if (updated.transitionProgress === 0) {
      updated.nextFormationIndex = (updated.currentFormationIndex + 1) % updated.formations.length;
    }
    
    updated.transitionProgress += deltaTime / updated.transitionDuration;
    
    // Complete transition
    if (updated.transitionProgress >= 1) {
      updated.currentFormationIndex = updated.nextFormationIndex;
      updated.nextFormationIndex = (updated.currentFormationIndex + 1) % updated.formations.length;
      updated.transitionProgress = 0;
      updated.timeInCurrentFormation = 0;
      
      // Update text phase for new formation
      const newFormation = updated.formations[updated.currentFormationIndex];
      updated.isInTextPhase = newFormation.name.includes('text');
    }
  }
  
  return updated;
}

/**
 * Get target position for a particle based on current animation state
 */
export function getTargetPosition(
  particleIndex: number,
  sequence: AnimationSequence,
  totalParticles: number
): { x: number; y: number; importance: number } {
  const currentFormation = sequence.formations[sequence.currentFormationIndex];
  const nextFormation = sequence.formations[sequence.nextFormationIndex];
  
  // Assign particle to formation point
  const currentPoint = getFormationPointForParticle(particleIndex, currentFormation, totalParticles);
  const nextPoint = getFormationPointForParticle(particleIndex, nextFormation, totalParticles);
  
  // Interpolate between current and next position
  const t = easeInOutCubic(sequence.transitionProgress);
  
  return {
    x: currentPoint.x + (nextPoint.x - currentPoint.x) * t,
    y: currentPoint.y + (nextPoint.y - currentPoint.y) * t,
    importance: currentPoint.importance + (nextPoint.importance - currentPoint.importance) * t
  };
}

/**
 * Assign formation point to particle (with some randomness for organic feel)
 */
function getFormationPointForParticle(
  particleIndex: number, 
  formation: Formation, 
  totalParticles: number
): FormationPoint {
  if (formation.points.length === 0) {
    return { x: 0, y: 0, size: 2, importance: 0.5, layer: 1 };
  }
  
  // Distribute particles across formation points
  const pointIndex = Math.floor((particleIndex / totalParticles) * formation.points.length);
  const basePoint = formation.points[Math.min(pointIndex, formation.points.length - 1)];
  
  // Add some jitter for organic feel
  const jitterAmount = 15;
  const jitterX = (Math.sin(particleIndex * 0.1) * 0.5 + 0.5) * jitterAmount - jitterAmount * 0.5;
  const jitterY = (Math.cos(particleIndex * 0.1) * 0.5 + 0.5) * jitterAmount - jitterAmount * 0.5;
  
  return {
    x: basePoint.x + jitterX,
    y: basePoint.y + jitterY,
    size: basePoint.size,
    importance: basePoint.importance,
    layer: basePoint.layer
  };
}

/**
 * Smooth easing function
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Determine symbol type from tags
 */
function getSymbolFromTags(tags: string): string {
  const tagLower = tags.toLowerCase();
  
  if (tagLower.includes('ai') || tagLower.includes('technical') || tagLower.includes('code')) {
    return 'network';
  }
  if (tagLower.includes('personal') || tagLower.includes('life') || tagLower.includes('heart')) {
    return 'heart';
  }
  if (tagLower.includes('philosophy') || tagLower.includes('thoughts')) {
    return 'spiral';
  }
  if (tagLower.includes('success') || tagLower.includes('achievement') || tagLower.includes('goal')) {
    return 'star';
  }
  if (tagLower.includes('flow') || tagLower.includes('process') || tagLower.includes('change')) {
    return 'wave';
  }
  
  return 'spiral'; // Default
}

// Helper functions for creating specific symbols and patterns...

function createNetworkSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  // Create a hexagonal network pattern
  const layers = 3;
  for (let layer = 0; layer < layers; layer++) {
    const radius = (layer + 1) * size * 0.3;
    const nodesInLayer = (layer + 1) * 6;
    
    for (let i = 0; i < nodesInLayer; i++) {
      const angle = (i / nodesInLayer) * Math.PI * 2;
      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: 3 + (3 - layer),
        importance: 1 - layer * 0.2,
        layer: layer + 1
      });
    }
  }
  
  return points;
}

function createHeartSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  for (let t = 0; t <= Math.PI * 2; t += 0.1) {
    const scale = size * 0.02;
    const x = centerX + scale * (16 * Math.pow(Math.sin(t), 3));
    const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    
    points.push({
      x,
      y,
      size: 2 + Math.random() * 2,
      importance: 0.8 + Math.random() * 0.2,
      layer: 1
    });
  }
  
  return points;
}

function createSpiralSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  for (let i = 0; i < 80; i++) {
    const angle = i * 0.3;
    const radius = (i / 80) * size;
    
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      size: 2 + (1 - i / 80) * 2,
      importance: 1 - i / 80,
      layer: 1
    });
  }
  
  return points;
}

function createStarSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  const numPoints = 5;
  const outerRadius = size;
  const innerRadius = size * 0.4;
  
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    
    // Add multiple points along each edge for density
    for (let j = 0; j <= 5; j++) {
      const nextAngle = ((i + 1) * Math.PI) / numPoints;
      const nextRadius = (i + 1) % 2 === 0 ? outerRadius : innerRadius;
      
      const t = j / 5;
      const currentX = centerX + Math.cos(angle) * radius;
      const currentY = centerY + Math.sin(angle) * radius;
      const nextX = centerX + Math.cos(nextAngle) * nextRadius;
      const nextY = centerY + Math.sin(nextAngle) * nextRadius;
      
      points.push({
        x: currentX + (nextX - currentX) * t,
        y: currentY + (nextY - currentY) * t,
        size: 2 + Math.random() * 2,
        importance: 0.8,
        layer: 1
      });
    }
  }
  
  return points;
}

function createWaveSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  for (let x = -size; x <= size; x += 8) {
    const y1 = centerY + Math.sin(x * 0.02) * size * 0.3;
    const y2 = centerY + Math.sin(x * 0.02 + Math.PI) * size * 0.3;
    
    points.push(
      {
        x: centerX + x,
        y: y1,
        size: 2 + Math.random(),
        importance: 0.7,
        layer: 1
      },
      {
        x: centerX + x,
        y: y2,
        size: 2 + Math.random(),
        importance: 0.7,
        layer: 1
      }
    );
  }
  
  return points;
}

function createCircleSymbol(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    points.push({
      x: centerX + Math.cos(angle) * size,
      y: centerY + Math.sin(angle) * size,
      size: 2 + Math.random(),
      importance: 0.8,
      layer: 1
    });
  }
  
  return points;
}

function createAbstractPattern(params: VisualParams, centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  // Create a pattern based on the visual parameters
  const complexity = Math.floor(params.flowComplexity * 5) + 3;
  
  for (let i = 0; i < complexity; i++) {
    const angle = (i / complexity) * Math.PI * 2;
    const layerRadius = size * (0.3 + 0.7 * params.symmetry);
    
    for (let j = 0; j < 15; j++) {
      const subAngle = angle + (j / 15) * Math.PI * 0.5;
      const radius = layerRadius * (0.5 + 0.5 * Math.sin(j * 0.4));
      
      points.push({
        x: centerX + Math.cos(subAngle) * radius,
        y: centerY + Math.sin(subAngle) * radius,
        size: 1 + params.density * 2,
        importance: 0.6,
        layer: 1
      });
    }
  }
  
  return points;
}

function createOrganicFormation(centerX: number, centerY: number, size: number): FormationPoint[] {
  const points: FormationPoint[] = [];
  
  // Create organic, flowing points
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * size;
    const jitter = (Math.random() - 0.5) * 40;
    
    points.push({
      x: centerX + Math.cos(angle) * radius + jitter,
      y: centerY + Math.sin(angle) * radius + jitter,
      size: 1 + Math.random() * 3,
      importance: Math.random() * 0.5 + 0.3,
      layer: 1
    });
  }
  
  return points;
}

/**
 * Enhanced character point mappings for better readability
 */
function getCharacterMaps(): Record<string, FormationPoint[]> {
  const createChar = (pattern: number[][]): FormationPoint[] => {
    return pattern.map(([x, y, importance = 0.8]) => ({
      x, y, 
      size: 2, 
      importance: importance,
      layer: 1
    }));
  };

  return {
    'a': createChar([[1,0,1], [0,1], [2,1], [0,2], [1,2], [2,2], [0,3], [2,3], [0,4], [2,4]]),
    'b': createChar([[0,0,1], [1,0], [0,1], [2,1], [0,2], [1,2], [0,3], [2,3], [0,4], [1,4]]),
    'c': createChar([[1,0,1], [2,0], [0,1], [0,2], [0,3], [1,4], [2,4]]),
    'd': createChar([[0,0,1], [1,0], [0,1], [2,1], [0,2], [2,2], [0,3], [2,3], [0,4], [1,4]]),
    'e': createChar([[0,0,1], [1,0], [2,0], [0,1], [0,2], [1,2], [0,3], [0,4], [1,4], [2,4]]),
    'f': createChar([[0,0,1], [1,0], [2,0], [0,1], [0,2], [1,2], [0,3], [0,4]]),
    'g': createChar([[1,0,1], [2,0], [0,1], [0,2], [1,2], [2,2], [0,3], [2,3], [1,4], [2,4]]),
    'h': createChar([[0,0,1], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2], [0,3], [2,3], [0,4], [2,4]]),
    'i': createChar([[0,0,1], [1,0], [2,0], [1,1], [1,2], [1,3], [0,4], [1,4], [2,4]]),
    'j': createChar([[2,0,1], [2,1], [2,2], [0,3], [2,3], [1,4]]),
    'k': createChar([[0,0,1], [2,0], [0,1], [1,1], [0,2], [0,3], [1,3], [0,4], [2,4]]),
    'l': createChar([[0,0,1], [0,1], [0,2], [0,3], [0,4], [1,4], [2,4]]),
    'm': createChar([[0,0,1], [2,0], [0,1], [1,1], [2,1], [0,2], [2,2], [0,3], [2,3], [0,4], [2,4]]),
    'n': createChar([[0,0,1], [2,0], [0,1], [1,1], [2,1], [0,2], [2,2], [0,3], [2,3], [0,4], [2,4]]),
    'o': createChar([[1,0,1], [0,1], [2,1], [0,2], [2,2], [0,3], [2,3], [1,4]]),
    'p': createChar([[0,0,1], [1,0], [0,1], [2,1], [0,2], [1,2], [0,3], [0,4]]),
    'q': createChar([[1,0,1], [0,1], [2,1], [0,2], [2,2], [0,3], [1,3], [2,3], [1,4], [2,4]]),
    'r': createChar([[0,0,1], [1,0], [0,1], [2,1], [0,2], [1,2], [0,3], [2,3], [0,4], [2,4]]),
    's': createChar([[1,0,1], [2,0], [0,1], [1,2], [2,3], [0,4], [1,4]]),
    't': createChar([[0,0,1], [1,0], [2,0], [1,1], [1,2], [1,3], [1,4]]),
    'u': createChar([[0,0,1], [2,0], [0,1], [2,1], [0,2], [2,2], [0,3], [2,3], [1,4]]),
    'v': createChar([[0,0,1], [2,0], [0,1], [2,1], [0,2], [2,2], [1,3]]),
    'w': createChar([[0,0,1], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2], [0,3], [2,3], [1,4]]),
    'x': createChar([[0,0,1], [2,0], [1,1], [0,2], [2,2], [1,3], [0,4], [2,4]]),
    'y': createChar([[0,0,1], [2,0], [1,1], [1,2], [1,3], [1,4]]),
    'z': createChar([[0,0,1], [1,0], [2,0], [1,1], [0,2], [0,3], [1,4], [2,4]]),
    
    // Numbers
    '0': createChar([[1,0,1], [0,1], [2,1], [0,2], [2,2], [0,3], [2,3], [1,4]]),
    '1': createChar([[1,0,1], [1,1], [1,2], [1,3], [1,4]]),
    '2': createChar([[0,0,1], [1,0], [2,0], [2,1], [1,2], [0,3], [0,4], [1,4], [2,4]]),
    '3': createChar([[0,0,1], [1,0], [2,0], [2,1], [1,2], [2,3], [0,4], [1,4], [2,4]]),
    '4': createChar([[0,0,1], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2], [2,3], [2,4]]),
    '5': createChar([[0,0,1], [1,0], [2,0], [0,1], [0,2], [1,2], [2,3], [0,4], [1,4]]),
    
    // Fallback
    '?': createChar([[1,0,1], [0,1], [2,1], [1,2], [1,4]])
  };
} 