import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 192 192"
    fill="none"
    ref={ref}
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

    <g id="SVGRepo_iconCarrier">
      <circle cx="96" cy="96" r="74" stroke="#fff" strokeWidth="9.6" />

      <ellipse cx="96" cy="96" stroke="#fff" strokeWidth="9.6" rx="30" ry="74" />

      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.6"
        d="M28 72h136M28 120h136"
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const BrowserIcon = memo(ForwardRef)
