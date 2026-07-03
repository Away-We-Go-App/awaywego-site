"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type MotionState = {
  facing: 1 | -1;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

type RoutePoint = Point & {
  createdAt: number;
};

type RouteState = {
  lastAddedAt: number;
  origin: Point | null;
  points: RoutePoint[];
};

const POSTBOY_SIZE = {
  width: 279,
  height: 360,
} as const;

const ROUTE_MAX_POINTS = 22;
const ROUTE_FIRST_POINT_DISTANCE = 14;
const ROUTE_POINT_DISTANCE = 34;
const ROUTE_POINT_FAST_DISTANCE = 96;
const ROUTE_POINT_INTERVAL = 72;
const ROUTE_REVEAL_MS = 260;
const ROUTE_CONSUME_RADIUS = 46;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function distanceBetween(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function formatPoint(point: Point) {
  return `${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
}

function buildCurvedRoutePath(origin: Point, routePoints: Point[]) {
  if (routePoints.length === 0) {
    return "";
  }

  const points = [origin, ...routePoints];
  let path = `M ${formatPoint(points[0])}`;

  if (points.length === 2) {
    return `${path} L ${formatPoint(points[1])}`;
  }

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const midpoint = {
      x: (current.x + next.x) / 2,
      y: (current.y + next.y) / 2,
    };

    path += ` Q ${formatPoint(current)} ${formatPoint(midpoint)}`;
  }

  return `${path} L ${formatPoint(points[points.length - 1])}`;
}

function visibleRoutePoints(origin: Point, routePoints: RoutePoint[], now: number) {
  const points: Point[] = [];
  let previous = origin;

  for (const point of routePoints) {
    const reveal = clamp((now - point.createdAt) / ROUTE_REVEAL_MS, 0, 1);
    const visiblePoint = {
      x: previous.x + (point.x - previous.x) * reveal,
      y: previous.y + (point.y - previous.y) * reveal,
    };

    points.push(visiblePoint);

    if (reveal < 1) {
      break;
    }

    previous = point;
  }

  return points;
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
  const routePathRef = useRef<SVGPathElement>(null);
  const routeShadowPathRef = useRef<SVGPathElement>(null);
  const motionRef = useRef<MotionState>({
    facing: 1,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
    x: 0,
    y: 0,
  });
  const routeRef = useRef<RouteState>({
    lastAddedAt: 0,
    origin: null,
    points: [],
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
    const routePath = routePathRef.current;
    const routeShadowPath = routeShadowPathRef.current;

    if (!rider || !sprite || !trails || !routePath || !routeShadowPath) {
      return;
    }

    const riderElement = rider;
    const spriteElement = sprite;
    const trailsElement = trails;
    const routePathElement = routePath;
    const routeShadowPathElement = routeShadowPath;
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
    routeRef.current = {
      lastAddedAt: 0,
      origin: null,
      points: [],
    };

    riderElement.style.left = "0px";
    riderElement.style.right = "auto";
    riderElement.style.top = "0px";
    riderElement.style.opacity = "1";
    riderElement.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;

    function handlePointerMove(event: PointerEvent) {
      const now = performance.now();
      const current = motionRef.current;
      const route = routeRef.current;
      const nextPoint = { x: event.clientX, y: event.clientY };
      const routeOrigin = route.origin ?? {
        x: current.x,
        y: current.y,
      };
      const lastPoint = route.points[route.points.length - 1] ?? routeOrigin;
      const distance = distanceBetween(lastPoint, nextPoint);
      const elapsed = now - route.lastAddedAt;
      const isFirstRoutePoint = route.points.length === 0;
      const requiredDistance = isFirstRoutePoint
        ? ROUTE_FIRST_POINT_DISTANCE
        : ROUTE_POINT_DISTANCE;

      if (
        distance < requiredDistance ||
        (!isFirstRoutePoint &&
          elapsed < ROUTE_POINT_INTERVAL &&
          distance < ROUTE_POINT_FAST_DISTANCE)
      ) {
        return;
      }

      route.origin = routeOrigin;
      route.points.push({
        ...nextPoint,
        createdAt: isFirstRoutePoint ? now - ROUTE_REVEAL_MS * 0.68 : now - 54,
      });
      route.lastAddedAt = now;

      if (route.points.length > ROUTE_MAX_POINTS) {
        const removedPoints = route.points.splice(
          0,
          route.points.length - ROUTE_MAX_POINTS,
        );
        route.origin = removedPoints[removedPoints.length - 1] ?? route.origin;
      }
    }

    function handleResize() {
      const current = motionRef.current;
      const route = routeRef.current;
      current.x = clamp(current.x, 64, window.innerWidth - 64);
      current.y = clamp(current.y, 70, window.innerHeight - 64);
      current.targetX = clamp(current.targetX, 64, window.innerWidth - 64);
      current.targetY = clamp(current.targetY, 70, window.innerHeight - 64);

      if (route.origin) {
        route.origin.x = clamp(route.origin.x, 64, window.innerWidth - 64);
        route.origin.y = clamp(route.origin.y, 70, window.innerHeight - 64);
      }

      for (const point of route.points) {
        point.x = clamp(point.x, 64, window.innerWidth - 64);
        point.y = clamp(point.y, 70, window.innerHeight - 64);
      }
    }

    function tick(now: number) {
      const current = motionRef.current;
      const route = routeRef.current;
      const riderPosition = { x: current.x, y: current.y };

      while (
        route.points.length > 0 &&
        distanceBetween(riderPosition, route.points[0]) < ROUTE_CONSUME_RADIUS
      ) {
        const consumedPoint = route.points.shift();
        route.origin = route.points.length > 0 && consumedPoint ? consumedPoint : null;
      }

      if (route.points.length > 0) {
        current.targetX = route.points[0].x;
        current.targetY = route.points[0].y;
      } else {
        current.targetX = current.x;
        current.targetY = current.y;
      }

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
      const routePathData = route.origin
        ? buildCurvedRoutePath(
            route.origin,
            visibleRoutePoints(route.origin, route.points, now),
          )
        : "";
      const routeOpacity =
        route.points.length > 0 ? clamp(0.56 + route.points.length * 0.16, 0, 1) : 0;
      routePathElement.setAttribute("d", routePathData);
      routeShadowPathElement.setAttribute("d", routePathData);
      routePathElement.style.opacity = routeOpacity.toFixed(3);
      routeShadowPathElement.style.opacity = (routeOpacity * 0.72).toFixed(3);

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
    <>
      <svg
        aria-hidden="true"
        data-testid="postboy-route-layer"
        className="postboy-route-layer"
      >
        <path ref={routeShadowPathRef} className="postboy-route-shadow" />
        <path
          ref={routePathRef}
          data-testid="postboy-route-path"
          className="postboy-route-path"
        />
      </svg>
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
    </>
  );
}
