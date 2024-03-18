import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="-2 4 24 24"
    fill="#fff"
    ref={ref}
    {...props}
  >
    <path d="M10.313 4.781c6.156 0 10.531 4.531 10.531 11.156 0 6.156-4.375 11.25-10.531 11.25s-10.313-5.094-10.313-11.25c0-6.5 4.156-11.156 10.313-11.156zM10.344 24.656c3.25 0 3.938-3.75 3.938-8.563 0-5.781-0.875-8.844-3.938-8.844-3.531 0-3.813 4.125-3.813 9.281 0 4.813 0.906 8.125 3.813 8.125z"></path>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const OperaIcon = memo(ForwardRef)
