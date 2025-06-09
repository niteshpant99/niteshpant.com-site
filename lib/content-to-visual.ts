/**
 * Content to Visual Parameter Mapping System
 * Analyzes essay content and generates deterministic visual parameters
 * for the generative art system.
 */

export interface VisualParams {
  // Unique identifier for deterministic generation
  seed: number;
  
  // Movement characteristics
  flowField: string;         // Type of mathematical flow field
  flowComplexity: number;    // 0-1: simple to complex patterns
  turbulence: number;        // 0-1: calm to chaotic movement
  rhythm: number;            // 0-1: slow to fast pulsing/breathing
  
  // Spatial characteristics  
  density: number;           // 0-1: few to many particles
  centerGravity: number;     // 0-1: dispersed to centralized
  symmetry: number;          // 0-1: asymmetric to symmetric
  
  // Visual characteristics
  layers: number;            // 1-3: depth layers
  particleSizeRange: [number, number]; // Min/max particle sizes
  fadeDistance: number;      // How particles fade in/out
}

/**
 * Tag to visual characteristic mappings
 * These define the base aesthetic for different content types
 */
const TAG_MAPPINGS = {
  // Technical/coding content
  'technical': { flowField: 'wave', symmetry: 0.8, flowComplexity: 0.6 },
  'code': { flowField: 'wave', symmetry: 0.9, flowComplexity: 0.7 },
  'ai': { flowField: 'fractal', symmetry: 0.6, flowComplexity: 0.9 },
  
  // Philosophical/thoughtful content
  'philosophy': { flowField: 'spiral', symmetry: 0.4, flowComplexity: 0.8 },
  'thoughts': { flowField: 'spiral', symmetry: 0.3, flowComplexity: 0.7 },
  'product': { flowField: 'organic', symmetry: 0.5, flowComplexity: 0.6 },
  
  // Personal/emotional content
  'personal': { flowField: 'organic', symmetry: 0.2, flowComplexity: 0.5 },
  'life': { flowField: 'organic', symmetry: 0.3, flowComplexity: 0.4 },
  'nitesh': { flowField: 'organic', symmetry: 0.4, flowComplexity: 0.5 },
  
  // Default fallback
  'default': { flowField: 'spiral', symmetry: 0.5, flowComplexity: 0.6 }
};

/**
 * Simple hash function for creating deterministic seeds
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Normalize a value to 0-1 range
 */
function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Analyze essay content and generate visual parameters
 */
export function analyzeContent(
  title: string,
  summary: string,
  tags: string,
  wordCount?: number
): VisualParams {
  // Step 1: Create deterministic seed from content
  const contentString = `${title}|${summary}|${tags}`;
  const seed = hashString(contentString);
  
  // Step 2: Parse and analyze tags
  const tagList = tags.toLowerCase().split(',').map(tag => tag.trim());
  const primaryTag = tagList[0] || 'default';
  
  // Get base characteristics from primary tag
  const baseMapping = TAG_MAPPINGS[primaryTag] || TAG_MAPPINGS['default'];
  
  // Step 3: Calculate quantitative parameters
  const estimatedWordCount = wordCount || summary.length * 4; // Rough estimate
  const tagCount = tagList.length;
  
  // Map word count to density (longer essays = more particles)
  const density = normalize(estimatedWordCount, 100, 2000) * 0.6 + 0.3; // 0.3 to 0.9
  
  // Map summary length to complexity (longer summaries = more complex topics)
  const flowComplexity = normalize(summary.length, 50, 300) * 0.4 + baseMapping.flowComplexity;
  
  // Map tag count to turbulence (more tags = more chaotic movement)
  const turbulence = normalize(tagCount, 1, 5) * 0.4 + 0.2; // 0.2 to 0.6
  
  // Step 4: Generate rhythm based on title characteristics
  const titleWords = title.split(' ').length;
  const rhythm = normalize(titleWords, 2, 8) * 0.3 + 0.4; // 0.4 to 0.7
  
  // Step 5: Calculate derived parameters
  const centerGravity = 1 - turbulence; // More turbulent = less centralized
  const layers = tagCount > 3 ? 3 : Math.max(1, tagCount);
  
  // Particle size based on density (fewer particles = larger sizes)
  const minSize = density > 0.7 ? 1 : 2;
  const maxSize = density > 0.7 ? 3 : 5;
  
  const fadeDistance = 0.6 + (flowComplexity * 0.3); // More complex = more fading
  
  return {
    seed,
    flowField: baseMapping.flowField,
    flowComplexity: Math.min(1, flowComplexity),
    turbulence: Math.min(1, turbulence),
    rhythm,
    density: Math.min(1, density),
    centerGravity: Math.min(1, centerGravity),
    symmetry: baseMapping.symmetry,
    layers,
    particleSizeRange: [minSize, maxSize],
    fadeDistance: Math.min(1, fadeDistance)
  };
} 