import React, { type JSX } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

const technologies = [
  {
    name: "Astro",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 410 512.32"><path fill="#007a55" fillRule="nonzero" d="M0 335.49s69.19-33.61 138.56-33.61l52.31-161.48c1.96-7.81 7.68-13.12 14.13-13.12 6.46 0 12.17 5.31 14.13 13.12l52.31 161.48c82.17 0 138.56 33.61 138.56 33.61S292.49 16.16 292.26 15.52C288.88 6.08 283.19 0 275.51 0H134.5c-7.68 0-13.14 6.08-16.74 15.52C117.5 16.15 0 335.49 0 335.49zm127.25 94.89c-25.3-22.82-32.69-70.78-22.15-105.52 18.28 21.9 43.6 28.84 69.84 32.76 40.49 6.04 80.27 3.78 117.89-14.48 4.3-2.09 8.28-4.87 12.98-7.69 3.53 10.1 4.45 20.31 3.22 30.69-3 25.29-15.76 44.83-36.04 59.64-8.11 5.92-16.69 11.21-25.07 16.8-25.74 17.16-32.7 37.29-23.03 66.57.23.71.43 1.43.95 3.17-13.14-5.81-22.74-14.26-30.05-25.37-7.72-11.72-11.4-24.69-11.59-38.73-.1-6.83-.1-13.72-1.03-20.45-2.27-16.42-10.08-23.77-24.79-24.19-15.1-.43-27.05 8.78-30.21 23.28-.25 1.12-.6 2.21-.95 3.51l.03.01z"/></svg>
    )
  },
  {
    name: "React",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="64" height="64">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#007a55"/>
      <g stroke="#007a55" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
    )
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 128 128" width="64" height="64">
        <path fill="#007a55" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"></path>
      </svg>
    )
  },
  {
    name: "Node.js",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid" fill="#007a55"><path d="M14.656.427c.8-.453 1.82-.455 2.6 0L29.2 7.16c.747.42 1.247 1.253 1.24 2.114v13.5c.005.897-.544 1.748-1.332 2.16l-11.88 6.702a2.6 2.6 0 0 1-2.639-.073l-3.565-2.06c-.243-.145-.516-.26-.688-.495.152-.204.422-.23.642-.32.496-.158.95-.4 1.406-.656.115-.08.256-.05.366.022l3.04 1.758c.217.125.437-.04.623-.145l11.665-6.583c.144-.07.224-.222.212-.38V9.334c.016-.18-.087-.344-.25-.417L16.19 2.244a.41.41 0 0 0-.465-.001L3.892 8.93c-.16.073-.27.235-.25.415v13.37c-.014.158.07.307.215.375l3.162 1.785c.594.32 1.323.5 1.977.265a1.5 1.5 0 0 0 .971-1.409l.003-13.29c-.014-.197.172-.36.363-.34h1.52c.2-.005.357.207.33.405L12.18 23.88c.001 1.188-.487 2.48-1.586 3.063-1.354.7-3.028.553-4.366-.12l-3.4-1.88c-.8-.4-1.337-1.264-1.332-2.16v-13.5a2.46 2.46 0 0 1 1.282-2.141L14.656.427zM18.1 9.785c1.727-.1 3.576-.066 5.13.785 1.203.652 1.87 2.02 1.892 3.358-.034.18-.222.28-.394.267-.5-.001-1.002.007-1.504-.003-.213.008-.336-.188-.363-.376-.144-.64-.493-1.273-1.095-1.582-.924-.463-1.996-.44-3.004-.43-.736.04-1.527.103-2.15.535-.48.328-.624 1-.453 1.522.16.383.603.506.964.62 2.082.544 4.287.5 6.33 1.207.845.292 1.672.86 1.962 1.745.378 1.186.213 2.604-.63 3.556-.684.784-1.68 1.2-2.675 1.442-1.323.295-2.695.302-4.038.17-1.263-.144-2.577-.476-3.552-1.336-.834-.724-1.24-1.852-1.2-2.94.01-.184.193-.312.37-.297h1.5c.202-.014.35.16.36.35.093.6.322 1.25.854 1.6 1.026.662 2.313.616 3.487.635.973-.043 2.065-.056 2.86-.7.42-.367.543-.98.43-1.508-.123-.446-.6-.653-1-.8-2.055-.65-4.285-.414-6.32-1.15-.826-.292-1.625-.844-1.942-1.693-.443-1.2-.24-2.687.693-3.607.9-.915 2.22-1.268 3.47-1.394z"/></svg>
    )
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 128 128" width="64" height="64">
        <path fill="#007a55" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"></path>
      </svg>
    )
  }
];

function TechCard({ name, svg }: { name: string; svg: JSX.Element }) {
  return (
    <figure className={cn("relative w-32 overflow-hidden rounded-xl p-4")}>
      <div className="flex flex-col items-center gap-2">
        {svg}
        <figcaption className="text-sm font-medium">{name}</figcaption>
      </div>
    </figure>
  );
}

export default function TechMarquee(): JSX.Element {
  return (
    <div className="">
      <Marquee pauseOnHover className="[--duration:20s]">
        {technologies.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
    </div>
  );
}