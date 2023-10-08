import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
    {...props}
  >
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      fill={props.fill === '#4c4c4c' ? '#d5dae0' : 'black'}
    />
    <path
      d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
      fill={props.fill ?? '#edf3fa'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const CheckIcon = memo(ForwardRef)
