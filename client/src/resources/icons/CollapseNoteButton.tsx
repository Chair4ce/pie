import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD = 'M30 15C30 23.2852 23.2842 30 15 30C6.71582 30 0 23.2852 0 15C0 6.71484 6.71582 0 15 0C23.2842 0 30 6.7' +
  '1484 30 15ZM9.30762 15.9375V17.0898H12.5322L7 22.6172L7.81348 23.4375L13.3457 17.9062V21.1289H14.5V15.9375H9.30762' +
  'ZM23.0615 6.5625L23.875 7.38281L18.3428 12.9102H21.5674V14.0625H16.375V8.87109H17.5293V12.0938L23.0615 6.5625Z';

interface MyProps {
  className?: string
}

const CollapseNotesButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg
        width={'30'}
        height={'30'}
        viewBox={'0 0 30 30'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path
          d={pathD}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          fill={theme.color.primaryButton}/>
      </svg>
    </Wrapper>
  );
};

export default CollapseNotesButton;

const Wrapper = styled('div')`
  svg {
    border-radius: 18px;
    box-shadow: 0 2px 4px #000000;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
 }
`;
