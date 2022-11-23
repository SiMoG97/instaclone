import React from "react";
import { SVGUniqueID } from "react-svg-unique-id";

const StoryCircleSvg = ({ className = "" }: { className: string }) => {
  return (
    <SVGUniqueID>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className={className}
      >
        <defs>
          <linearGradient
            id="prefix__bga"
            x1="0.03"
            y1="0.68"
            x2="0.97"
            y2="0.32"
          >
            <stop offset="0%" stopColor="#FCAF45" />
            <stop offset="55%" stopColor="#e1306c" />
            <stop offset="87%" stopColor="#833ab4" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" stroke="url(#prefix__bga)" />
      </svg>
    </SVGUniqueID>
  );
};

export default StoryCircleSvg;
