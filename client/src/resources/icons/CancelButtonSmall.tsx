import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD = 'M11.43 0C5.10921 0 0 5.10921 0 11.43C0 17.7508 5.10921 22.86 11.43 22.86C17.7508 22.86 22.86 17.7508' +
  ' 22.86 11.43C22.86 5.10921 17.7508 0 11.43 0ZM16.3449 16.3449C16.2392 16.4509 16.1136 16.5349 15.9753 16.5923C15' +
  '.837 16.6496 15.6888 16.6792 15.5391 16.6792C15.3894 16.6792 15.2412 16.6496 15.1029 16.5923C14.9646 16.5349 14.' +
  '839 16.4509 14.7333 16.3449L11.43 13.0416L8.12673 16.3449C7.91301 16.5586 7.62315 16.6787 7.32091 16.6787C7.0186' +
  '8 16.6787 6.72882 16.5586 6.5151 16.3449C6.30138 16.1312 6.18132 15.8413 6.18132 15.5391C6.18132 15.3894 6.2108 ' +
  '15.2412 6.26807 15.103C6.32534 14.9647 6.40928 14.8391 6.5151 14.7333L9.81837 11.43L6.5151 8.12673C6.30138 7.913' +
  '01 6.18132 7.62315 6.18132 7.32091C6.18132 7.01868 6.30138 6.72882 6.5151 6.5151C6.72882 6.30138 7.01868 6.18132 ' +
  '7.32091 6.18132C7.62315 6.18132 7.91301 6.30138 8.12673 6.5151L11.43 9.81837L14.7333 6.5151C14.8391 6.40928 14.96' +
  '47 6.32534 15.103 6.26807C15.2412 6.2108 15.3894 6.18132 15.5391 6.18132C15.6887 6.18132 15.8369 6.2108 15.9752 6' +
  '.26807C16.1135 6.32534 16.2391 6.40928 16.3449 6.5151C16.4507 6.62092 16.5347 6.74655 16.5919 6.88481C16.6492 7.0' +
  '2307 16.6787 7.17126 16.6787 7.32091C16.6787 7.47057 16.6492 7.61876 16.5919 7.75702C16.5347 7.89528 16.4507 8.02' +
  '091 16.3449 8.12673L13.0416 11.43L16.3449 14.7333C16.7792 15.1676 16.7792 15.8991 16.3449 16.3449Z';

interface MyProps {
  className?: string
}

export const CancelButtonSmall: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg height='23' width='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d={pathD}
          fill={theme.color.primaryButton}/>
      </svg>
    </Wrapper>
  );
};

export const CancelButtonLarge: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg className='large' height='30' width='30' viewBox='0 0 23 23' fill='none'
           xmlns='http://www.w3.org/2000/svg'>
        <path
          d={pathD}
          fill={theme.color.primaryButton}/>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled('div')`
  svg {
    border-radius: 11.5px;
    box-shadow: 0 2px 4px #000000;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
 }
 
  .large {
    border-radius: 15px !important;
  }
`;
