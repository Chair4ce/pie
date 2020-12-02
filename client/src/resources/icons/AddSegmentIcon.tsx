import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6' +
  '.71573 30 15Z';
const pathD2 = 'M15 5C16.313 5 17.6138 5.25879 18.8267 5.76074C20.04 6.26367 21.1426 7 22.0713 7.92871C22.9995 8.857' +
  '42 23.7363 9.95996 24.2388 11.1729C24.3984 11.5596 24.5337 11.9541 24.644 12.3555C24.8799 13.2158 25 14.1045 25 1' +
  '5C25 16.3906 24.7104 17.75 24.165 19H21.9282C22.6245 17.7939 23 16.417 23 15C23 12.8779 22.1572 10.8438 20.6567 9' +
  '.34277C19.1567 7.84277 17.1216 7 15 7C12.8784 7 10.8433 7.84277 9.34326 9.34277C7.84277 10.8438 7 12.8779 7 15C7 ' +
  '17.1221 7.84277 19.1562 9.34326 20.6572C10.8433 22.1572 12.8784 23 15 23C16.4165 23 17.7944 22.625 19 21.9287V24.' +
  '165C17.75 24.71 16.3901 25 15 25C9.47021 25 5 20.5 5 15C5 12.3477 6.05371 9.80469 7.92871 7.92871C9.8042 6.05371 ' +
  '12.3477 5 15 5Z';
const pathD3 = 'M15 9V15L19 17V19L13 16V9H15Z';
const pathD4 = 'M22 23V25H23V23H25V22H23V20H22V22H20V23H22Z';

interface MyProps {
  className?: string
}

const AddSegmentIcon: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg className="icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#112C37"/>
        <path
          d={pathD1}
          fill={theme.color.primaryButton}
        />
        <path
          d={pathD2}
          fill={"#112C37"}
        />
        <path
          d={pathD3}
          fill={"#112C37"}
        />
        <path
          d={pathD4}
          fill={"#112C37"}
        />
      </svg>
    </Wrapper>
  );
};

export default AddSegmentIcon;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
`;
