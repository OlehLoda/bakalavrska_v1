import { SVGProps } from "react";

export default function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.3115 4.70711C14.702 4.31658 15.3352 4.31658 15.7257 4.70711L16.2929 5.27432C16.6834 5.66484 16.6834 6.29801 16.2929 6.68853L11.67 11.3115C11.2794 11.702 11.2794 12.3352 11.67 12.7257L16.2929 17.3486C16.6834 17.7391 16.6834 18.3723 16.2929 18.7628L15.7257 19.33C15.3352 19.7206 14.702 19.7206 14.3115 19.33L7.70711 12.7257C7.31658 12.3352 7.31658 11.702 7.70711 11.3115L14.3115 4.70711Z"
        fill="black"
        fillOpacity="0.4"
      />
    </svg>
  );
}
