import * as React from 'react';
import theme from '../theme';

const pathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.7157 0 0 6.71573 0 15C0 23.2843 6.7157 ' +
  '30 15 30ZM19.5 6.33974L6 15L19.5 23.6603V6.33974Z';

export const FeedbackIcon: React.FC = () => {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd'
            d={pathD}
            fill={theme.color.primaryButton}/>
    </svg>
  );
};
