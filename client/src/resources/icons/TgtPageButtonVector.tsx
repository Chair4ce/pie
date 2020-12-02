import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD1 = 'M28.0703 12C28.0703 18.6274 22.5858 24 15.8203 24C13.0453 24 10.4857 23.0961 8.4318 21.5725L2.47448 2' +
  '7.5298C2.08395 27.9203 1.45079 27.9203 1.06026 27.5298L0.706708 27.1762C0.316188 26.7857 0.316188 26.1525 0.706708' +
  ' 25.762L6.5848 19.8839C4.70741 17.7753 3.57029 15.0177 3.57029 12C3.57029 5.37258 9.0548 0 15.8203 0C22.5858 0 28.' +
  '0703 5.37258 28.0703 12ZM26.0286 12C26.0286 17.5228 21.4582 22 15.8203 22C10.1824 22 5.61196 17.5228 5.61196 12C5.' +
  '61196 6.47715 10.1824 2 15.8203 2C21.4582 2 26.0286 6.47715 26.0286 12Z';

const pathD2 = 'M15.5713 7.00013L9.5713 12.0001L11.5713 12V17H14.5713V14.0001H16.5713V17L19.5713 17.0001V12.0001L21.5' +
  '713 12L19.5713 10.3334V7.50013H17.5713V8.66676L15.5713 7.00013Z';

interface MyProps {
  className?: string;
}

const TgtPageButtonVector = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={pathD1}
          fill={theme.color.primaryButton}
        />
        <path
          d={pathD2}
          fill={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const StyledTgtPageButtonVector = styled(TgtPageButtonVector)`
  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
`;

export default TgtPageButtonVector;
