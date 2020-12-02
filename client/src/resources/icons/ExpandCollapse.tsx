import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';
import classNames from 'classnames';

const pathD = 'M9.46202 0.292021L5.58202 4.17202L1.70202 0.292021C1.60944 0.199439 1.49953 0.125999 1.37856 0.0758944' +
  'C1.2576 0.0257894 1.12795 9.75511e-10 0.997021 0C0.86609 -9.75506e-10 0.736442 0.0257894 0.615478 0.0758944C0.4945' +
  '13 0.125999 0.384603 0.199439 0.292021 0.292021C0.199439 0.384603 0.125999 0.494513 0.0758939 0.615478C0.0257889 0' +
  '.736442 -9.75508e-10 0.86609 0 0.997021C9.7551e-10 1.12795 0.0257889 1.2576 0.0758939 1.37856C0.125999 1.49953 0.1' +
  '99439 1.60944 0.292021 1.70202L4.88202 6.29202C5.27202 6.68202 5.90202 6.68202 6.29202 6.29202L10.882 1.70202C10.9' +
  '747 1.60951 11.0483 1.49962 11.0985 1.37864C11.1486 1.25767 11.1745 1.12799 11.1745 0.997021C11.1745 0.866052 11.1' +
  '486 0.73637 11.0985 0.615396C11.0483 0.494423 10.9747 0.384534 10.882 0.292021C10.492 -0.0879792 9.85202 -0.097979' +
  '2 9.46202 0.292021Z';

interface MyProps {
  collapsed: boolean
  className?: string
}

const ExpandCollapseArrow: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <svg className={classNames(props.collapsed ? 'flipped' : null)} height='7' width='12' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d={pathD}
          fill={theme.color.primaryButton}/>
      </svg>
    </div>
  );
};

export const StyledExpandCollapseArrow = styled(ExpandCollapseArrow)`
  svg {
    cursor: pointer;
    
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
    }
  }
 
  .flipped {
    transform: rotate(180deg);
  }
`
