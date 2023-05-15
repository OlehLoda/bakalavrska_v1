import { SVGProps } from "react";

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="18" cy="18" r="17.5" stroke="black" />
      <rect
        x="18.75"
        y="27.75"
        width="0.5"
        height="20.5"
        transform="rotate(180 18.75 27.75)"
        fill="black"
        stroke="black"
        strokeWidth="0.5"
      />
      <rect
        x="7.25"
        y="17.75"
        width="0.5"
        height="21.5"
        transform="rotate(-90 7.25 17.75)"
        fill="black"
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
}
