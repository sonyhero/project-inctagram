import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  isActive?: boolean
}

const ACTIVE_LINK_COLOR = '#397df6'
const LINK_COLOR = '#fff'

const SvgComponent = (
  { isActive = true, ...props }: SVGProps<SVGSVGElement> & PropsType,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? ACTIVE_LINK_COLOR : LINK_COLOR}
    ref={ref}
    {...props}
  >
    <path d="M7 6C7.26522 6 7.51957 5.89464 7.70711 5.70711C7.89464 5.51957 8 5.26522 8 5C8 4.73478 7.89464 4.48043 7.70711 4.29289C7.51957 4.10536 7.26522 4 7 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H7C7.26522 20 7.51957 19.8946 7.70711 19.7071C7.89464 19.5196 8 19.2652 8 19C8 18.7348 7.89464 18.4804 7.70711 18.2929C7.51957 18.1054 7.26522 18 7 18H6V6H7Z" />
    <path d="M20.82 11.42L18 7.42001C17.8471 7.20442 17.615 7.05815 17.3545 7.01318C17.0941 6.96821 16.8264 7.02819 16.61 7.18001C16.5018 7.2558 16.4098 7.35226 16.3391 7.46382C16.2684 7.57538 16.2206 7.69983 16.1982 7.83C16.1759 7.96016 16.1796 8.09345 16.2091 8.22218C16.2386 8.35091 16.2933 8.47253 16.37 8.58001L18.09 11H10C9.73478 11 9.48043 11.1054 9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8947 9.73478 13 10 13H18L16.2 15.4C16.1212 15.5051 16.0639 15.6246 16.0313 15.7518C15.9987 15.879 15.9915 16.0114 16.01 16.1414C16.0286 16.2714 16.0726 16.3965 16.1395 16.5095C16.2064 16.6225 16.2949 16.7212 16.4 16.8C16.5731 16.9298 16.7836 17 17 17C17.1552 17 17.3084 16.9639 17.4472 16.8944C17.5861 16.825 17.7069 16.7242 17.8 16.6L20.8 12.6C20.9281 12.4309 20.999 12.2254 21.0026 12.0133C21.0062 11.8012 20.9423 11.5934 20.82 11.42Z" />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const LogOut = memo(ForwardRef)
