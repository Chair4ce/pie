import * as React from 'react';
import theme from '../theme';

const pathD = 'M15.5 10.4498H0.5C0.225 10.4498 0 10.7111 0 11.0305V12.1918C0 12.5111 0.225 12.7724 0.5 12.7724H15.5C15.775 12.7724 16 12.5111 16 12.1918V11.0305C16 10.7111 15.775 10.4498 15.5 10.4498ZM15.5 5.80469H0.5C0.225 5.80469 0 6.06598 0 6.38533V7.54662C0 7.86598 0.225 8.12727 0.5 8.12727H15.5C15.775 8.12727 16 7.86598 16 7.54662V6.38533C16 6.06598 15.775 5.80469 15.5 5.80469Z';

const IconDnDBurger = () => {
  return (
    <svg
      className="icon"
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={theme.color.fontPrimary}
      />
    </svg>
  );
};

export default IconDnDBurger;
