import React, { useState } from "react";
import { Orbit as OrbitIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TYPE DEFINITIONS & CUSTOMIZATION CONTRACTS
 * ============================================================================
 */

export interface SolarSystemItem {
  id: string;
  label: string;
  type?: string;
  badge?: string;
  desc?: string;
  color: string;
  svg: React.ReactNode;
}

export interface OrbitConfig {
  id: string;
  name: string;
  radiusClass: string;
  radiusPx: number;
  speed: number;
  items: SolarSystemItem[];
}

export interface SolarSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  centerLogo?: string | React.ReactNode;
  centerLogoAlt?: string;
  orbits?: OrbitConfig[];
  isPaused?: boolean;
  speedMultiplier?: number;
}

/**
 * ============================================================================
 * SVG ICONS — Manoj Kumar's actual tech stack
 * ============================================================================
 */
const Icons = {
  python: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M12 2C8.5 2 7 3.5 7 5v2h5v1H5.5C3.5 8 2 9.5 2 12s1.5 4 3.5 4H7v-2.5C7 12.1 8.1 11 9.5 11h5c1.4 0 2.5-1.1 2.5-2.5V5c0-1.4-1.6-3-5-3zm-1.5 2.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#387EB8"/>
      <path d="M12 22c3.5 0 5-1.5 5-3v-2h-5v-1h6.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H17v2.5c0 1.4-1.1 2.5-2.5 2.5h-5c-1.4 0-2.5 1.1-2.5 2.5V19c0 1.4 1.6 3 5 3zm1.5-2.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#FFD43B"/>
    </svg>
  ),
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" style={{ width: 20, height: 20 }} fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M6 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.8-1.7L7.2 15c-1.5-.6-2.5-1.4-2.5-3.1C4.7 10.4 5.9 9.2 7.7 9.2c1.3 0 2.2.4 2.9 1.5l-1.6 1c-.3-.6-.7-.8-1.3-.8-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.7.3c1.8.8 2.8 1.6 2.8 3.3 0 1.9-1.5 2.9-3.5 2.9-2 0-3.2-.9-3.8-2.1L6 17.5zm7.1.3c.4.8.9 1.4 2 1.4.8 0 1.4-.4 1.4-1.8v-7.4h2v7.5c0 2.9-1.7 4.2-4.2 4.2-2.2 0-3.5-1.2-4.1-2.5l1.9-1.4z" fill="#333"/>
    </svg>
  ),
  html5: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M3 2l1.7 19L12 23l7.3-2L21 2H3z" fill="#E34F26"/>
      <path d="M12 21.4l5.9-1.6L19 4.6H12v16.8z" fill="#EF652A"/>
      <path d="M12 13H8.6l-.2-2.5H12V8H6l.1 1.5.8 9 5.1 1.4V13zm0-9v2.5h6.1l-.2 2.5H12V11h5.7l-.5 5.5L12 18V20.5l5.9-1.6.8-8.9.1-1.5H12V4z" fill="#fff"/>
    </svg>
  ),
  css3: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M3 2l1.7 19L12 23l7.3-2L21 2H3z" fill="#1572B6"/>
      <path d="M12 21.4l5.9-1.6L19 4.6H12v16.8z" fill="#33A9DC"/>
      <path d="M12 13.5H8.7l-.2-2h3.5V9H6.2l.5 5.5h5.3v-1zm0-9v2H18.3l-.2 2.5H12V11h5.8l-.5 5.5L12 18V20.5l5.9-1.6L19 4.5H12z" fill="#fff"/>
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M9 3v8.5L4 19c-.5 1 .2 2 1.2 2h13.6c1 0 1.7-1 1.2-2L15 11.5V3H9z" stroke="#fff" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
      <path d="M4.5 18.5l3.5-7H16l3.5 7" fill="rgba(255,255,255,0.2)"/>
      <rect x="8" y="2" width="8" height="1.5" rx=".5" fill="#fff" opacity="0.5"/>
      <circle cx="9" cy="16" r="1" fill="#61DAFB"/>
      <circle cx="13" cy="18" r="1" fill="#61DAFB"/>
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M5.3 19L8.4 3.7l4.3 7.8-7.4 7.5z" fill="#FFA000"/>
      <path d="M10 14.5L12.6 11 15.6 19z" fill="#F57F17"/>
      <path d="M5.3 19l10.3-5.5L12.6 11z" fill="#FFCA28"/>
      <path d="M12.6 11L8.4 3.7l2.1 8.9z" fill="#FFA000"/>
    </svg>
  ),
  php: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <ellipse cx="12" cy="12" rx="11" ry="7" stroke="#777BB3" strokeWidth="1.5" fill="rgba(119,123,179,0.15)"/>
      <text x="4.5" y="16" fontSize="7.5" fontWeight="bold" fill="#777BB3" fontFamily="monospace">PHP</text>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M9.37 17.51s-1 .58.7.77c2.04.24 3.08.2 5.33-.22 0 0 .59.37 1.41.69-5.01 2.15-11.34-.12-7.44-.74v-.5zM8.65 14.94s-1.12.83.59 1.01c2.21.23 3.95.25 6.97-.34 0 0 .43.44 1.11.68-6.17 1.81-13.04.14-8.67-.85v-.5z" fill="#5382A1"/>
      <path d="M14.27 10.68c1.26 1.44-.33 2.73-.33 2.73s3.2-1.65 1.73-3.72c-1.37-1.94-2.42-2.9 3.26-6.22 0 0-8.91 2.23-4.66 7.21z" fill="#E76F00"/>
      <path d="M21.7 19.45s.74.61-.82 1.09c-2.97.9-12.36 1.17-14.97 0-1.13-.49.1-1.17.44-1.31h.49c-1.06-.74-6.85 1.47-2.94 2.1 10.66 1.73 19.44-.78 17.8-1.88zM9.67 12.59s-4.91 1.17-1.74 1.59c1.34.21 4 .16 6.48-.08 2.03-.2 4.07-.63 4.07-.63s-.71.3-1.22.65c-4.93 1.3-14.45.69-11.71-.63 2.32-1.11 4.12-1.1 4.12-.9z" fill="#5382A1"/>
      <path d="M19.4 16.44c5.01-2.6 2.69-5.1 1.08-4.77-.4.08-.58.16-.58.16s.15-.24.43-.34c3.24-.96 5.73 3.36-1.03 5.15-.01.03 0 0 .1.3v-.5z" fill="#E76F00"/>
      <path d="M15.57 2.04s2.8 2.8-2.66 7.1c-4.37 3.45-.99 5.41 0 7.66-2.55-2.3-4.42-4.33-3.17-6.22 1.85-2.77 6.97-4.12 5.83-8.54z" fill="#E76F00"/>
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" stroke="#4FC3F7" strokeWidth="1.5" fill="rgba(79,195,247,0.15)"/>
      <path d="M4 5.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="#4FC3F7" strokeWidth="1.5" fill="none"/>
      <path d="M4 9.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="#4FC3F7" strokeWidth="1.5" fill="none"/>
      <path d="M4 13.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="#4FC3F7" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M23 11.97L12.03 1a1.02 1.02 0 00-1.45 0l-2.9 2.9 1.83 1.83a2.42 2.42 0 013.07 3.08l1.77 1.77a2.42 2.42 0 01.64 4.78 2.42 2.42 0 01-2.33-4.07l-1.65-1.66v4.37a2.42 2.42 0 11-2-2.39V8.8a2.42 2.42 0 01-1.46-3.08L5.7 3.89 1 8.59a1.02 1.02 0 000 1.45l11 10.96a1.02 1.02 0 001.45 0L23 13.42a1.02 1.02 0 000-1.45z" fill="#F05032"/>
    </svg>
  ),
  opencv: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <circle cx="12" cy="12" r="9" stroke="#5C8DBC" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="4.5" fill="rgba(92,141,188,0.25)" stroke="#5C8DBC" strokeWidth="1"/>
      <circle cx="12" cy="12" r="1.5" fill="#5C8DBC"/>
      <line x1="12" y1="3" x2="12" y2="7.5" stroke="#5C8DBC" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="16.5" x2="12" y2="21" stroke="#5C8DBC" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="7.5" y2="12" stroke="#5C8DBC" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16.5" y1="12" x2="21" y2="12" stroke="#5C8DBC" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none">
      <path d="M21 3L13.5 16.5l-1.5-5.5L7.5 13 12 3z" fill="#BD34FE"/>
      <path d="M3 3l9 14-1.5-5.5L13.5 13z" fill="#41D1FF"/>
    </svg>
  ),
};

