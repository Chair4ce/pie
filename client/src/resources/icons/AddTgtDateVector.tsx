import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.7157' +
  '3 30 15 30ZM20.9259 7.40741V10H22.4074V7.40741H25V5.92593H22.4074V3.33333H20.9259V5.92593H18.3333V7.40741H20.9259Z' +
  'M7.5 8.33268H9.16667V9.9987H15.8333V8.33268H17.5V9.9987H18.3333C19.2538 9.9987 20 10.7449 20 11.6654V23.332C20 24.' +
  '2525 19.2538 24.9987 18.3333 24.9987H6.66667C5.74619 24.9987 5 24.2525 5 23.332V11.6654C5 10.7449 5.74619 9.9987 6' +
  '.66667 9.9987H7.5V8.33268ZM5.83333 23.332V14.1654H19.1666V11.6536L19.1667 11.6654V23.332C19.1667 23.7923 18.7936 2' +
  '4.1654 18.3333 24.1654H6.66667C6.20643 24.1654 5.83333 23.7923 5.83333 23.332ZM17.4999 17.4987H13.3333V21.6654H17.' +
  '4999V17.4987Z';

interface MyProps {
  className?: string;
}

const AddTgtDateVector: React.FC<MyProps> = (props) => {
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

export default AddTgtDateVector;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
`;
