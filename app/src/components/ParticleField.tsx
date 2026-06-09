"use client";

import { useEffect, useRef } from "react";

import styles from "./ParticleField.module.scss";

type Rgb = [number, number, number];

type Particle = {
  alpha: number;
  radius: number;
  seed: number;
  tint: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type PointerState = {
  active: boolean;
  energy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const FALLBACK_PALETTE: Rgb[] = [
  [112, 170, 255],
  [168, 196, 255],
  [226, 232, 240],
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const parseRgb = (color: string): Rgb | null => {
  const values = color
    .match(/\d+(\.\d+)?/g)
    ?.slice(0, 3)
    .map(Number);

  if (!values || values.length < 3) {
    return null;
  }

  return [values[0], values[1], values[2]];
};

const resolveCssColor = (variable: string, fallback: Rgb): Rgb => {
  const probe = document.createElement("span");

  probe.style.color = `var(${variable})`;
  document.body.append(probe);

  const computedColor = getComputedStyle(probe).color;
  probe.remove();

  return parseRgb(computedColor) ?? fallback;
};

const createParticle = (width: number, height: number): Particle => ({
  alpha: 0.12 + Math.random() * 0.18,
  radius: 0.8 + Math.random() * 1.9,
  seed: Math.random() * Math.PI * 2,
  tint: Math.floor(Math.random() * FALLBACK_PALETTE.length),
  vx: (Math.random() - 0.5) * 0.16,
  vy: (Math.random() - 0.5) * 0.16,
  x: Math.random() * width,
  y: Math.random() * height,
});

const getParticleCount = (width: number, height: number) => {
  const isSmallScreen = width < 720;
  const density = isSmallScreen ? 18000 : 11500;

  return clamp(
    Math.round((width * height) / density),
    isSmallScreen ? 34 : 72,
    isSmallScreen ? 74 : 150,
  );
};

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let palette = [
      resolveCssColor("--brand-on-background-medium", FALLBACK_PALETTE[0]),
      resolveCssColor("--accent-on-background-weak", FALLBACK_PALETTE[1]),
      resolveCssColor("--neutral-on-background-weak", FALLBACK_PALETTE[2]),
    ];

    const particles: Particle[] = [];
    const pointer: PointerState = {
      active: false,
      energy: 0,
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    };

    const fillParticles = (count: number) => {
      particles.length = 0;

      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle(width, height));
      }
    };

    const drawParticle = (particle: Particle, alphaBoost = 0) => {
      const [red, green, blue] = palette[particle.tint % palette.length];
      const alpha = clamp(particle.alpha + alphaBoost, 0.08, 0.38);

      context.beginPath();
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    };

    const drawStaticParticles = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        drawParticle(particle, -0.04);
      }
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      fillParticles(reducedMotion ? 42 : getParticleCount(width, height));

      if (reducedMotion) {
        drawStaticParticles();
      }
    };

    const moveParticle = (particle: Particle, time: number) => {
      const drift =
        particle.seed +
        time * 0.00026 +
        Math.sin((particle.x + particle.y) * 0.004 + time * 0.00018);
      const curlX = Math.cos(drift) * 0.014;
      const curlY = Math.sin(drift) * 0.014;
      let alphaBoost = 0;

      particle.vx += curlX;
      particle.vy += curlY;

      if (pointer.active && pointer.energy > 0.01) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = Math.min(width, height) < 720 ? 130 : 190;

        if (distance < radius) {
          const strength = (1 - distance / radius) * pointer.energy;
          const directionX = dx / (distance || 1);
          const directionY = dy / (distance || 1);

          particle.vx += -directionY * strength * 0.7 + pointer.vx * strength * 0.018;
          particle.vy += directionX * strength * 0.7 + pointer.vy * strength * 0.018;
          alphaBoost = strength * 0.16;
        }
      }

      particle.vx *= 0.94;
      particle.vy *= 0.94;
      particle.x += particle.vx;
      particle.y += particle.vy;

      const margin = 32;

      if (particle.x < -margin) particle.x = width + margin;
      if (particle.x > width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = height + margin;
      if (particle.y > height + margin) particle.y = -margin;

      drawParticle(particle, alphaBoost);
    };

    const render = (time: number) => {
      if (document.hidden || reducedMotion) {
        animationFrame = 0;
        return;
      }

      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.18)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      pointer.energy *= 0.92;
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;

      for (const particle of particles) {
        moveParticle(particle, time);
      }

      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!animationFrame && !reducedMotion && !document.hidden) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const nextX = event.clientX;
      const nextY = event.clientY;

      if (pointer.active) {
        const velocityX = nextX - pointer.x;
        const velocityY = nextY - pointer.y;
        const speed = Math.hypot(velocityX, velocityY);

        pointer.vx = velocityX;
        pointer.vy = velocityY;
        pointer.energy = clamp(speed / 28, 0.08, 1);
      } else {
        pointer.active = true;
      }

      pointer.x = nextX;
      pointer.y = nextY;
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      resize();
      start();
    };

    const handleThemeChange = () => {
      palette = [
        resolveCssColor("--brand-on-background-medium", FALLBACK_PALETTE[0]),
        resolveCssColor("--accent-on-background-weak", FALLBACK_PALETTE[1]),
        resolveCssColor("--neutral-on-background-weak", FALLBACK_PALETTE[2]),
      ];
    };

    const handleVisibilityChange = () => {
      if (document.hidden && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
      }

      start();
    };

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const themeObserver = new MutationObserver(handleThemeChange);

    resize();
    start();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["data-theme", "data-brand", "data-accent", "data-neutral"],
      attributes: true,
    });

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.field} />;
};
