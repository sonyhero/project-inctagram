import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="96"
    height="64"
    viewBox="0 0 96 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_4735_12457)">
      <path
        d="M5.89474 0.5H90.1053C93.097 0.5 95.5 2.8598 95.5 5.74359V58.2564C95.5 61.1402 93.097 63.5 90.1053 63.5H5.89474C2.90298 63.5 0.5 61.1402 0.5 58.2564V5.74359C0.5 2.8598 2.90298 0.5 5.89474 0.5Z"
        fill="#171717"
        stroke="#333333"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.4392 32.4244L43.8571 29.7621L42.9261 29.7404H38.4805L41.57 10.0942C41.5796 10.0347 41.6107 9.97953 41.6562 9.94024C41.7019 9.90094 41.76 9.87939 41.8209 9.87939H49.3172C51.8059 9.87939 53.5233 10.3987 54.4199 11.4237C54.8404 11.9046 55.108 12.4072 55.2376 12.9601C55.3735 13.5404 55.3758 14.2337 55.2432 15.0793L55.2336 15.1409V15.6828L55.654 15.9217C56.0079 16.11 56.2893 16.3255 56.5051 16.5722C56.8646 16.9835 57.0972 17.5062 57.1955 18.1255C57.2971 18.7626 57.2635 19.521 57.0972 20.3794C56.9053 21.3667 56.5953 22.2267 56.1766 22.9303C55.7914 23.5787 55.3008 24.1166 54.718 24.5332C54.1619 24.9293 53.501 25.2299 52.7538 25.4222C52.0295 25.6112 51.2041 25.7066 50.2986 25.7066H49.7151C49.2982 25.7066 48.893 25.8574 48.5749 26.1273C48.2559 26.4031 48.045 26.7798 47.9803 27.1916L47.9363 27.4314L47.1978 32.124L47.1643 32.2961C47.1554 32.3508 47.1402 32.3779 47.1178 32.3963C47.098 32.4132 47.0693 32.4244 47.0412 32.4244H43.4392Z"
        fill="#28356A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.0518 15.2031C56.0297 15.3466 56.004 15.4931 55.9752 15.6439C54.9867 20.734 51.6046 22.4925 47.2851 22.4925H45.0857C44.5573 22.4925 44.1121 22.877 44.03 23.3995L42.585 32.5915C42.5316 32.9348 42.7952 33.2438 43.1403 33.2438H47.0413C47.503 33.2438 47.8955 32.9073 47.9683 32.4505L48.0065 32.2519L48.7409 27.5777L48.7883 27.3213C48.8601 26.8628 49.2534 26.5261 49.7152 26.5261H50.2986C54.0779 26.5261 57.0365 24.9875 57.9013 20.5344C58.2623 18.6742 58.0755 17.121 57.1196 16.0285C56.8304 15.6993 56.4716 15.4258 56.0518 15.2031Z"
        fill="#298FC2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.0181 14.7899C54.867 14.7457 54.7113 14.7057 54.5514 14.6696C54.3907 14.6343 54.2261 14.6031 54.0566 14.5757C53.4638 14.4797 52.8139 14.4341 52.1179 14.4341H46.2424C46.0976 14.4341 45.9602 14.4669 45.8372 14.5261C45.5661 14.6568 45.3648 14.9141 45.3162 15.229L44.0662 23.1685L44.0303 23.3999C44.1125 22.8773 44.5578 22.4927 45.0859 22.4927H47.2853C51.6048 22.4927 54.987 20.7334 55.9757 15.644C56.0051 15.4934 56.0299 15.3469 56.0521 15.2034C55.802 15.0703 55.5312 14.9565 55.2396 14.8595C55.1674 14.8355 55.0931 14.8124 55.0181 14.7899Z"
        fill="#22284F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.3162 15.229C45.365 14.9141 45.5661 14.6568 45.8372 14.527C45.961 14.4675 46.0976 14.4348 46.2424 14.4348H52.1179C52.8139 14.4348 53.4638 14.4806 54.0568 14.5767C54.2261 14.6038 54.3907 14.6352 54.5514 14.6705C54.7113 14.7064 54.867 14.7466 55.0181 14.7906C55.0931 14.813 55.1674 14.8364 55.2403 14.8595C55.5319 14.9565 55.803 15.0712 56.0531 15.2034C56.3472 13.3224 56.0506 12.0417 55.0365 10.8819C53.9184 9.60502 51.9006 9.05859 49.3184 9.05859H41.8219C41.2946 9.05859 40.8447 9.44316 40.7631 9.96667L37.6408 29.8148C37.5792 30.2074 37.8813 30.5618 38.2762 30.5618H42.9041L45.3162 15.229Z"
        fill="#28356A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.3524 37.8281H15.8868C15.5127 37.8281 15.1946 38.1006 15.1362 38.471L12.9256 52.5261C12.8818 52.8036 13.096 53.0534 13.3765 53.0534H15.9857C16.3597 53.0534 16.6778 52.7811 16.7363 52.41L17.3324 48.619C17.3899 48.2479 17.7087 47.9755 18.0821 47.9755H19.8122C23.4126 47.9755 25.4903 46.2281 26.0332 42.766C26.2777 41.2512 26.0435 40.0611 25.336 39.2276C24.5593 38.3123 23.1815 37.8281 21.3524 37.8281ZM21.9828 42.9616C21.6839 44.9283 20.1855 44.9283 18.7367 44.9283H17.9118L18.4904 41.2552C18.5248 41.0332 18.7165 40.8697 18.9404 40.8697H19.3185C20.3055 40.8697 21.2365 40.8697 21.7175 41.4339C22.0045 41.7704 22.0922 42.2706 21.9828 42.9616Z"
        fill="#28356A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.8296 42.7919H35.2122C34.9893 42.7919 34.7965 42.9554 34.7622 43.1774L34.6463 43.9114L34.4634 43.6454C33.8969 42.8207 32.6331 42.5449 31.3722 42.5449C28.4798 42.5449 26.0096 44.7418 25.5285 47.8234C25.2784 49.3606 25.6339 50.8305 26.5035 51.8556C27.3012 52.7981 28.4424 53.1908 29.8001 53.1908C32.1306 53.1908 33.4227 51.6881 33.4227 51.6881L33.3061 52.4175C33.2623 52.6963 33.4765 52.9464 33.7554 52.9464H36.1128C36.4877 52.9464 36.8042 52.6739 36.8634 52.3028L38.2779 43.3192C38.3226 43.0426 38.1091 42.7919 37.8296 42.7919ZM34.1811 47.9006C33.9286 49.3998 32.7421 50.4065 31.2282 50.4065C30.4683 50.4065 29.8611 50.162 29.4708 49.6989C29.084 49.2389 28.9371 48.5841 29.06 47.8547C29.296 46.368 30.5026 45.3284 31.9933 45.3284C32.7364 45.3284 33.3406 45.5764 33.7386 46.0433C34.1372 46.5153 34.2956 47.1743 34.1811 47.9006Z"
        fill="#28356A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.5675 43.0166H48.9372C48.6863 43.0166 48.4506 43.1417 48.3084 43.3509L44.6808 48.7094L43.1431 43.56C43.0465 43.2377 42.75 43.0166 42.4144 43.0166H39.83C39.5157 43.0166 39.2977 43.3245 39.3975 43.6211L42.2945 52.1469L39.571 56.0028C39.3568 56.3065 39.5724 56.7241 39.9425 56.7241H42.5695C42.8189 56.7241 43.0521 56.6021 43.1936 56.3972L51.9414 43.734C52.1509 43.4311 51.9358 43.0166 51.5675 43.0166Z"
        fill="#28356A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.3355 37.8281H54.8693C54.4961 37.8281 54.1779 38.1006 54.1195 38.471L51.909 52.5261C51.8652 52.8036 52.0794 53.0534 52.3582 53.0534H55.1634C55.4238 53.0534 55.6467 52.8629 55.6875 52.6032L56.3149 48.619C56.3724 48.2479 56.6915 47.9755 57.0646 47.9755H58.7941C62.395 47.9755 64.4721 46.2281 65.0157 42.766C65.261 41.2512 65.0253 40.0611 64.3179 39.2276C63.5417 38.3123 62.1648 37.8281 60.3355 37.8281ZM60.9661 42.9616C60.668 44.9283 59.1695 44.9283 57.7199 44.9283H56.8961L57.4754 41.2552C57.5096 41.0332 57.6998 40.8697 57.9244 40.8697H58.3025C59.2886 40.8697 60.2205 40.8697 60.7015 41.4339C60.9885 41.7704 61.0755 42.2706 60.9661 42.9616Z"
        fill="#298FC2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.8093 42.7919H74.1935C73.9691 42.7919 73.778 42.9554 73.7444 43.1774L73.6286 43.9114L73.4447 43.6454C72.8781 42.8207 71.6154 42.5449 70.3542 42.5449C67.4621 42.5449 64.9927 44.7418 64.5117 47.8234C64.2623 49.3606 64.6162 50.8305 65.4856 51.8556C66.2851 52.7981 67.4245 53.1908 68.7824 53.1908C71.1127 53.1908 72.4049 51.6881 72.4049 51.6881L72.2884 52.4175C72.2445 52.6963 72.4585 52.9464 72.7391 52.9464H75.0959C75.4691 52.9464 75.7871 52.6739 75.8455 52.3028L77.2609 43.3192C77.3041 43.0426 77.0897 42.7919 76.8093 42.7919ZM73.1612 47.9006C72.9102 49.3998 71.7218 50.4065 70.208 50.4065C69.4496 50.4065 68.8408 50.162 68.4505 49.6989C68.0641 49.2389 67.9184 48.5841 68.0397 47.8547C68.2773 46.368 69.4824 45.3284 70.973 45.3284C71.7162 45.3284 72.3203 45.5764 72.7184 46.0433C73.1186 46.5153 73.2769 47.1743 73.1612 47.9006Z"
        fill="#298FC2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79.6772 38.2144L77.4339 52.5267C77.3901 52.8043 77.6041 53.0541 77.883 53.0541H80.1383C80.5132 53.0541 80.8312 52.7818 80.8886 52.4107L83.1008 38.3563C83.1449 38.0789 82.9306 37.8281 82.6517 37.8281H80.1264C79.9035 37.8288 79.7116 37.9925 79.6772 38.2144Z"
        fill="#298FC2"
      />
    </g>
    <defs>
      <clipPath id="clip0_4735_12457">
        <rect width="96" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Paypal = memo(ForwardRef)
