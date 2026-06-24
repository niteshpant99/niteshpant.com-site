/**
 * Generative Hero System - Organic Abstract Art
 * Simplified and robust particle system creating living abstract expressionist compositions
 * Inspired by murmuration, flowing water, wind patterns, and natural phenomena
 */

import { VisualParams } from './content-to-visual';
import { FlowFieldFunction } from './flow-fields';

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
  layer: number;
  energy: number;
  phase: number;
}

export class GenerativeHero {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  public particles: Particle[] = [];
  
  // WebGL buffers
  private positionBuffer: WebGLBuffer | null = null;
  private sizeBuffer: WebGLBuffer | null = null;
  private alphaBuffer: WebGLBuffer | null = null;
  
  // Shader locations
  private positionLocation: number = -1;
  private sizeLocation: number = -1;
  private alphaLocation: number = -1;
  private resolutionLocation: WebGLUniformLocation | null = null;
  private timeLocation: WebGLUniformLocation | null = null;
  private colorLocation: WebGLUniformLocation | null = null;

  // Canvas 2D fallback
  private ctx: CanvasRenderingContext2D | null = null;
  private useWebGL = false;

  // Behavior properties
  private centerX: number = 0;
  private centerY: number = 0;
  private isInitialized = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    try {
      // Try WebGL first
      this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      
      if (this.gl && this.initializeWebGL()) {
        this.useWebGL = true;
        console.log('Using WebGL renderer');
      } else {
        throw new Error('WebGL failed to initialize');
      }
    } catch (error) {
      console.warn('WebGL not available, falling back to Canvas 2D:', error);
      // Fallback to Canvas 2D
      this.ctx = canvas.getContext('2d');
      this.useWebGL = false;
      
      if (!this.ctx) {
        throw new Error('Neither WebGL nor Canvas 2D is available');
      }
    }
    
