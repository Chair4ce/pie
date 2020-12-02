import * as React from 'react';

interface MyProps {
  inactive?: boolean;
  highlighted?: boolean;
}

export const Bullet: React.FC<MyProps> = (props) => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="4" r="4" fill={props.inactive ? '#243237' : props.highlighted ? '#00C2FF' : '#48788C'}/>
    </svg>
  );
};
