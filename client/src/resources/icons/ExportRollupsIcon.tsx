import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71' +
  '573 30 15 30ZM6 10V8H18V10H6ZM6 13.0001V11.0001H16.5V13.0001H6ZM6 14.0002V16.0002L14 15.9333V14.0002H6ZM6 16.999' +
  '9V18.9999H17.25V16.9999H6ZM6 22V20H18V22H6ZM21.492 18.3192V16.4523H15V13.6005H21.492V11.7333L25.6934 15.0262L21.' +
  '492 18.3192Z';

interface MyProps {
  className?: string
}

const ExportRollupsIcon: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg className="icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#112C37"/>
        <path
          d={pathD}
          fill={theme.color.primaryButton}
          fillRule={'evenodd'}
        />
      </svg>
    </Wrapper>
  );
};

export default ExportRollupsIcon;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
`;
