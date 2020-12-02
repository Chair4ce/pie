import * as React from 'react';
import styled from 'styled-components';

const pathD = 'M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301996 1.66667 1.26425 0 2.80385 0L1' +
  '3.1962 0C14.7358 0 15.698 1.66667 14.9282 3L9.73205 12Z';

interface MyProps {
  collapsed: boolean;
  onClick: () => void;
  className?: string
}

const ExpandCollapseArrowButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className} onClick={props.onClick}>
      <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"
           className={props.collapsed ? 'collapsed' : undefined}>
        <path
          d={pathD}
          fill="white"
        />
      </svg>
    </Wrapper>
  );
};

export default ExpandCollapseArrowButton;

const Wrapper = styled('div')`
  margin-top: 2px;
  
  svg {
    cursor: pointer;

    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
    }
  }
 
  .collapsed {
    transform: rotate(-90deg);
  }
`;
