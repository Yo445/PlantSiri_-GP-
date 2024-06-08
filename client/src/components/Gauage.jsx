import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";

const getCoordsOnArc = (angle, offset = 10) => [
  Math.cos(angle - (Math.PI / 2)) * offset,
  Math.sin(angle - (Math.PI / 2)) * offset,
];

export default function Gauge({
  value = 50,
  min = 0,
  max = 100,
  label,
  units,
  unitIcon, // Default unit icon
  strokeColor 
}) {
  const backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)();

  const percentScale = scaleLinear()
    .domain([min, max])
    .range([0, 1]);

  const percent = percentScale(value);

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);

  const angle = angleScale(percent);

  const filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)();

  const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#fff", strokeColor]); // Dynamically set color here

  const gradientSteps = colorScale.ticks(10)
    .map(value => colorScale(value));

  const markerLocation = getCoordsOnArc(angle, 1 - ((1 - 0.65) / 2));

  // Generate a unique ID for the gradient
  const gradientId = `Gauge__gradient_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ textAlign: "center" }}>
      <svg style={{ overflow: "visible" }} width="13em" viewBox="-1 -1 2 1">
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={backgroundArc} fill="#dbdbe7" />
        <path d={filledArc} fill={`url(#${gradientId})`} />
        <line y1="-1" y2="-0.65" stroke={strokeColor} strokeWidth="0.027" />
        <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.2"
          stroke={strokeColor}
          strokeWidth="0.01"
          fill={colorScale(percent)}
        />
        <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${angle * (180 / Math.PI)}) translate(-0.2, -0.33)`}
          fill="#556367"
        />
      </svg>
      <div style={{ color: strokeColor, marginTop: "1.2em", fontSize: "1.5em", lineHeight: "1em", fontWeight: "600", fontFeatureSettings: "'zero', 'tnum' 1", display: "flex", justifyContent: "center" }}>
        {value}
        {units && 
        <div style={{ lineHeight: "1em", fontWeight: "200", marginTop: "0.15em",marginLeft: '0.3em',fontSize: "20px", color: strokeColor }}>
          {units}
        </div>}
        {unitIcon && <div style={{ marginLeft: '0.2em', color: strokeColor }}>{unitIcon}</div>}

      </div>
      {/* {!!units && (
        <div style={{ lineHeight: "1em", fontWeight: "200", fontSize: "1.5em", color: strokeColor }}>
          {units}
        </div>
      )} */}
    </div>
  );
}