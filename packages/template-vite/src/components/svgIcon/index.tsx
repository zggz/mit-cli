import React, { memo, useMemo } from 'react'
export type svgProps = {
    name: string
    fill?: string
    fontSize?: string
    className?: string
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler<SVGSVGElement>
}
const SvgIcon: React.FC<svgProps> = memo(function SvgIcon ({
  name,
  fill,
  fontSize = '18px',
  className,
  onClick,
  style
}: svgProps) {
  const iconName = useMemo(() => '#icon-' + name, [name])
  return (
        <svg
            fontSize={fontSize!}
            style={{ ...svgStyle, fontSize, ...style }}
            aria-hidden="true"
            className={className!}
            onClick={onClick}
        >
            <use xlinkHref={iconName} fill={fill!} />
        </svg>
  )
})
const svgStyle = {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  overflow: 'hidden',
  fill: 'currentColor',
  fontSize: '1.1em'
}
export default SvgIcon
