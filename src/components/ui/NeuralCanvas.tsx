'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  pulsePhase: number;
}

interface Pulse {
  nodeA: number;
  nodeB: number;
  progress: number;
  speed: number;
  opacity: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animIdRef = useRef<number>(0);
  const lastPulseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const isMobile = () => window.innerWidth < 768;
    const nodeCount = () => (isMobile() ? 35 : 90);
    const CONNECTION_DIST = 200;
    const REPEL_RADIUS = 250;
    const REPEL_STRENGTH = 0.6;
    const MAX_SPEED = 0.45;

    function createNode(w: number, h: number): Node {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.6,
        baseOpacity: Math.random() * 0.4 + 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    }

    function init(w: number, h: number, count: number) {
      nodesRef.current = Array.from({ length: count }, () => createNode(w, h));
      pulsesRef.current = [];
      lastPulseRef.current = 0;
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      init(width, height, nodeCount());
    }

    function drawNode(n: Node) {
      if (!ctx) return;
      // Subtle glow
      const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
      gradient.addColorStop(0, `rgba(201, 168, 76, ${n.baseOpacity})`);
      gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 228, 216, ${n.baseOpacity + 0.15})`;
      ctx.fill();
    }

    function drawConnection(a: Node, b: Node, dist: number, alpha: number) {
      if (!ctx) return;
      const normalized = 1 - dist / CONNECTION_DIST;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(201, 168, 76, ${alpha * normalized * 0.22})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function drawPulse(p: Pulse) {
      if (!ctx) return;
      const nodes = nodesRef.current;
      const a = nodes[p.nodeA];
      const b = nodes[p.nodeB];
      if (!a || !b) return;

      const t = p.progress;
      const px = lerp(a.x, b.x, t);
      const py = lerp(a.y, b.y, t);
      const trail = 0.12;

      // Lead glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 6);
      glow.addColorStop(0, `rgba(201, 168, 76, ${p.opacity})`);
      glow.addColorStop(1, 'rgba(201, 168, 76, 0)');
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Trail line behind pulse
      const trailT = Math.max(0, t - trail);
      const tx = lerp(a.x, b.x, trailT);
      const ty = lerp(a.y, b.y, trailT);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.strokeStyle = `rgba(201, 168, 76, ${p.opacity * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    function updateNodes() {
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const now = performance.now();

      for (const n of nodes) {
        // Magnetic repulsion from mouse
        if (mouse) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            n.vx += (dx / dist) * force * 0.08;
            n.vy += (dy / dist) * force * 0.08;
          }
        }

        // Dampen velocity to prevent runaway
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > MAX_SPEED) {
          n.vx = (n.vx / speed) * MAX_SPEED;
          n.vy = (n.vy / speed) * MAX_SPEED;
        }

        // Gentle drift
        n.vx += (Math.random() - 0.5) * 0.012;
        n.vy += (Math.random() - 0.5) * 0.012;
        n.vx *= 0.98;
        n.vy *= 0.98;

        n.x += n.vx;
        n.y += n.vy;

        // Wrap edges
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Spawn pulse occasionally
      if (now - lastPulseRef.current > 600 && nodes.length > 1) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            pulsesRef.current.push({
              nodeA: i,
              nodeB: j,
              progress: 0,
              speed: 0.004 + Math.random() * 0.003,
              opacity: 0.7 + Math.random() * 0.3,
            });
            lastPulseRef.current = now;
          }
        }
      }

      // Update pulses
      pulsesRef.current = pulsesRef.current.filter(p => {
        p.progress += p.speed;
        p.opacity *= 0.998;
        return p.progress < 1 && p.opacity > 0.02;
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;

      // Draw connections first (below pulses, below nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // Check no active pulse is covering this line
            const hasPulse = pulses.some(
              p =>
                (p.nodeA === i && p.nodeB === j) ||
                (p.nodeA === j && p.nodeB === i),
            );
            const alpha = hasPulse ? 1.0 : 0.6;
            drawConnection(nodes[i], nodes[j], dist, alpha);
          }
        }
      }

      // Draw pulses
      for (const p of pulses) {
        drawPulse(p);
      }

      // Draw nodes on top
      for (const n of nodes) {
        drawNode(n);
      }
    }

    function loop() {
      updateNodes();
      draw();
      animIdRef.current = requestAnimationFrame(loop);
    }

    resize();
    loop();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    const handleTouchEnd = () => {
      mouseRef.current = null;
    };

    const ro = new ResizeObserver(() => {
      resize();
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleTouchEnd);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        willChange: 'transform',
        pointerEvents: 'auto',
      }}
    />
  );
}