/**
 * ============================================================================
 * DEFAULT ORBITS — Manoj Kumar S's Tech Stack
 * ============================================================================
 */
const DEFAULT_ORBITS: OrbitConfig[] = [
  {
    id: "inner",
    name: "Core Stack",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 20,
    items: [
      { id: "python",     label: "Python",     color: "#387EB8", svg: Icons.python },
      { id: "react",      label: "React.js",   color: "#61DAFB", svg: Icons.react },
      { id: "javascript", label: "JavaScript", color: "#F7DF1E", svg: Icons.javascript },
      { id: "html5",      label: "HTML5",      color: "#E34F26", svg: Icons.html5 },
    ],
  },
  {
    id: "mid",
    name: "Backend & Tools",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 32,
    items: [
      { id: "flask",    label: "Flask",    color: "#ffffff", svg: Icons.flask },
      { id: "firebase", label: "Firebase", color: "#FFCA28", svg: Icons.firebase },
      { id: "css3",     label: "CSS3",     color: "#1572B6", svg: Icons.css3 },
      { id: "java",     label: "Java",     color: "#5382A1", svg: Icons.java },
    ],
  },
  {
    id: "outer",
    name: "DB, AI & DevTools",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 48,
    items: [
      { id: "sql",    label: "SQL",     color: "#4FC3F7", svg: Icons.sql },
      { id: "git",    label: "Git",     color: "#F05032", svg: Icons.git },
      { id: "opencv", label: "OpenCV",  color: "#5C8DBC", svg: Icons.opencv },
      { id: "vite",   label: "Vite",    color: "#BD34FE", svg: Icons.vite },
    ],
  },
];

