import React from 'react'

type BrandmarkVariant = 'navy' | 'white' | 'aqua' | 'duotone' | 'duotone-white'

const BODY_FILL: Record<BrandmarkVariant, string> = {
  navy: '#1A3580',
  white: '#FFFFFF',
  aqua: '#32B9CD',
  duotone: '#22398E',
  'duotone-white': '#FFFFFF',
}

/**
 * The parkingyou beeldmerk. `duotone`/`duotone-white` render the full three-tone
 * mark (as used for the wordmark logo); the other variants render only the body
 * shape as a flat numbered-pin badge (see `Pin`).
 */
export function Brandmark({
  variant = 'navy',
  className,
}: {
  variant?: BrandmarkVariant
  className?: string
}) {
  const isDuotone = variant === 'duotone' || variant === 'duotone-white'
  const ringFill = variant === 'duotone-white' ? '#22398E' : '#FFFFFF'
  const dotFill = '#46BED6'

  return (
    <svg viewBox="0 0 2292 2751" className={className} aria-hidden="true">
      <g transform="matrix(1,0,0,1,-2401.239583,-0.002917)">
        <g transform="matrix(4.166667,0,0,4.166667,0,0)">
          <g transform="matrix(1,0,0,1,576.2975,388.4327)">
            <path
              d="M0,-113.455C0,-265.321 123.122,-388.432 275,-388.432C426.878,-388.432 550,-265.321 550,-113.455C550,38.411 426.878,161.522 275,161.522L275,258.348C275,268.603 263.753,274.977 254.998,269.637C254.998,269.637 0,141.722 0,-113.455"
              fill={BODY_FILL[variant]}
            />
          </g>
        </g>
        {isDuotone && (
          <>
            <g transform="matrix(4.166667,0,0,4.166667,0,0)">
              <g transform="matrix(0,1,1,0,851.2974,110.0006)">
                <path
                  d="M165,-165C73.873,-165 0,-91.127 0,0C0,91.127 73.873,165 165,165C256.127,165 330,91.127 330,0C330,-91.127 256.127,-165 165,-165"
                  fill={ringFill}
                />
              </g>
            </g>
            <g transform="matrix(4.166667,0,0,4.166667,0,0)">
              <g transform="matrix(0,1,1,0,851.2975,222.7506)">
                <path
                  d="M52.25,-52.25C23.393,-52.25 0,-28.857 0,0C0,28.857 23.393,52.25 52.25,52.25C81.107,52.25 104.5,28.857 104.5,0C104.5,-28.857 81.107,-52.25 52.25,-52.25"
                  fill={dotFill}
                />
              </g>
            </g>
          </>
        )}
      </g>
    </svg>
  )
}

/**
 * A numbered/plain brand-mark badge, used for step numbers, list markers and
 * map-adjacent iconography. The number is centered at 50%/41.65% of the
 * shape's own bounding box (matches the source SVG geometry).
 */
export function Pin({
  variant = 'navy',
  index,
  size = 40,
  className,
}: {
  variant?: BrandmarkVariant
  index?: number | string
  size?: number
  className?: string
}) {
  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', lineHeight: 0, width: size, flex: `0 0 ${size}px` }}
    >
      <Brandmark variant={variant} className="block h-auto w-full" />
      {index !== undefined && (
        <span
          className="absolute font-bold text-white"
          style={{
            top: '41.65%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: size > 44 ? 15 : 13,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {index}
        </span>
      )}
    </span>
  )
}
