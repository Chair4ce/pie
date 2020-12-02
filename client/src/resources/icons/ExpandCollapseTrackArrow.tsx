import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD = 'M9.47094 10.8764C9.07181 11.4295 8.24831 11.4295 7.84917 10.8764L1.14383 1.58521C0.666527 0.923842 1.1' +
  '391 0 1.95471 0L15.3654 0C16.181 0 16.6536 0.923841 16.1763 1.58521L9.47094 10.8764Z';

interface MyProps {
  collapsed: boolean;
  className?: string
}

const ExpandCollapseArrowButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"
           className={props.collapsed ? 'collapsed' : undefined}>
        <path
          d={pathD}
          fill={props.collapsed ? theme.color.primaryButton : theme.color.toggleActive}
        />
      </svg>
    </Wrapper>
  );
};

export default ExpandCollapseArrowButton;

const Wrapper = styled('div')`
  height: 17px;
  width: 17px;
  margin-right: 12px;
 
  svg {
    filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.2));
  }
 
  .collapsed {
    transform: rotate(-90deg);
  }
`;
