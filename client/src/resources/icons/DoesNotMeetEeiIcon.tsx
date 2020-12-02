import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37' +
  '258 24 12 24ZM2.08301 12.083C2.08301 17.606 6.56001 22.083 12.083 22.083C17.606 22.083 22.083 17.606 22.083 12.0' +
  '83C22.083 6.56001 17.606 2.08301 12.083 2.08301C6.56001 2.08301 2.08301 6.56001 2.08301 12.083ZM7.08301 13.083V1' +
  '1.083H17.083V13.083H7.08301Z';

const DoesNotMeetEeiIcon = () => {
  return (
    <Wrapper>
      <svg
        className="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD}
          fillRule="evenodd"
          clipRule="evenodd"
          fill={theme.color.buttonDoesNotMeetEei}
        />
      </svg>
    </Wrapper>
  );
};

export default DoesNotMeetEeiIcon;

const Wrapper = styled('div')`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;
