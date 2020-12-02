import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71' +
  '573 30 15 30ZM7.93945 15.6865H11.877V14.0801H7.93945V11.708H12.5469V10.0469H5.88867V20H12.5605V18.3525H7.93945V1' +
  '5.6865ZM15.8145 15.6865H19.752V14.0801H15.8145V11.708H20.4219V10.0469H13.7637V20H20.4355V18.3525H15.8145V15.6865' +
  'ZM21.7686 20H23.8193V10.0469H21.7686V20Z';

interface MyProps {
  className?: string
}

const EeiNotesIcon: React.FC<MyProps> = (props) => {
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

export default EeiNotesIcon;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
`;
