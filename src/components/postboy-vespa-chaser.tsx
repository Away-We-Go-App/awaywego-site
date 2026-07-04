"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
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

type DestinationAsset = {
  imageSrc: string;
  label: string;
};

type DestinationPostcard = DestinationAsset & {
  photoBackground: string;
};

type GamePostcard = DestinationPostcard &
  Point & {
    id: number;
    rotation: number;
    status: "active" | "caught";
  };

type GameObstacleKind = "banana-peel" | "open-suitcase" | "rolling-luggage";

type GameObstacleStatus = "active" | "exiting";

type GameObstacle = Point & {
  direction: 1 | -1;
  duration: number;
  endX: number;
  endY: number;
  hit: boolean;
  id: number;
  kind: GameObstacleKind;
  removeAt: number;
  rotation: number;
  startX: number;
  startY: number;
  startedAt: number;
  status: GameObstacleStatus;
};

type PostboyStun = {
  direction: 1 | -1;
  kind: GameObstacleKind;
  startedAt: number;
  until: number;
};

type PostcardSpawnZone = {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
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
const POINTER_IDLE_RETURN_MS = 5000;
const POSTCARD_CATCH_RADIUS = 172;
const POSTCARD_RESPAWN_DELAY = 420;
const POSTCARD_TOTAL = 10;
const GAME_DURATION_SECONDS = 30;
const GAME_DURATION_MS = GAME_DURATION_SECONDS * 1000;
const REWARD_CODE = "POSTBOYFTW";
const POSTCARD_EDGE_MARGIN = 104;
const POSTCARD_TOP_CLEARANCE = 214;
const OBSTACLE_EDGE_MARGIN = 116;
const OBSTACLE_TOP_CLEARANCE = 176;
const OBSTACLE_STATIC_FIRST_DELAY = 3000;
const OBSTACLE_STATIC_VISIBLE_MS = 6500;
const OBSTACLE_STATIC_GAP_MS = 1300;
const OBSTACLE_EXIT_MS = 520;
const OBSTACLE_ROLLING_FIRST_DELAY = 8800;
const OBSTACLE_ROLLING_GAP_MS = 11200;
const OBSTACLE_ROLLING_DURATION_MS = 6400;
const OBSTACLE_COLLISION_RADIUS = 80;
const OBSTACLE_ROLLING_COLLISION_RADIUS = 96;
const OBSTACLE_STUN_MS = 1250;
const OBSTACLE_ROLLING_STUN_MS = 1500;
const POSTBOY_HOME_ANCHOR_SELECTOR = "[data-postboy-home-anchor]";

const POSTCARD_DESTINATIONS: DestinationAsset[] = [
  {
    imageSrc: "/marketing/postcards/rome-colosseum.png",
    label: "Rome",
  },
  {
    imageSrc: "/marketing/postcards/paris-eiffel-tower.png",
    label: "Paris",
  },
  {
    imageSrc: "/marketing/postcards/tokyo-sensoji.png",
    label: "Tokyo",
  },
  {
    imageSrc: "/marketing/postcards/new-york-lady-liberty.png",
    label: "New York",
  },
  {
    imageSrc: "/marketing/postcards/los-angeles-hollywood-sign.png",
    label: "Los Angeles",
  },
  {
    imageSrc: "/marketing/postcards/london-elizabeth-tower.png",
    label: "London",
  },
  {
    imageSrc: "/marketing/postcards/yosemite-el-capitan.png",
    label: "Yosemite",
  },
  {
    imageSrc: "/marketing/postcards/bangkok-giant-swing.png",
    label: "Bangkok",
  },
  {
    imageSrc: "/marketing/postcards/las-vegas-welcome-sign.png",
    label: "Las Vegas",
  },
  {
    imageSrc: "/marketing/postcards/sydney-opera-house.png",
    label: "Sydney",
  },
];

const POSTCARD_PASTELS = [
  "#f8ded6",
  "#f6e6b8",
  "#d8efe5",
  "#dbe9fb",
  "#eadcf7",
  "#f7dcec",
  "#d9eef4",
  "#f3e2c8",
  "#e6edd0",
  "#f0dfd5",
] as const;

const POSTCARD_SPAWN_ZONES: PostcardSpawnZone[] = [
  { minX: 0.1, maxX: 0.3, minY: 0.28, maxY: 0.44 },
  { minX: 0.38, maxX: 0.58, minY: 0.26, maxY: 0.42 },
  { minX: 0.68, maxX: 0.88, minY: 0.28, maxY: 0.44 },
  { minX: 0.1, maxX: 0.28, minY: 0.48, maxY: 0.65 },
  { minX: 0.4, maxX: 0.6, minY: 0.46, maxY: 0.64 },
  { minX: 0.72, maxX: 0.9, minY: 0.48, maxY: 0.66 },
  { minX: 0.12, maxX: 0.3, minY: 0.69, maxY: 0.83 },
  { minX: 0.41, maxX: 0.61, minY: 0.68, maxY: 0.84 },
  { minX: 0.72, maxX: 0.9, minY: 0.69, maxY: 0.84 },
  { minX: 0.24, maxX: 0.76, minY: 0.34, maxY: 0.78 },
] as const;

const OBSTACLE_ASSETS: Record<
  GameObstacleKind,
  {
    height: number;
    imageSrc: string;
    sizes: string;
    width: number;
  }
> = {
  "banana-peel": {
    height: 449,
    imageSrc: "/marketing/obstacles/banana-peel-clay.png",
    sizes: "118px",
    width: 520,
  },
  "open-suitcase": {
    height: 408,
    imageSrc: "/marketing/obstacles/open-suitcase-clay.png",
    sizes: "136px",
    width: 560,
  },
  "rolling-luggage": {
    height: 560,
    imageSrc: "/marketing/obstacles/rolling-luggage-clay.png",
    sizes: "92px",
    width: 293,
  },
};

type GameStatus = "idle" | "playing" | "won" | "lost";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function distanceBetween(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
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

function renderedPostboySize() {
  const width = clamp(window.innerWidth * 0.07, 86, 139);

  return {
    width,
    height: width * (POSTBOY_SIZE.height / POSTBOY_SIZE.width),
  };
}

function homePosition() {
  const anchor = document.querySelector<HTMLElement>(POSTBOY_HOME_ANCHOR_SELECTOR);
  const postboySize = renderedPostboySize();

  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    const x = clamp(
      rect.left + 62,
      38,
      window.innerWidth - postboySize.width - 38,
    );
    const y = clamp(
      rect.top + rect.height * 0.44 - postboySize.height - 22,
      116,
      window.innerHeight - postboySize.height - 36,
    );

    return { x, y };
  }

  const x = clamp(window.innerWidth * 0.04, 38, 112);
  const y = clamp(
    window.innerHeight * 0.46,
    164,
    window.innerHeight - postboySize.height - 36,
  );

  return { x, y };
}

function shuffled<T>(items: readonly T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function createPostcardDeck(): DestinationPostcard[] {
  const backgrounds = shuffled(POSTCARD_PASTELS);

  return shuffled(POSTCARD_DESTINATIONS).map((destination, index) => ({
    ...destination,
    photoBackground: backgrounds[index % backgrounds.length],
  }));
}

function createGamePostcard(
  sequence: number,
  deck: DestinationPostcard[],
  spawnZones: PostcardSpawnZone[],
  avoidPoints: Point[] = [],
): GamePostcard | null {
  const destination = deck[sequence];

  if (!destination) {
    return null;
  }

  for (let attempt = 0; attempt < spawnZones.length; attempt += 1) {
    const spawnZone = spawnZones[(sequence + attempt) % spawnZones.length];

    if (!spawnZone) {
      continue;
    }

    const x = clamp(
      window.innerWidth *
        (spawnZone.minX + Math.random() * (spawnZone.maxX - spawnZone.minX)),
      POSTCARD_EDGE_MARGIN,
      window.innerWidth - POSTCARD_EDGE_MARGIN,
    );
    const y = clamp(
      window.innerHeight *
        (spawnZone.minY + Math.random() * (spawnZone.maxY - spawnZone.minY)),
      POSTCARD_TOP_CLEARANCE,
      window.innerHeight - POSTCARD_EDGE_MARGIN,
    );

    if (avoidPoints.some((point) => distanceBetween(point, { x, y }) < 198)) {
      continue;
    }

    const rotation = [-6, 5, -3, 7, -5, 4][sequence % 6];

    return {
      ...destination,
      id: sequence + 1,
      rotation,
      status: "active",
      x,
      y,
    };
  }

  return null;
}

function obstaclePosition(obstacle: GameObstacle, now: number): Point {
  if (obstacle.kind !== "rolling-luggage") {
    return obstacle;
  }

  const progress = clamp((now - obstacle.startedAt) / obstacle.duration, 0, 1);

  return {
    x: lerp(obstacle.startX, obstacle.endX, progress),
    y: lerp(obstacle.startY, obstacle.endY, progress),
  };
}

function isInHudClearance(point: Point) {
  return point.x > window.innerWidth - 380 && point.y < 160;
}

function createStaticObstacle(
  kind: "banana-peel" | "open-suitcase",
  now: number,
  avoidPoints: Point[],
): GameObstacle | null {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const point = {
      x: clamp(
        OBSTACLE_EDGE_MARGIN +
          Math.random() * (window.innerWidth - OBSTACLE_EDGE_MARGIN * 2),
        OBSTACLE_EDGE_MARGIN,
        window.innerWidth - OBSTACLE_EDGE_MARGIN,
      ),
      y: clamp(
        OBSTACLE_TOP_CLEARANCE +
          Math.random() * (window.innerHeight - OBSTACLE_TOP_CLEARANCE - 104),
        OBSTACLE_TOP_CLEARANCE,
        window.innerHeight - 104,
      ),
    };

    if (isInHudClearance(point)) {
      continue;
    }

    if (avoidPoints.some((avoidPoint) => distanceBetween(avoidPoint, point) < 190)) {
      continue;
    }

    return {
      ...point,
      direction: Math.random() > 0.5 ? 1 : -1,
      duration: 0,
      endX: point.x,
      endY: point.y,
      hit: false,
      id: Math.floor(now * 10 + attempt),
      kind,
      removeAt: now + OBSTACLE_STATIC_VISIBLE_MS + OBSTACLE_EXIT_MS,
      rotation:
        kind === "open-suitcase"
          ? [-7, 5, -3, 6][attempt % 4]
          : [-14, 11, -8, 9][attempt % 4],
      startX: point.x,
      startY: point.y,
      startedAt: now,
      status: "active",
    };
  }

  return null;
}

function createRollingObstacle(now: number, avoidPoints: Point[]): GameObstacle {
  const fromLeft = Math.random() > 0.5;
  const startX = fromLeft ? -150 : window.innerWidth + 150;
  const endX = fromLeft ? window.innerWidth + 150 : -150;
  let y = clamp(
    OBSTACLE_TOP_CLEARANCE +
      Math.random() * (window.innerHeight - OBSTACLE_TOP_CLEARANCE - 128),
    OBSTACLE_TOP_CLEARANCE,
    window.innerHeight - 128,
  );

  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (
      !avoidPoints.some((avoidPoint) => Math.abs(avoidPoint.y - y) < 130) &&
      !isInHudClearance({ x: fromLeft ? window.innerWidth - 160 : 160, y })
    ) {
      break;
    }

    y = clamp(
      OBSTACLE_TOP_CLEARANCE +
        Math.random() * (window.innerHeight - OBSTACLE_TOP_CLEARANCE - 128),
      OBSTACLE_TOP_CLEARANCE,
      window.innerHeight - 128,
    );
  }

  return {
    direction: fromLeft ? 1 : -1,
    duration: OBSTACLE_ROLLING_DURATION_MS,
    endX,
    endY: y,
    hit: false,
    id: Math.floor(now * 10),
    kind: "rolling-luggage",
    removeAt: now + OBSTACLE_ROLLING_DURATION_MS + 260,
    rotation: fromLeft ? 3 : -3,
    startX,
    startY: y,
    startedAt: now,
    status: "active",
    x: startX,
    y,
  };
}

