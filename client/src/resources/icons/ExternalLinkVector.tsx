import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M14.4444 18V14.4H6.66667V9.6H14.4444V6L20 12L14.4444 ' +
  '18ZM12.2222 0C12.8116 0 13.3768 0.252856 13.7936 0.702944C14.2103 ' +
  '1.15303 14.4444 1.76348 14.4444 2.4V4.8H12.2222V2.4H2.22222V21.6H12.' +
  '2222V19.2H14.4444V21.6C14.4444 22.2365 14.2103 22.847 13.7936 23.' +
  '2971C13.3768 23.7471 12.8116 24 12.2222 24H2.22222C1.63285 24 1.06762 ' +
  '23.7471 0.650874 23.2971C0.234126 22.847 0 22.2365 0 21.6V2.4C0 1.76348 ' +
  '0.234126 1.15303 0.650874 0.702944C1.06762 0.252856 1.63285 0 2.22222 0H12.2222Z';

interface MyProps {
  className?: string;
}

const ExternalLinkVector = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        className="icon"
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD}
          fill={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const StyledExternalLinkVector = styled(ExternalLinkVector)`
svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}
`;

export default ExternalLinkVector;
