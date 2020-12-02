import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M120.678 13.7818L120.952 14H121.302H126C129.866 14 133 17.134 133 21V149C133 152.866 129.866 156 126' +
  ' 156H8C4.13401 156 1 152.866 1 149V21C1 17.134 4.13401 14 8 14H88.6981H89.048L89.3216 13.7818L105 1.27904L120.678' +
  ' 13.7818Z';

interface MyProps {
  className?: string
}

const IxnStatusPickerOutline = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        className='icon'
        width='134'
        height='157'
        viewBox='0 0 134 157'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d={pathD}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          fill={theme.color.backgroundBase}
          stroke={'white'}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export const StyledIxnStatusPickerOutline = styled(IxnStatusPickerOutline)`
  svg {
    filter: drop-shadow(0 2px 4px #000000);
  }
  z-index: 1;
  margin-bottom: -136px;
`;
