"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MotionState = {
  facing: 1 | -1;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

const POSTBOY_SIZE = {
  width: 279,
  height: 360,
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function initialPosition() {
  const x = clamp(
    window.innerWidth - 150,
    window.innerWidth * 0.78,
    window.innerWidth - 86,
  );
  const y = clamp(window.innerHeight * 0.14, 104, 184);

  return { x, y };
}

export function PostboyVespaChaser() {
  const [isEnabled, setIsEnabled] = useState(false);
  const frameRef = useRef<number | null>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<MotionState>({
    facing: 1,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncEnabled() {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches);
    }

    syncEnabled();
    pointerQuery.addEventListener("change", syncEnabled);
    motionQuery.addEventListener("change", syncEnabled);

    return () => {
      pointerQuery.removeEventListener("change", syncEnabled);
      motionQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const rider = riderRef.current;
    const sprite = spriteRef.current;
    const trails = trailsRef.current;

    if (!rider || !sprite || !trails) {
      return;
    }

    const riderElement = rider;
    const spriteElement = sprite;
    const trailsElement = trails;
    const start = initialPosition();
    motionRef.current = {
      facing: 1,
      targetX: start.x,
      targetY: start.y,
      velocityX: 0,
      velocityY: 0,
      x: start.x,
      y: start.y,
    };

    riderElement.style.left = "0px";
    riderElement.style.right = "auto";
    riderElement.style.top = "0px";
    riderElement.style.opacity = "1";
    riderElement.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;

    function handlePointerMove(event: PointerEvent) {
      motionRef.current.targetX = event.clientX;
      motionRef.current.targetY = event.clientY;
    }

    function handleResize() {
      const current = motionRef.current;
      current.x = clamp(current.x, 64, window.innerWidth - 64);
      current.y = clamp(current.y, 70, window.innerHeight - 64);
      current.targetX = clamp(current.targetX, 64, window.innerWidth - 64);
      current.targetY = clamp(current.targetY, 70, window.innerHeight - 64);
    }

    function tick(now: number) {
      const current = motionRef.current;
      const dx = current.targetX - current.x;
      const dy = current.targetY - current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 42) {
        current.velocityX += dx * 0.012;
        current.velocityY += dy * 0.012;
      }

      current.velocityX *= 0.82;
      current.velocityY *= 0.82;

      const speed = Math.hypot(current.velocityX, current.velocityY);
      const maxSpeed = 5.4;

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        current.velocityX *= scale;
        current.velocityY *= scale;
      }

      current.x = clamp(current.x + current.velocityX, 48, window.innerWidth - 48);
      current.y = clamp(current.y + current.velocityY, 62, window.innerHeight - 48);

      if (Math.abs(current.velocityX) > 0.15) {
        current.facing = current.velocityX < 0 ? 1 : -1;
      }

      const bob = Math.sin(now / 105) * Math.min(3.4, speed * 0.52);
      const lean = clamp(current.velocityY * 0.75, -7, 7);
      const trailOpacity = clamp((speed - 0.2) / 2.4, 0, 1);

      riderElement.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      spriteElement.style.transform = `translate(-50%, -50%) scaleX(${current.facing}) translateY(${bob}px) rotate(${lean}deg)`;
      trailsElement.style.setProperty("--postboy-trail-opacity", trailOpacity.toFixed(3));

      frameRef.current = window.requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={riderRef}
      aria-hidden="true"
      data-testid="postboy-vespa-chaser"
      className="pointer-events-none fixed right-[7vw] top-28 z-40 hidden w-[clamp(86px,7vw,139px)] select-none opacity-0 transition-opacity duration-300 md:block"
    >
      <div
        ref={spriteRef}
        className="relative drop-shadow-[0_18px_24px_rgba(17,24,39,0.18)] will-change-transform"
      >
        <div
          ref={trailsRef}
          data-testid="postboy-motion-trails"
          className="postboy-motion-trails"
        >
          <span className="postboy-speed-haze" />
          <span className="postboy-wind-trail postboy-wind-trail-long" />
          <span className="postboy-wind-trail postboy-wind-trail-mid" />
          <span className="postboy-wind-trail postboy-wind-trail-short" />
          <span className="postboy-cloud-puff postboy-cloud-puff-one" />
          <span className="postboy-cloud-puff postboy-cloud-puff-two" />
        </div>
        <Image
          src="/marketing/postboy-loading-vespa.png"
          alt=""
          width={POSTBOY_SIZE.width}
          height={POSTBOY_SIZE.height}
          sizes="139px"
          className="relative z-10 h-auto w-full"
          priority
        />
      </div>
    </div>
  );
}
