import { SVGProps } from 'react'

const Icons = {
  copy: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path>
      <path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
    </svg>
  ),
  checkShield: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"></path>
    </svg>
  ),
  creditCard: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 4H4c-1.103 0-2 .897-2 2v2h20V6c0-1.103-.897-2-2-2zM2 18c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-6H2v6zm3-3h6v2H5v-2z"></path>
    </svg>
  ),
  server: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 5h-2V6h2zm4 0h-2V6h2zm1 5H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm-5 5h-2v-2h2zm4 0h-2v-2h2z"></path>
    </svg>
  ),
  fastForward: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m19 12-7-5v10zM5 7v10l7-5z"></path>
    </svg>
  ),
}

export type IconName = keyof typeof Icons

export interface IconProps extends Omit<SVGProps<SVGElement>, 'fill' | 'width' | 'height' | 'viewBox'> {
  name: IconName
}

const defaultProps: SVGProps<SVGElement> = {
  fill: 'currentColor',
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
}

const Icon = ({ name, ...props }: IconProps): JSX.Element => {
  return Icons[name]({ ...props, ...defaultProps })
}

export default Icon
