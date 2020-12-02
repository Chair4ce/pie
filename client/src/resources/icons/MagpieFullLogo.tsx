import * as React from 'react';
import styled from 'styled-components';

interface MyProps {
  className?: string
}

const MagpieFullLogo: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Wrapper
      className={props.className}>
      <img src={'bigbord.png'} height={'258px'} width={'242px'} className={'image'} alt={'MagPIE logo'}/>
    </Wrapper>
  );
};

export default MagpieFullLogo;

const Wrapper = styled('div')`
  .image {
    margin: -60px 0 -50px -35px;
  }
`;