export function PostboyVespaChaser() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [postcard, setPostcard] = useState<GamePostcard | null>(null);
  const [obstacles, setObstacles] = useState<GameObstacle[]>([]);
  const [postboyStun, setPostboyStun] = useState<PostboyStun | null>(null);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const frameRef = useRef<number | null>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const routeShadowPathRef = useRef<SVGPathElement>(null);
  const motionRef = useRef<MotionState>({
    facing: -1,
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
  const homePositionRef = useRef<Point>({ x: 0, y: 0 });
  const lastPointerMoveAtRef = useRef(0);
  const isReturningHomeRef = useRef(false);
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(GAME_DURATION_SECONDS);
  const gameStatusRef = useRef<GameStatus>("idle");
  const gameStartedAtRef = useRef<number | null>(null);
  const postcardRef = useRef<GamePostcard | null>(null);
  const postcardDeckRef = useRef<DestinationPostcard[]>([]);
  const postcardSpawnZonesRef = useRef<PostcardSpawnZone[]>([]);
  const nextPostcardIndexRef = useRef(0);
  const lastSpawnAtRef = useRef(0);
  const obstaclesRef = useRef<GameObstacle[]>([]);
  const nextObstacleIdRef = useRef(1);
  const nextStaticObstacleAtRef = useRef(Number.POSITIVE_INFINITY);
  const nextRollingObstacleAtRef = useRef(Number.POSITIVE_INFINITY);
  const postboyStunRef = useRef<PostboyStun | null>(null);

  function resetGame(now: number) {
    scoreRef.current = 0;
    timeLeftRef.current = GAME_DURATION_SECONDS;
    gameStatusRef.current = "idle";
    gameStartedAtRef.current = null;
    postcardRef.current = null;
    postcardDeckRef.current = createPostcardDeck();
    postcardSpawnZonesRef.current = shuffled(POSTCARD_SPAWN_ZONES);
    nextPostcardIndexRef.current = 0;
    lastSpawnAtRef.current = now + 420;
    obstaclesRef.current = [];
    nextObstacleIdRef.current = 1;
    nextStaticObstacleAtRef.current = now + OBSTACLE_STATIC_FIRST_DELAY;
    nextRollingObstacleAtRef.current = now + OBSTACLE_ROLLING_FIRST_DELAY;
    postboyStunRef.current = null;
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setGameStatus("idle");
    setPostcard(null);
    setObstacles([]);
    setPostboyStun(null);
    setHasCopiedCode(false);
  }

  function startGame(now: number = performance.now()) {
    if (gameStatusRef.current === "playing") {
      return;
    }

    resetGame(now);
    gameStatusRef.current = "playing";
    gameStartedAtRef.current = now;
    lastSpawnAtRef.current = now;
    setGameStatus("playing");
  }

  function stopGame() {
    resetGame(performance.now());
  }

  function closeGameResult() {
    resetGame(performance.now());
  }

  function handlePlayAgain() {
    startGame();
  }

  function handleCopyCode() {
    void navigator.clipboard?.writeText(REWARD_CODE).catch(() => undefined);
    setHasCopiedCode(true);
  }

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
    const start = homePosition();
    homePositionRef.current = start;
    motionRef.current = {
      facing: -1,
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
    isReturningHomeRef.current = false;
    resetGame(performance.now());

    riderElement.style.left = "0px";
    riderElement.style.right = "auto";
    riderElement.style.top = "0px";
    riderElement.style.opacity = "1";
    riderElement.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
    const autostartAt = performance.now();
    lastPointerMoveAtRef.current = autostartAt;
    gameStatusRef.current = "playing";
    gameStartedAtRef.current = autostartAt;
    lastSpawnAtRef.current = autostartAt;
    setGameStatus("playing");

    function finishGame(status: "won" | "lost") {
      gameStatusRef.current = status;
      postcardRef.current = null;
      lastSpawnAtRef.current = Number.POSITIVE_INFINITY;
      routeRef.current = {
        lastAddedAt: 0,
        origin: null,
        points: [],
      };
      obstaclesRef.current = [];
      nextStaticObstacleAtRef.current = Number.POSITIVE_INFINITY;
      nextRollingObstacleAtRef.current = Number.POSITIVE_INFINITY;
      postboyStunRef.current = null;
      setHasCopiedCode(false);
      setGameStatus(status);
      setPostcard(null);
      setObstacles([]);
      setPostboyStun(null);
    }

    function handlePointerMove(event: PointerEvent) {
      const now = performance.now();
      const current = motionRef.current;
      const route = routeRef.current;
      const nextPoint = { x: event.clientX, y: event.clientY };
      lastPointerMoveAtRef.current = now;

      if (isReturningHomeRef.current) {
        route.origin = {
          x: current.x,
          y: current.y,
        };
        route.points = [];
        isReturningHomeRef.current = false;
      }

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
      const nextHome = homePosition();
      homePositionRef.current = nextHome;
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

      if (isReturningHomeRef.current) {
        route.points = [
          {
            ...nextHome,
            createdAt: performance.now() - ROUTE_REVEAL_MS,
          },
        ];
      }

      if (postcardRef.current) {
        const nextPostcard = {
          ...postcardRef.current,
          x: clamp(postcardRef.current.x, 128, window.innerWidth - 128),
          y: clamp(postcardRef.current.y, 136, window.innerHeight - 128),
        };

        postcardRef.current = nextPostcard;
        setPostcard(nextPostcard);
      }
    }

    function publishObstacles(nextObstacles: GameObstacle[]) {
      obstaclesRef.current = nextObstacles;
      setObstacles([...nextObstacles]);
    }

    function obstacleAvoidPoints(now: number, includeObstacles = true) {
      const points: Point[] = [
        {
          x: motionRef.current.x,
          y: motionRef.current.y,
        },
      ];

      if (postcardRef.current?.status === "active") {
        points.push(postcardRef.current);
      }

      if (includeObstacles) {
        for (const obstacle of obstaclesRef.current) {
          if (obstacle.status === "active") {
            points.push(obstaclePosition(obstacle, now));
          }
        }
      }

      return points;
    }

    function spawnStaticObstacles(now: number) {
      const activeStaticObstacle = obstaclesRef.current.some(
        (obstacle) =>
          obstacle.kind !== "rolling-luggage" && obstacle.status === "active",
      );

      if (activeStaticObstacle) {
        return;
      }

      const suitcase = createStaticObstacle(
        "open-suitcase",
        now,
        obstacleAvoidPoints(now),
      );

      if (!suitcase) {
        nextStaticObstacleAtRef.current = now + 900;
        return;
      }

      const banana = createStaticObstacle("banana-peel", now, [
        ...obstacleAvoidPoints(now),
        suitcase,
      ]);

      if (!banana) {
        nextStaticObstacleAtRef.current = now + 900;
        return;
      }

      publishObstacles([
        ...obstaclesRef.current,
        {
          ...suitcase,
          id: nextObstacleIdRef.current,
        },
        {
          ...banana,
          id: nextObstacleIdRef.current + 1,
        },
      ]);
      nextObstacleIdRef.current += 2;
      nextStaticObstacleAtRef.current =
        now +
        OBSTACLE_STATIC_VISIBLE_MS +
        OBSTACLE_STATIC_GAP_MS +
        Math.random() * 900;
    }

    function spawnRollingObstacle(now: number) {
      const activeRollingObstacle = obstaclesRef.current.some(
        (obstacle) =>
          obstacle.kind === "rolling-luggage" && obstacle.status === "active",
      );

      if (activeRollingObstacle) {
        return;
      }

      const rollingObstacle = createRollingObstacle(
        now,
        obstacleAvoidPoints(now),
      );

      publishObstacles([
        ...obstaclesRef.current,
        {
          ...rollingObstacle,
          id: nextObstacleIdRef.current,
        },
      ]);
      nextObstacleIdRef.current += 1;
      nextRollingObstacleAtRef.current =
        now + OBSTACLE_ROLLING_GAP_MS + Math.random() * 2600;
    }

    function syncObstacles(now: number) {
      let didChange = false;
      const nextObstacles = obstaclesRef.current
        .map((obstacle) => {
          if (now >= obstacle.removeAt) {
            didChange = true;

            return null;
          }

          if (
            obstacle.kind !== "rolling-luggage" &&
            obstacle.status === "active" &&
            now >= obstacle.startedAt + OBSTACLE_STATIC_VISIBLE_MS
          ) {
            didChange = true;

            return {
              ...obstacle,
              removeAt: now + OBSTACLE_EXIT_MS,
              status: "exiting" as const,
            };
          }

          return obstacle;
        })
        .filter((obstacle): obstacle is GameObstacle => obstacle !== null);

      if (didChange) {
        publishObstacles(nextObstacles);
      }
    }

    function triggerPostboyStun(
      obstacle: GameObstacle,
      obstaclePoint: Point,
      now: number,
    ) {
      const current = motionRef.current;
      const stunDuration =
        obstacle.kind === "rolling-luggage"
          ? OBSTACLE_ROLLING_STUN_MS
          : OBSTACLE_STUN_MS;
      const direction =
        obstacle.kind === "rolling-luggage"
          ? obstacle.direction
          : current.x < obstaclePoint.x
            ? -1
            : 1;
      const nextStun = {
        direction,
        kind: obstacle.kind,
        startedAt: now,
        until: now + stunDuration,
      };

      current.velocityX = direction * (obstacle.kind === "rolling-luggage" ? 8 : 5);
      current.velocityY = obstacle.kind === "open-suitcase" ? -5 : 3;
      postboyStunRef.current = nextStun;
      setPostboyStun(nextStun);
    }

    function handleObstacleCollisions(now: number) {
      if (postboyStunRef.current && now < postboyStunRef.current.until) {
        return;
      }

      const riderPosition = {
        x: motionRef.current.x,
        y: motionRef.current.y,
      };
      let didChange = false;
      const nextObstacles = obstaclesRef.current.map((obstacle) => {
        if (obstacle.status !== "active" || obstacle.hit) {
          return obstacle;
        }

        const obstaclePoint = obstaclePosition(obstacle, now);
        const collisionRadius =
          obstacle.kind === "rolling-luggage"
            ? OBSTACLE_ROLLING_COLLISION_RADIUS
            : OBSTACLE_COLLISION_RADIUS;

        if (distanceBetween(riderPosition, obstaclePoint) >= collisionRadius) {
          return obstacle;
        }

        didChange = true;
        triggerPostboyStun(obstacle, obstaclePoint, now);

        return {
          ...obstacle,
          hit: true,
          removeAt:
            obstacle.kind === "rolling-luggage"
              ? obstacle.removeAt
              : now + OBSTACLE_EXIT_MS,
          status:
            obstacle.kind === "rolling-luggage"
              ? obstacle.status
              : ("exiting" as const),
        };
      });

      if (didChange) {
        publishObstacles(nextObstacles);
      }
    }

    function spawnPostcard(now: number) {
      const nextPostcard = createGamePostcard(
        nextPostcardIndexRef.current,
        postcardDeckRef.current,
        postcardSpawnZonesRef.current,
        obstacleAvoidPoints(now),
      );

      if (!nextPostcard) {
        return;
      }

      nextPostcardIndexRef.current += 1;
      postcardRef.current = nextPostcard;
      lastSpawnAtRef.current = now;
      setPostcard(nextPostcard);
    }

    function catchPostcard(now: number, activePostcard: GamePostcard) {
      const caughtPostcard = {
        ...activePostcard,
        status: "caught" as const,
      };
      const nextScore = scoreRef.current + 1;

      scoreRef.current = nextScore;
      postcardRef.current = caughtPostcard;
      setScore(nextScore);
      setPostcard(caughtPostcard);

      window.setTimeout(() => {
        if (postcardRef.current?.id !== caughtPostcard.id) {
          return;
        }

        if (nextScore >= POSTCARD_TOTAL) {
          finishGame("won");
          return;
        }

        postcardRef.current = null;
        setPostcard(null);
        lastSpawnAtRef.current = performance.now() + POSTCARD_RESPAWN_DELAY;
      }, 430);

      lastSpawnAtRef.current = now + POSTCARD_RESPAWN_DELAY;
    }

    function routePostboyHome(now: number) {
      const current = motionRef.current;
      const route = routeRef.current;
      const home = homePositionRef.current;

      if (distanceBetween(current, home) < ROUTE_CONSUME_RADIUS) {
        if (isReturningHomeRef.current) {
          route.origin = null;
          route.points = [];
          isReturningHomeRef.current = false;
        }

        current.facing = -1;
        current.velocityX = 0;
        current.velocityY = 0;

        return;
      }

      if (isReturningHomeRef.current) {
        return;
      }

      route.origin = {
        x: current.x,
        y: current.y,
      };
      route.points = [
        {
          ...home,
          createdAt: now - ROUTE_REVEAL_MS * 0.5,
        },
      ];
      route.lastAddedAt = now;
      isReturningHomeRef.current = true;
    }

    function tick(now: number) {
      const current = motionRef.current;
      const route = routeRef.current;
      const riderPosition = { x: current.x, y: current.y };
      const activePostcard = postcardRef.current;
      const status = gameStatusRef.current;
      const activeStun =
        postboyStunRef.current && now < postboyStunRef.current.until
          ? postboyStunRef.current
          : null;

      if (postboyStunRef.current && !activeStun) {
        postboyStunRef.current = null;
        setPostboyStun(null);
      }

      if (status === "playing" && gameStartedAtRef.current !== null) {
        const remainingMs = Math.max(
          0,
          GAME_DURATION_MS - (now - gameStartedAtRef.current),
        );
        const nextTimeLeft = Math.min(
          GAME_DURATION_SECONDS,
          Math.ceil(remainingMs / 1000),
        );

        if (nextTimeLeft !== timeLeftRef.current) {
          timeLeftRef.current = nextTimeLeft;
          setTimeLeft(nextTimeLeft);
        }

        if (remainingMs <= 0 && scoreRef.current < POSTCARD_TOTAL) {
          finishGame("lost");
        }
      }

      syncObstacles(now);

      if (
        !activePostcard &&
        gameStatusRef.current === "playing" &&
        nextPostcardIndexRef.current < POSTCARD_TOTAL &&
        now >= lastSpawnAtRef.current
      ) {
        spawnPostcard(now);
      }

      if (
        gameStatusRef.current === "playing" &&
        now >= nextStaticObstacleAtRef.current
      ) {
        spawnStaticObstacles(now);
      }

      if (
        gameStatusRef.current === "playing" &&
        now >= nextRollingObstacleAtRef.current
      ) {
        spawnRollingObstacle(now);
      }

      if (!activeStun) {
        while (
          route.points.length > 0 &&
          distanceBetween(riderPosition, route.points[0]) < ROUTE_CONSUME_RADIUS
        ) {
          const consumedPoint = route.points.shift();
          route.origin = route.points.length > 0 && consumedPoint ? consumedPoint : null;
        }

        if (now - lastPointerMoveAtRef.current >= POINTER_IDLE_RETURN_MS) {
          routePostboyHome(now);
        }
      }

      if (!activeStun && route.points.length > 0) {
        current.targetX = route.points[0].x;
        current.targetY = route.points[0].y;
      } else {
        current.targetX = current.x;
        current.targetY = current.y;
      }

      const dx = current.targetX - current.x;
      const dy = current.targetY - current.y;
      const distance = Math.hypot(dx, dy);

      const isGameRunning = status === "playing";
      const acceleration = isGameRunning ? 0.044 : 0.014;

      if (!activeStun && distance > 42) {
        current.velocityX += dx * acceleration;
        current.velocityY += dy * acceleration;
      }

      current.velocityX *= activeStun ? 0.9 : 0.82;
      current.velocityY *= activeStun ? 0.9 : 0.82;

      const speed = Math.hypot(current.velocityX, current.velocityY);
      const maxSpeed = activeStun ? 8 : isGameRunning ? 17.5 : 6.4;

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
      const stunProgress = activeStun
        ? clamp(
            (now - activeStun.startedAt) /
              (activeStun.until - activeStun.startedAt),
            0,
            1,
          )
        : 0;
      const stunRotation = activeStun
        ? activeStun.kind === "banana-peel"
          ? 360 * activeStun.direction * stunProgress
          : activeStun.kind === "open-suitcase"
            ? -360 * activeStun.direction * stunProgress
            : Math.sin(stunProgress * Math.PI * 6) * 18
        : 0;
      const stunLift = activeStun
        ? activeStun.kind === "open-suitcase"
          ? -Math.sin(stunProgress * Math.PI) * 22
          : activeStun.kind === "banana-peel"
            ? Math.sin(stunProgress * Math.PI * 2) * 8
            : Math.sin(stunProgress * Math.PI) * 10
        : 0;

      riderElement.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      riderElement.setAttribute("data-stun-kind", activeStun?.kind ?? "none");
      spriteElement.style.transform = `translate(-50%, -50%) scaleX(${current.facing}) translateY(${bob + stunLift}px) rotate(${lean + stunRotation}deg)`;
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

      if (
        gameStatusRef.current === "playing" &&
        activePostcard?.status === "active" &&
        distanceBetween(riderPosition, activePostcard) < POSTCARD_CATCH_RADIUS
      ) {
        catchPostcard(now, activePostcard);
      }

      if (gameStatusRef.current === "playing") {
        handleObstacleCollisions(now);
      }

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

  const gameComplete = gameStatus === "won" || gameStatus === "lost";
  const hasWon = gameStatus === "won";
  const isPlaying = gameStatus === "playing";

  return (
    <>
      <div
        aria-label={`${score} of ${POSTCARD_TOTAL} postcards collected, ${timeLeft} seconds remaining`}
        data-testid="postboy-game-score"
        className="postboy-game-score"
      >
        <div className="postboy-game-title">Play to Win a Free Book</div>
        <div className="postboy-game-score-row">
          <span className="postboy-game-score-group">
            <span className="postboy-game-score-label">Postcards</span>
            <strong data-testid="postboy-game-count">{score}/{POSTCARD_TOTAL}</strong>
          </span>
          <span className="postboy-game-score-divider" aria-hidden="true" />
          <span className="postboy-game-score-group">
            <span className="postboy-game-score-label">Time</span>
            <strong data-testid="postboy-game-timer">{timeLeft}s</strong>
          </span>
          <span className="postboy-game-score-divider" aria-hidden="true" />
          <button
            type="button"
            data-testid="postboy-game-control"
            className="postboy-game-control"
            aria-label={isPlaying ? "Stop postcard game" : "Play postcard game"}
            onClick={isPlaying ? stopGame : () => startGame()}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="7" width="10" height="10" rx="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6.6v10.8L17.4 12 9 6.6z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {postcard ? (
        <div
          aria-hidden="true"
          data-testid="postboy-postcard"
          className={`postboy-game-postcard${
            postcard.status === "caught" ? " postboy-game-postcard-caught" : ""
          }`}
          style={
            {
              "--postcard-rotation": `${postcard.rotation}deg`,
              "--postcard-photo-bg": postcard.photoBackground,
              left: `${postcard.x}px`,
              top: `${postcard.y}px`,
            } as CSSProperties
          }
        >
          <div className="postboy-postcard-poof" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="postboy-game-postcard-paper">
            <div className="postboy-game-postcard-photo">
              <Image
                src={postcard.imageSrc}
                alt=""
                fill
                sizes="156px"
                className="postboy-game-postcard-art"
              />
            </div>
            <div className="postboy-game-postcard-caption">{postcard.label}</div>
          </div>
        </div>
      ) : null}
      {obstacles.map((obstacle) => {
        const asset = OBSTACLE_ASSETS[obstacle.kind];

        return (
          <div
            key={obstacle.id}
            aria-hidden="true"
            data-testid="postboy-obstacle"
            className={`postboy-obstacle postboy-obstacle-${obstacle.kind} postboy-obstacle-${obstacle.status}`}
            style={
              {
                "--obstacle-rotation": `${obstacle.rotation}deg`,
                "--rolling-duration": `${obstacle.duration}ms`,
                "--rolling-dx": `${obstacle.endX - obstacle.startX}px`,
                "--rolling-dy": `${obstacle.endY - obstacle.startY}px`,
                left: `${obstacle.startX}px`,
                top: `${obstacle.startY}px`,
              } as CSSProperties
            }
          >
            <div
              data-testid={`postboy-obstacle-${obstacle.kind}`}
              className="postboy-obstacle-visual"
            >
              <Image
                src={asset.imageSrc}
                alt=""
                width={asset.width}
                height={asset.height}
                sizes={asset.sizes}
                className="postboy-obstacle-image"
              />
            </div>
          </div>
        );
      })}
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
        data-stun-kind={postboyStun?.kind ?? "none"}
        data-testid="postboy-vespa-chaser"
        className="pointer-events-none fixed right-[7vw] top-28 z-40 hidden w-[clamp(86px,7vw,139px)] select-none opacity-0 transition-opacity duration-300 md:block"
      >
        <div
          ref={spriteRef}
          data-testid="postboy-vespa-sprite"
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
      {gameComplete ? (
        <div
          aria-modal="true"
          aria-label={hasWon ? "Free book unlocked" : "Try again to win a free book"}
          data-testid="postboy-reward-modal"
          role="dialog"
          className="postboy-reward-backdrop"
        >
          <div className="postboy-reward-modal">
            {hasWon ? (
              <div className="postboy-reward-confetti" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            ) : null}
            <button
              type="button"
              aria-label="Close postcard game result"
              className="postboy-reward-close"
              onClick={closeGameResult}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" />
              </svg>
            </button>
            {!hasWon ? (
              <p className="postboy-reward-kicker">Time&apos;s up</p>
            ) : null}
            <h2>
              {hasWon
                ? "Free book unlocked."
                : "Try again to win a free book."}
            </h2>
            {hasWon ? (
              <>
                <div className="postboy-reward-postboy" aria-hidden="true">
                  <Image
                    src="/marketing/postboy-onboarding-coffee-table-glory.png"
                    alt=""
                    width={900}
                    height={725}
                    sizes="190px"
                    className="postboy-reward-postboy-image"
                  />
                </div>
                <div className="postboy-reward-code">{REWARD_CODE}</div>
              </>
            ) : (
              <p>Postboy needs all 10 postcards before the clock runs out.</p>
            )}
            <p className="postboy-reward-fineprint">First order only.</p>
            <div className="postboy-reward-actions">
              {hasWon ? (
                <button type="button" onClick={handleCopyCode}>
                  {hasCopiedCode ? "Copied" : "Copy code"}
                </button>
              ) : null}
              <button type="button" onClick={handlePlayAgain}>
                {hasWon ? "Play again" : "Try again"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