    console.log('Generative Hero initialized');
  }

  private initializeWebGL(): boolean {
    if (!this.gl) return false;
    
    const gl = this.gl;

    try {
      // Simple, reliable vertex shader
      const vertexShaderSource = `
        attribute vec2 a_position;
        attribute float a_size;
        attribute float a_alpha;
        
        uniform vec2 u_resolution;
        uniform float u_time;
        
        varying float v_alpha;
        
        void main() {
          vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
          position.y *= -1.0;
          
          gl_Position = vec4(position, 0.0, 1.0);
          
          // Simple pulsing effect
          float pulse = 0.9 + 0.3 * sin(u_time * 2.0 + a_position.x * 0.01);
          gl_PointSize = a_size * pulse * 1.5;
          
          v_alpha = a_alpha;
        }
      `;

      // Simple, reliable fragment shader
      const fragmentShaderSource = `
        precision mediump float;
        
        uniform vec3 u_color;
        varying float v_alpha;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float distance = length(coord);
          
          if (distance > 0.5) discard;
          
          // Pure solid color with soft edge
          float alpha = (1.0 - smoothstep(0.3, 0.5, distance)) * v_alpha;
          gl_FragColor = vec4(u_color, alpha);
        }
      `;

      // Create and compile shaders
      const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      
      if (!vertexShader || !fragmentShader) {
        return false;
      }
      
      // Create program
      this.program = gl.createProgram();
      if (!this.program) return false;
      
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error('Shader program linking failed:', gl.getProgramInfoLog(this.program));
        return false;
      }

      // Get attribute locations
      this.positionLocation = gl.getAttribLocation(this.program, 'a_position');
      this.sizeLocation = gl.getAttribLocation(this.program, 'a_size');
      this.alphaLocation = gl.getAttribLocation(this.program, 'a_alpha');
      
      // Get uniform locations
      this.resolutionLocation = gl.getUniformLocation(this.program, 'u_resolution');
      this.timeLocation = gl.getUniformLocation(this.program, 'u_time');
      this.colorLocation = gl.getUniformLocation(this.program, 'u_color');

      // Create buffers
      this.positionBuffer = gl.createBuffer();
      this.sizeBuffer = gl.createBuffer();
      this.alphaBuffer = gl.createBuffer();
      
      if (!this.positionBuffer || !this.sizeBuffer || !this.alphaBuffer) {
        return false;
      }

      // Enable blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      return true;
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      return false;
    }
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  // Initialize particles with proper canvas dimensions
  initializeParticles(params: VisualParams): void {
    if (this.canvas.width === 0 || this.canvas.height === 0) {
      console.warn('Canvas has no dimensions, skipping particle initialization');
      return;
    }

    this.particles = [];
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.centerX = width * 0.5;
    this.centerY = height * 0.5;

    // Calculate particle count based on content and canvas size
    const baseCount = Math.min(1000, Math.max(200, (width * height) / 800));
    const densityMultiplier = 0.5 + params.density * 1.0;
    const particleCount = Math.floor(baseCount * densityMultiplier);

    console.log(`Initializing ${particleCount} particles for ${width}x${height} canvas`);

    // Spawn particles in organic distribution
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(Math.random() * 3);
      
      // Create spiral distribution from center
      const angle = (i / particleCount) * Math.PI * 4 + Math.random() * 0.5;
      const radius = Math.sqrt(Math.random()) * Math.min(width, height) * 0.3;
      
      let x = this.centerX + Math.cos(angle) * radius;
      let y = this.centerY + Math.sin(angle) * radius;
      
      // Add some organic randomness
      x += (Math.random() - 0.5) * 100;
      y += (Math.random() - 0.5) * 100;
      
      // Keep within bounds
      x = Math.max(10, Math.min(width - 10, x));
      y = Math.max(10, Math.min(height - 10, y));

      const particle: Particle = {
        x, y,
        prevX: x,
        prevY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 5,
        maxLife: 10 + Math.random() * 20,
        size: params.particleSizeRange[0] + Math.random() * (params.particleSizeRange[1] - params.particleSizeRange[0]),
        alpha: 0.3 + Math.random() * 0.5,
        layer,
        energy: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      };

      this.particles.push(particle);
    }

    this.isInitialized = true;
    console.log(`Initialized ${this.particles.length} particles`);
  }

  // Simplified update with organic movement
  update(deltaTime: number, time: number, flowField: FlowFieldFunction, params: VisualParams): void {
    if (!this.isInitialized || this.particles.length === 0) {
      return;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;
    
    if (width === 0 || height === 0) return;

    // Spawn new particles occasionally
    const targetCount = Math.min(800, this.particles.length);
    if (this.particles.length < targetCount && Math.random() < 0.02) {
      this.spawnNewParticle(params);
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      if (!particle) {
        this.particles.splice(i, 1);
        continue;
      }

      // Store previous position
      particle.prevX = particle.x;
      particle.prevY = particle.y;

      // Age particle
      particle.life += deltaTime;
      
      // Remove old particles
      if (particle.life > particle.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      // Apply flow field
      const flow = flowField(particle.x, particle.y, time, params, width, height);
      const flowStrength = 0.3 + params.turbulence * 0.4;
      
      particle.vx += flow.vx * flowStrength * deltaTime;
      particle.vy += flow.vy * flowStrength * deltaTime;

      // Apply gentle center attraction
      const centerDx = this.centerX - particle.x;
      const centerDy = this.centerY - particle.y;
      const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
      
      if (centerDistance > 0) {
        const centerForce = params.centerGravity * 0.00005;
        particle.vx += (centerDx / centerDistance) * centerForce;
        particle.vy += (centerDy / centerDistance) * centerForce;
      }

      // Damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Update position
      particle.x += particle.vx * deltaTime * 60;
      particle.y += particle.vy * deltaTime * 60;

      // Update visual properties
      const lifeRatio = particle.life / particle.maxLife;
      let lifeFade = 1;
      
      if (lifeRatio < 0.1) {
        lifeFade = lifeRatio / 0.1;
      } else if (lifeRatio > 0.9) {
        lifeFade = (1 - lifeRatio) / 0.1;
      }

      // Edge fading
      const margin = 60;
      const fadeX = Math.min(particle.x / margin, (width - particle.x) / margin, 1);
      const fadeY = Math.min(particle.y / margin, (height - particle.y) / margin, 1);
      const edgeFade = Math.min(fadeX, fadeY, 1);

      // Breathing effect
      const breathing = Math.sin(time * 0.8 + particle.phase) * 0.2 + 0.8;
      
      particle.alpha = (0.4 + particle.layer * 0.2) * lifeFade * edgeFade * breathing;
      particle.alpha = Math.max(0, Math.min(1, particle.alpha));
    }
  }

  private spawnNewParticle(params: VisualParams): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Spawn from edges
    let x, y;
    const side = Math.floor(Math.random() * 4);
    
    switch(side) {
      case 0: // Top
        x = Math.random() * width;
        y = -10;
        break;
      case 1: // Right
        x = width + 10;
        y = Math.random() * height;
        break;
      case 2: // Bottom
        x = Math.random() * width;
        y = height + 10;
        break;
      default: // Left
        x = -10;
        y = Math.random() * height;
        break;
    }

    const particle: Particle = {
      x, y,
      prevX: x,
      prevY: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 0,
      maxLife: 10 + Math.random() * 20,
      size: params.particleSizeRange[0] + Math.random() * (params.particleSizeRange[1] - params.particleSizeRange[0]),
      alpha: 0,
      layer: Math.floor(Math.random() * 3),
      energy: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2
    };

    this.particles.push(particle);
  }

  // Render with both WebGL and Canvas 2D support
  render(isDarkMode: boolean, time: number): void {
    if (!this.isInitialized || this.particles.length === 0) {
      return;
    }

    if (this.useWebGL && this.gl && this.program) {
      this.renderWebGL(isDarkMode, time);
    } else if (this.ctx) {
      this.renderCanvas2D(isDarkMode, time);
    }
  }

  private renderWebGL(isDarkMode: boolean, time: number): void {
    if (!this.gl || !this.program) return;
    
    const gl = this.gl;
    
    // Clear background
    const bgColor = isDarkMode ? [0.0, 0.0, 0.0, 1] : [1.0, 1.0, 1.0, 1];
    gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use program
    gl.useProgram(this.program);
    
    // Set uniforms
    if (this.resolutionLocation) {
      gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
    }
    if (this.timeLocation) {
      gl.uniform1f(this.timeLocation, time);
    }
    if (this.colorLocation) {
      const color = isDarkMode ? [1.0, 1.0, 1.0] : [0.0, 0.0, 0.0];
      gl.uniform3f(this.colorLocation, color[0], color[1], color[2]);
    }
    
    // Prepare data
    const positions = new Float32Array(this.particles.length * 2);
    const sizes = new Float32Array(this.particles.length);
    const alphas = new Float32Array(this.particles.length);
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      positions[i * 2] = p.x;
      positions[i * 2 + 1] = p.y;
      sizes[i] = p.size;
      alphas[i] = p.alpha;
    }
    
    // Upload data
    if (this.positionBuffer && this.positionLocation >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(this.positionLocation);
      gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    }
    
    if (this.sizeBuffer && this.sizeLocation >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(this.sizeLocation);
      gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, 0, 0);
    }
    
    if (this.alphaBuffer && this.alphaLocation >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(this.alphaLocation);
      gl.vertexAttribPointer(this.alphaLocation, 1, gl.FLOAT, false, 0, 0);
    }
    
    // Draw
    gl.drawArrays(gl.POINTS, 0, this.particles.length);
  }

  private renderCanvas2D(isDarkMode: boolean, time: number): void {
    if (!this.ctx) return;
    
    const ctx = this.ctx;
    
    // Clear background
    ctx.fillStyle = isDarkMode ? '#000000' : '#ffffff';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw particles with pure solid colors
    const baseColor = isDarkMode ? 'rgba(255, 255, 255' : 'rgba(0, 0, 0';
    
    for (const particle of this.particles) {
      const pulse = 0.9 + 0.3 * Math.sin(time * 2 + particle.phase);
      const size = particle.size * pulse * 1.5;
      
      ctx.fillStyle = `${baseColor}, ${particle.alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    
    if (this.gl) {
      this.gl.viewport(0, 0, width, height);
    }
    
    this.centerX = width * 0.5;
    this.centerY = height * 0.5;
    
    console.log(`Canvas resized to ${width}x${height}`);
  }

  dispose(): void {
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
    if (this.gl) {
      if (this.positionBuffer) this.gl.deleteBuffer(this.positionBuffer);
      if (this.sizeBuffer) this.gl.deleteBuffer(this.sizeBuffer);
      if (this.alphaBuffer) this.gl.deleteBuffer(this.alphaBuffer);
    }
    
    this.particles = [];
    this.isInitialized = false;
  }
} 