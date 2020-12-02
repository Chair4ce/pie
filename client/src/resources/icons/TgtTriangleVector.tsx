import * as React from 'react';
import theme from '../theme';

const pathD = 'M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 ' +
  '5.37258 24 12 24ZM4.85938 9L11.8594 19L18.8594 9H4.85938Z';

const TgtTriangleVector = () => {
  return (
    <svg
      className="icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={pathD}
        fill={theme.color.fontPrimary}
      />
    </svg>
  );
};

export default TgtTriangleVector;