export const SolarSystem = React.forwardRef<HTMLDivElement, SolarSystemProps>(
  (
    {
      centerLogo,
      centerLogoAlt = "Core Engine",
      orbits = DEFAULT_ORBITS,
      isPaused = false,
      speedMultiplier = 1,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const dustItems = [
      { delay: "-4s",  radius: "165px", color: "#00f5d4" },
      { delay: "-11s", radius: "260px", color: "#a855f7" },
      { delay: "-19s", radius: "340px", color: "#3b82f6" },
      { delay: "-28s", radius: "395px", color: "#00f5d4" },
      { delay: "-7s",  radius: "200px", color: "#ec4899" },
      { delay: "-15s", radius: "365px", color: "#eab308" },
      { delay: "-23s", radius: "430px", color: "#a855f7" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "solar-system-root",
          className
        )}
        {...props}
      >
        {/* ── Injected Keyframes & Styles ── */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Orbit radius CSS variables */
          :root {
            --radius-inner: 175px;
            --radius-mid:   285px;
            --radius-outer: 395px;
          }
          @media (max-width: 768px) {
            :root {
              --radius-inner: 95px;
              --radius-mid:   155px;
              --radius-outer: 215px;
            }
          }
          @media (max-width: 480px) {
            :root {
              --radius-inner: 68px;
              --radius-mid:   108px;
              --radius-outer: 150px;
            }
          }

          /* Outer wrapper */
          .solar-system-root {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 940px;
            height: 320px;
            perspective: 1200px;
            user-select: none;
            overflow: visible;
          }
          @media (min-width: 768px) {
            .solar-system-root { height: 450px; }
          }

          /* Tiltable container */
          .solar-orbit-tilt {
            position: absolute;
            width: 360px;
            height: 360px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotateX(65deg) rotateY(-10deg);
            transform-style: preserve-3d;
          }
          @media (min-width: 768px) {
            .solar-orbit-tilt {
              width: 940px;
              height: 940px;
            }
          }

          /* Sun core wrapper */
          .solar-sun-core {
            position: absolute;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20;
            pointer-events: none;
            transform: rotateY(10deg) rotateX(-65deg);
            transform-style: preserve-3d;
          }
          @media (min-width: 768px) {
            .solar-sun-core { width: 130px; height: 130px; }
          }

          /* Sun glow aura */
          .solar-sun-glow {
            position: absolute;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            filter: blur(12px);
            z-index: 10;
            background: rgba(0,255,135,0.22);
            animation: custom-sun-pulse 4s ease-in-out infinite alternate;
          }
          @media (min-width: 768px) {
            .solar-sun-glow { width: 120px; height: 120px; }
          }

          /* Sun logo circle */
          .solar-sun-logo {
            width: 56px; height: 56px;
            border-radius: 50%;
            border: 2px solid rgba(0,255,135,0.4);
            box-shadow: 0 0 30px rgba(0,255,135,0.3);
            z-index: 20;
            background: #09090b;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            position: relative;
          }
          @media (min-width: 768px) {
            .solar-sun-logo { width: 80px; height: 80px; padding: 12px; }
          }

          /* Sun dash rings */
          .solar-ring-inner-dash {
            position: absolute;
            width: 110px; height: 110px;
            border-radius: 50%;
            border: 1px dashed rgba(0,255,135,0.2);
            pointer-events: none;
            animation: custom-spin-clockwise 20s linear infinite;
          }
          .solar-ring-outer-dash {
            position: absolute;
            width: 150px; height: 150px;
            border-radius: 50%;
            border: 1px dashed rgba(0,255,135,0.1);
            pointer-events: none;
            animation: custom-spin-counter 30s linear infinite;
          }
          @media (min-width: 768px) {
            .solar-ring-inner-dash { width: 140px; height: 140px; }
            .solar-ring-outer-dash { width: 185px; height: 185px; }
          }

          /* Keyframes */
          @keyframes custom-orbitMove {
            0%   { transform: translate(-50%, -50%) rotateZ(0deg)    translateX(var(--orbit-radius)); }
            100% { transform: translate(-50%, -50%) rotateZ(-360deg) translateX(var(--orbit-radius)); }
          }
          @keyframes custom-billboardCancel {
            0%   { transform: translate(-50%, -50%) rotateZ(0deg)   rotateY(10deg) rotateX(-65deg); }
            100% { transform: translate(-50%, -50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg); }
          }
          @keyframes custom-sun-pulse {
            0%   { transform: scale(0.9); opacity: 0.7; }
            100% { transform: scale(1.1); opacity: 1;   }
          }
          @keyframes custom-spin-clockwise {
            0%   { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg);   }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0%   { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg);    }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(-360deg); }
          }
          @keyframes orbit-icon-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-sun-pulse {
            animation: custom-sun-pulse 4s ease-in-out infinite alternate;
          }
          .animate-custom-spin-cw  { animation: custom-spin-clockwise 20s linear infinite; }
          .animate-custom-spin-ccw { animation: custom-spin-counter   30s linear infinite; }

          /* Planet logo cards */
          .orbit-logo-card {
            position: absolute;
            left: 50%; top: 50%;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0.45rem 0.95rem;
            background: rgba(10, 10, 12, 0.65);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 100px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            transition: border-color 0.3s, color 0.3s, background 0.3s, box-shadow 0.3s, scale 0.3s;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
            font-size: 11px;
            letter-spacing: -0.025em;
          }
          @media (min-width: 768px) {
            .orbit-logo-card { font-size: 13px; }
          }
        `}} />

        {/* ── Tiltable Orbit Container ── */}
        <div
          className="solar-orbit-tilt"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── Central Sun Core ── */}
          <div className="solar-sun-core">
            <div className="solar-sun-glow animate-custom-sun-pulse" />

            {centerLogo ? (
              typeof centerLogo === "string" ? (
                <img
                  className="solar-sun-logo"
                  src={centerLogo}
                  alt={centerLogoAlt}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="solar-sun-logo">{centerLogo}</div>
              )
            ) : (
              <div className="solar-sun-logo">
                <OrbitIcon
                  style={{
                    width: 32, height: 32,
                    color: "rgb(45,212,191)",
                    animation: "orbit-icon-spin 10s linear infinite",
                  }}
                />
              </div>
            )}

            <div className="solar-ring-inner-dash animate-custom-spin-cw" />
            <div className="solar-ring-outer-dash animate-custom-spin-ccw" />
          </div>

          {/* ── Cosmic Dust Particles ── */}
          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="animate-custom-orbit"
              style={{
                position: "absolute", left: "50%", top: "50%",
                width: 4, height: 4, borderRadius: "50%",
                opacity: 0.4, pointerEvents: "none",
                background: dust.color,
                boxShadow: `0 0 6px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                ["--orbit-radius" as any]: dust.radius,
                ["--orbit-duration" as any]: `${24 / speedMultiplier}s`,
                ["--orbit-play-state" as any]: isPaused ? "paused" : "running",
              }}
            />
          ))}

          {/* ── Orbit Rings & Planet Nodes ── */}
          {orbits.map((orbit) => (
            <React.Fragment key={orbit.id}>

              {/* Planet nodes */}
              {orbit.items.map((item, idx, arr) => {
                const delayValue    = -(orbit.speed / arr.length) * idx;
                const durationValue = orbit.speed / speedMultiplier;
                const isHovered     = hoveredId === item.id;

                return (
                  <div
                    key={item.id}
                    className="animate-custom-orbit"
                    style={{
                      position: "absolute", left: "50%", top: "50%",
                      width: 0, height: 0,
                      pointerEvents: "none",
                      animationDelay: `${delayValue}s`,
                      animationDuration: `${durationValue}s`,
                      animationPlayState: isPaused ? "paused" : "running",
                      ["--orbit-radius" as any]: orbit.radiusClass,
                      ["--orbit-duration" as any]: `${durationValue}s`,
                      ["--orbit-play-state" as any]: isPaused ? "paused" : "running",
                      zIndex: isHovered ? 30 : 10,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Laser beam */}
                    <div
                      style={{
                        position: "absolute",
                        right: 0, top: "50%",
                        height: "1.5px",
                        transformOrigin: "right",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        transition: "opacity 0.3s",
                        zIndex: 0,
                        width: orbit.radiusClass,
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 20%, ${item.color} 80%, ${item.color} 100%)`,
                        boxShadow: `0 0 8px ${item.color}, 0 0 16px ${item.color}40`,
                      }}
                    />

                    {/* Planet card */}
                    <div
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="orbit-logo-card animate-custom-billboard"
                      style={{
                        animationDelay: `${delayValue}s`,
                        animationDuration: `${durationValue}s`,
                        animationPlayState: isPaused ? "paused" : "running",
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered
                          ? `0 0 20px rgba(0,0,0,0.6), 0 0 15px ${item.color}35`
                          : undefined,
                        scale: isHovered ? "1.05" : "1",
                        ["--orbit-duration" as any]: `${durationValue}s`,
                        ["--orbit-play-state" as any]: isPaused ? "paused" : "running",
                      }}
                    >
                      <div
                        style={{
                          transition: "transform 0.3s",
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                          color: item.color,
                          display: "flex",
                        }}
                      >
                        {item.svg}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

SolarSystem.displayName = "SolarSystem";
