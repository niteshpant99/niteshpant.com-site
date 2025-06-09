/**
 * Simple WebGL Particle Renderer
 * Efficient rendering of thousands of particles using WebGL
 * without the complexity of full Phase 2 optimizations.
 */

import { VisualParams } from './content-to-visual';
import { FlowFieldFunction } from './flow-fields';
import { 
  createAnimationSequence, 
  updateAnimationSequence, 
  getTargetPosition,
  AnimationSequence 
} from './particle-typography';
import { 
  generateTextConnections, 
  addTextParticleTrails,
  TextParticle,
  TextConnection
} from './text-artistic-effects';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  layer: number;
}

export class SimpleWebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private particles: Particle[] = [];
  
  // Animation sequence system
  private animationSequence: AnimationSequence | null = null;
  
  // Artistic effects for text
  private textConnections: TextConnection[] = [];
  private connectionProgram: WebGLProgram | null = null;
  
  // WebGL buffers and attributes
  private positionBuffer: WebGLBuffer | null = null;
  private sizeBuffer: WebGLBuffer | null = null;
  private alphaBuffer: WebGLBuffer | null = null;
  
  // Shader attribute/uniform locations
  private positionLocation: number = -1;
  private sizeLocation: number = -1;
  private alphaLocation: number = -1;
  private resolutionLocation: WebGLUniformLocation | null = null;
  private colorLocation: WebGLUniformLocation | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initialize();
  }

  private initialize(): boolean {
    // Get WebGL context
    this.gl = this.canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    });

    if (!this.gl) {
      console.warn('WebGL not supported, falling back to Canvas 2D');
      return false;
    }

    // Create and compile shaders
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, `
      attribute vec2 a_position;
      attribute float a_size;
      attribute float a_alpha;
      
      uniform vec2 u_resolution;
      
      varying float v_alpha;
      
      void main() {
        // Convert from pixels to clip space
        vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        gl_PointSize = a_size;
        v_alpha = a_alpha;
      }
    `);

    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, `
      precision mediump float;
      
      uniform vec3 u_color;
      varying float v_alpha;
      
      void main() {
        // Create circular particle
        vec2 coord = gl_PointCoord - vec2(0.5);
        float distance = length(coord);
        
        if (distance > 0.5) {
          discard;
        }
        
        // Smooth edges
        float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
        alpha *= v_alpha;
        
        gl_FragColor = vec4(u_color, alpha);
      }
    `);

    if (!vertexShader || !fragmentShader) {
      return false;
    }

    // Create particle program
    this.program = this.createProgram(vertexShader, fragmentShader);
    if (!this.program) {
      return false;
    }



    // Get attribute and uniform locations
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.sizeLocation = this.gl.getAttribLocation(this.program, 'a_size');
    this.alphaLocation = this.gl.getAttribLocation(this.program, 'a_alpha');
    this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');

    // Create buffers
    this.positionBuffer = this.gl.createBuffer();
    this.sizeBuffer = this.gl.createBuffer();
    this.alphaBuffer = this.gl.createBuffer();

    // Enable blending for alpha
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    return true;
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    if (!this.gl) return null;

    const program = this.gl.createProgram();
    if (!program) return null;

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program linking error:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  initializeParticles(params: VisualParams, title: string, summary: string, tags: string): void {
    const maxParticles = Math.floor(params.density * 800 + 300); // 300-1100 particles for typography
    this.particles = [];

    // Create animation sequence for this content
    this.animationSequence = createAnimationSequence(
      title,
      tags,
      params,
      this.canvas.width,
      this.canvas.height
    );

    for (let i = 0; i < maxParticles; i++) {
      this.particles.push(this.createParticle(params));
    }
  }

  private createParticle(params: VisualParams): Particle {
    let x, y;
    
    // Use a mixed spawning strategy to ensure better distribution
    const spawnStrategy = Math.random();
    
    if (spawnStrategy < 0.4) {
      // 40% spawn in center area
      const centerRadius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * centerRadius;
      x = this.canvas.width * 0.5 + Math.cos(angle) * radius;
      y = this.canvas.height * 0.5 + Math.sin(angle) * radius;
    } else if (spawnStrategy < 0.7) {
      // 30% spawn in middle ring
      const minRadius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
      const maxRadius = Math.min(this.canvas.width, this.canvas.height) * 0.5;
      const angle = Math.random() * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      x = this.canvas.width * 0.5 + Math.cos(angle) * radius;
      y = this.canvas.height * 0.5 + Math.sin(angle) * radius;
    } else {
      // 30% spawn from edges or outer areas
      const edge = Math.floor(Math.random() * 4);
      switch (edge) {
        case 0: // top
          x = Math.random() * this.canvas.width;
          y = -10;
          break;
        case 1: // right
          x = this.canvas.width + 10;
          y = Math.random() * this.canvas.height;
          break;
        case 2: // bottom
          x = Math.random() * this.canvas.width;
          y = this.canvas.height + 10;
          break;
        default: // left
          x = -10;
          y = Math.random() * this.canvas.height;
      }
    }

    const [minSize, maxSize] = params.particleSizeRange;
    const size = minSize + Math.random() * (maxSize - minSize);
    const maxLife = 5 + Math.random() * 10; // 5-15 seconds (longer for more stability)
    const layer = Math.floor(Math.random() * params.layers) + 1;

    return {
      x,
      y,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife,
      size,
      layer
    };
  }

  update(
    flowField: FlowFieldFunction,
    time: number,
    params: VisualParams,
    deltaTime: number
  ): void {
    const canvas = this.canvas;
    
    // Update animation sequence
    if (this.animationSequence) {
      this.animationSequence = updateAnimationSequence(this.animationSequence, deltaTime);
      
      // Generate artistic effects for text phases
      if (this.animationSequence.isInTextPhase) {
        const textParticles: TextParticle[] = this.particles
          .filter(p => p.life < p.maxLife) // Only alive particles
          .map(p => ({
            x: p.x,
            y: p.y,
            size: p.size,
            importance: 0.9, // Assume text importance for active particles
            vx: p.vx,
            vy: p.vy,
            life: p.life
          }));
        
        // Generate subtle connections between text particles
        this.textConnections = generateTextConnections(
          textParticles, 
          this.animationSequence.isInTextPhase,
          30 // Limit connections for performance
        );
        
        // Add trail particles for artistic effect
        const trailParticles = addTextParticleTrails(
          textParticles, 
          this.animationSequence.isInTextPhase, 
          time
        );
        
        // Temporarily add trail particles to main particle array for rendering
        // (They'll be removed naturally as they have short lifespans)
        for (const trail of trailParticles.slice(0, 20)) { // Limit for performance
          if (this.particles.length < 1200) { // Don't exceed reasonable limits
            this.particles.push({
              x: trail.x,
              y: trail.y,
              vx: trail.vx,
              vy: trail.vy,
              life: 0,
              maxLife: 0.5, // Short-lived trail particles
              size: trail.size,
              layer: 1
            });
          }
        }
      } else {
        this.textConnections = []; // Clear connections when not in text phase
      }
    }
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update life
      particle.life += deltaTime;
      
      // Remove dead particles
      if (particle.life > particle.maxLife) {
        this.particles[i] = this.createParticle(params);
        continue;
      }
      
      // Get flow field velocity
      const flow = flowField(
        particle.x, 
        particle.y, 
        time, 
        params, 
        canvas.width, 
        canvas.height
      );
      
      // Get target position from animation sequence
      let targetX = particle.x;
      let targetY = particle.y;
      let importance = 0.5;
      let isInTextPhase = false;
      
      if (this.animationSequence) {
        const target = getTargetPosition(i, this.animationSequence, this.particles.length);
        targetX = target.x;
        targetY = target.y;
        importance = target.importance;
        isInTextPhase = this.animationSequence.isInTextPhase;
      }
      
      // Calculate attraction force toward target position
      const dx = targetX - particle.x;
      const dy = targetY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Stronger attraction during text phases for stability
      const baseStrength = isInTextPhase ? 0.025 : 0.012;
      const attractionStrength = importance * baseStrength;
      
      const attraction = distance > 1 ? {
        vx: (dx / distance) * attractionStrength * Math.min(distance, 120),
        vy: (dy / distance) * attractionStrength * Math.min(distance, 120)
      } : { vx: 0, vy: 0 };
      
      // Balance artistic flow with text readability
      // Text phases: still artistic but with stronger attraction
      // Other phases: more organic movement
      const flowInfluence = isInTextPhase ? 0.15 : 0.3; // More flow even during text
      const formationInfluence = isInTextPhase ? 0.85 : 0.7;
      
      // Add subtle breathing effect during text phases
      let breathingEffect = { vx: 0, vy: 0 };
      if (isInTextPhase) {
        const breathingIntensity = 0.002;
        const breathingSpeed = time * 0.8; // Slow breathing
        breathingEffect = {
          vx: Math.sin(breathingSpeed + particle.x * 0.01) * breathingIntensity,
          vy: Math.cos(breathingSpeed + particle.y * 0.01) * breathingIntensity
        };
      }
      
      // Combine flow field, attraction forces, and breathing
      const combinedVx = flow.vx * flowInfluence + attraction.vx * formationInfluence + breathingEffect.vx;
      const combinedVy = flow.vy * flowInfluence + attraction.vy * formationInfluence + breathingEffect.vy;
      
      // Apply forces with damping - reduced intensity for gentler movement
      const damping = 0.99;
      particle.vx = particle.vx * damping + combinedVx * 0.08;
      particle.vy = particle.vy * damping + combinedVy * 0.08;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary behavior - wrap around
      if (particle.x < -50) particle.x = canvas.width + 50;
      if (particle.x > canvas.width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = canvas.height + 50;
      if (particle.y > canvas.height + 50) particle.y = -50;
    }


  }

  render(isDarkMode: boolean): void {
    if (!this.gl || !this.program) return;

    const gl = this.gl;
    
    // Set viewport
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    
    // Clear canvas using design system colors
    // Light mode: --background: 0 0% 100% (white)
    // Dark mode: --background: 173, 40%, 4% (dark teal)
    const bgColor = isDarkMode 
      ? [0.027, 0.056, 0.051, 1] as const  // hsl(173, 40%, 4%) converted to RGB
      : [1, 1, 1, 1] as const;             // hsl(0, 0%, 100%) = white
    gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use shader program
    gl.useProgram(this.program);
    
    // Set uniforms
    gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
    
    // Particle colors using design system foreground colors
    // Light mode: --foreground: 0 0% 3.9% (very dark)
    // Dark mode: --foreground: 0 0% 98% (very light)
    const particleColor = isDarkMode 
      ? [0.98, 0.98, 0.98] as const       // hsl(0, 0%, 98%) = very light
      : [0.039, 0.039, 0.039] as const;   // hsl(0, 0%, 3.9%) = very dark
    gl.uniform3f(this.colorLocation, particleColor[0], particleColor[1], particleColor[2]);
    
    // Prepare data arrays
    const positions = new Float32Array(this.particles.length * 2);
    const sizes = new Float32Array(this.particles.length);
    const alphas = new Float32Array(this.particles.length);
    
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      positions[i * 2] = particle.x;
      positions[i * 2 + 1] = particle.y;
      
      sizes[i] = particle.size;
      
      // Calculate alpha based on life cycle
      const lifeRatio = particle.life / particle.maxLife;
      let alpha = 1;
      
      // Fade in
      if (lifeRatio < 0.1) {
        alpha = lifeRatio / 0.1;
      }
      // Fade out
      else if (lifeRatio > 0.8) {
        alpha = (1 - lifeRatio) / 0.2;
      }
      
      // Layer-based alpha
      alpha *= (particle.layer / 3) * 0.6 + 0.4;
      
      alphas[i] = alpha;
    }
    
    // Upload position data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Upload size data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.sizeLocation);
    gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, 0, 0);
    
    // Upload alpha data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.alphaLocation);
    gl.vertexAttribPointer(this.alphaLocation, 1, gl.FLOAT, false, 0, 0);
    
    // Draw particles
    gl.drawArrays(gl.POINTS, 0, this.particles.length);
    
    // Draw text connections using simple line rendering
    this.renderTextConnections(gl, isDarkMode);
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    
    if (this.gl) {
      this.gl.viewport(0, 0, width, height);
    }
  }

  private renderTextConnections(gl: WebGLRenderingContext, isDarkMode: boolean): void {
    if (this.textConnections.length === 0) return;
    
    // Simple line rendering using HTML5 Canvas overlay approach
    // For now, we'll just enhance particle density along connection lines
    // This is a performance-friendly approach that maintains the artistic effect
    
    const connectionParticles: { x: number; y: number; alpha: number }[] = [];
    
    for (const connection of this.textConnections) {
      const steps = Math.floor(Math.sqrt(
        (connection.x2 - connection.x1) ** 2 + (connection.y2 - connection.y1) ** 2
      ) / 5); // One particle every 5 pixels
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        connectionParticles.push({
          x: connection.x1 + (connection.x2 - connection.x1) * t,
          y: connection.y1 + (connection.y2 - connection.y1) * t,
          alpha: connection.alpha * (1 - Math.abs(t - 0.5) * 0.5) // Fade towards ends
        });
      }
    }
    
    if (connectionParticles.length === 0) return;
    
    // Render connection particles using existing shader
    const positions = new Float32Array(connectionParticles.length * 2);
    const sizes = new Float32Array(connectionParticles.length);
    const alphas = new Float32Array(connectionParticles.length);
    
    for (let i = 0; i < connectionParticles.length; i++) {
      const cp = connectionParticles[i];
      positions[i * 2] = cp.x;
      positions[i * 2 + 1] = cp.y;
      sizes[i] = 1.5; // Small connection particles
      alphas[i] = cp.alpha;
    }
    
    // Upload and render connection particles
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.alphaLocation, 1, gl.FLOAT, false, 0, 0);
    
    // Draw connection particles with reduced alpha
    const prevColor = isDarkMode ? [0.98, 0.98, 0.98] : [0.039, 0.039, 0.039];
    gl.uniform3f(this.colorLocation, prevColor[0] * 0.5, prevColor[1] * 0.5, prevColor[2] * 0.5);
    
    gl.drawArrays(gl.POINTS, 0, connectionParticles.length);
    
    // Restore original color
    gl.uniform3f(this.colorLocation, prevColor[0], prevColor[1], prevColor[2]);
  }

  dispose(): void {
    if (this.gl) {
      if (this.program) this.gl.deleteProgram(this.program);
      if (this.connectionProgram) this.gl.deleteProgram(this.connectionProgram);
      
      if (this.positionBuffer) this.gl.deleteBuffer(this.positionBuffer);
      if (this.sizeBuffer) this.gl.deleteBuffer(this.sizeBuffer);
      if (this.alphaBuffer) this.gl.deleteBuffer(this.alphaBuffer);
    }
  }

  static isSupported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl');
    } catch {
      return false;
    }
  }
} 