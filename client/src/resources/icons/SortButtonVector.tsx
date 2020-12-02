import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';
import classNames from 'classnames';

const pathD = 'M4.50142 0L9 9H0L4.50142 0Z';

interface MyProps {
  ascending: boolean;
  active: boolean;
}

const SortButtonVector: React.FC<MyProps> = (props) => {
  return (
    <Wrapper>
      <svg
        className={classNames(props.ascending ? null : 'descending', props.active ? 'active' : null)}
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD}
          fill={theme.color.buttonInactive}
        />
      </svg>
    </Wrapper>
  );
};

export default SortButtonVector;

const Wrapper = styled('div')`
  width: 9px;
  height: 15px;
  margin-top: -6px;
  
  .descending {
    transform: rotate(180deg);
  }
  
  .active {
    path {
      fill: ${theme.color.primaryButton};
    }
  }
  
`;
