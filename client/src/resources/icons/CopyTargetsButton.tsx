import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.7157' +
  '3 30 15 30ZM8.07016 22.9385H17.6205C17.6989 22.9385 17.763 22.8765 17.763 22.8007V21.8358C17.763 21.76 17.6989 21.' +
  '6979 17.6205 21.6979H9.28287C9.00673 21.6979 8.78287 21.4741 8.78287 21.1979V9.84344C8.78287 9.76763 8.71873 9.705' +
  '6 8.64033 9.7056H7.64254C7.56414 9.7056 7.49999 9.76763 7.49999 9.84344V22.3871C7.49999 22.6921 7.75479 22.9385 8.' +
  '07016 22.9385ZM10.3508 20.733H19.4735C19.7889 20.733 20.0437 20.4866 20.0437 20.1817V16.8251H21.632V18.8257L25.833' +
  '4 15.2974L21.632 11.7692V13.7696H20.0437V11.0375C20.0437 10.891 19.9831 10.7515 19.8762 10.6481L16.7884 7.66208C16' +
  '.7492 7.62417 16.7046 7.59316 16.6565 7.56731V7.53457H16.5817C16.5193 7.51217 16.4534 7.50011 16.3857 7.50011H10.3' +
  '508C10.0355 7.50011 9.78067 7.74651 9.78067 8.05149V20.1817C9.78067 20.4866 10.0355 20.733 10.3508 20.733ZM16.0882' +
  ' 8.60286H16.0917L18.7608 11.184V11.1874H16.0882V8.60286Z';

interface MyProps {
  className?: string;
}

const CopyTargetsButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg
        className="icon"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="15" fill="#112C37"/>
        <path
          d={pathD}
          fillRule="evenodd"
          clipRule="evenodd"
          fill={theme.color.primaryButton}
        />
      </svg>
    </Wrapper>
  );
};

export default CopyTargetsButton;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
`;
