import { css } from 'styled-components';

export const Colors = {
  dark: '#0B2447',
  black: '#000',
  navy: '#071030',
  blue: '#576CBC',
  light: '#A5D7E8',
  white: '#fff',
  red: '#fe0000',
};

const Breakpoints = {
  xs: 610,
  sm: 767,
  md: 969,
  lg: 1024,
  xlg: 1280,
};

export const Media = Object.keys(Breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${Breakpoints[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
