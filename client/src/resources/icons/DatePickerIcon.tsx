import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD1 = 'M15 11H10V16H15V11Z';
const pathD2 = 'M3 0H5V2H13V0H15V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20H2C0.89543 20 0 19.1046' +
  ' 0 18V4C0 2.89543 0.895431 2 2 2H3V0ZM1 18V7H17V18C17 18.5523 16.5523 19 16 19H2C1.44772 19 1 18.5523 1 18Z';

interface MyProps {
  className?: string
}

const DatePickerIcon: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <div className={'icon'}>
        <svg
          className="icon"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={pathD1}
            fill={theme.color.primaryButton}
          />
          <path
            d={pathD2}
            fillRule="evenodd"
            clipRule="evenodd"
            fill={theme.color.primaryButton}
          />
        </svg>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled('div')`
  width: 18px;
  height: 18px;
  border-radius: 1px;
  margin-top: 1px;
  margin-left: 10px;

  :hover {
    box-shadow: 0 0 6px #FFFFFF;
  }
  
  .icon {
    position: absolute;
    margin-top: -1px;
  }
`;

export default DatePickerIcon;
