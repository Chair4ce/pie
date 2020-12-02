import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02' +
  '944 18 9Z';
const pathD2 = 'M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944' +
  ' 18 9 18ZM12.4111 6.72397L10.6885 4.7857C10.616 4.70404 10.4976 4.70404 10.425 4.7857L6.25417 9.4788L6.05747 11.' +
  '4729C6.03073 11.7394 6.23125 11.965 6.46806 11.9349L8.24028 11.7136L12.4111 7.02051C12.4837 6.93886 12.4837 6.80' +
  '563 12.4111 6.72397ZM12.8503 3.24497L13.7823 4.29361C14.0726 4.62024 14.0726 5.15101 13.7823 5.47978L13.1063 6.2' +
  '4048C13.0337 6.32213 12.9153 6.32213 12.8427 6.24048L11.1201 4.30221C11.0476 4.22055 11.0476 4.08732 11.1201 4.0' +
  '0567L11.7962 3.24497C12.0884 2.91834 12.5601 2.91834 12.8503 3.24497ZM10.3333 12.6247V10.9078H11.5556V12.9685C11' +
  '.5556 13.538 11.145 14 10.6389 14H3.91667C3.41059 14 3 13.538 3 12.9685L3.00231 10.9078H4.22222V12.6247H10.3333Z';

interface MyProps {
  className?: string
}

const EditButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg width={'18'} height={'18'} viewBox={'0 0 18 18'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
        <path
          d={pathD1}
          fill={theme.color.backgroundBase}
        />
        <path
          d={pathD2}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          fill={theme.color.primaryButton}
        />
      </svg>
    </Wrapper>
  );
};

export default EditButton;

const Wrapper = styled('div')`
  margin: 6px 2px 2px 2px;
  
  svg {
    cursor: pointer;
    
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
   }
 }
`;
