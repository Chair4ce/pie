import * as React from 'react';
import theme from '../theme';

const pathD = 'M5 0L9.33013 7.5H0.669873L5 0Z';

const UpperSortButtonVector = () => {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={theme.color.fontLoading}
      />
    </svg>
  );
};

export default UpperSortButtonVector;


