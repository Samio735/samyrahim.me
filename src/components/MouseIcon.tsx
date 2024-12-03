import type { SVGProps } from 'react';

interface MouseIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const MouseIcon = ({ color = '#22c55e', ...props }: MouseIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={26}
      height={31}
      fill='none'
      {...props}
    >
      <g clipPath='url(#a)'>
        <path
          fill={color}
          fillRule='evenodd'
          stroke={'#fff'}
          strokeLinecap='square'
          strokeWidth={2}
          d='M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z'
          clipRule='evenodd'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill={color} d='M0 0h26v31H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};