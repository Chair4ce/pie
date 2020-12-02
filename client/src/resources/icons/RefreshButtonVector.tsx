import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M10.2985 0C5.29927 0 1.13299 3.55028 0.197371 8.25863H3.05612C3.93695 5.09319 6.84169 2.76625 10.2985' +
  ' 2.76625C12.3766 2.76625 14.2544 3.60774 15.6137 4.9662L12.3099 8.25863H20.597V0L17.5799 3.00678C15.7164 1.14915 ' +
  '13.1426 0 10.2985 0ZM0 12.2677V20.5263L3.01714 17.5195C4.88057 19.3772 7.45444 20.5263 10.2985 20.5263C15.2977 20' +
  '.5263 19.464 16.976 20.3996 12.2677H17.5409C16.6601 15.4331 13.7553 17.7601 10.2985 17.7601C8.22046 17.7601 6.342' +
  '61 16.9186 4.98331 15.5601L8.28707 12.2677H0Z';

interface MyProps {
  className?: string;
}

const RefreshButtonVector = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d={pathD}
          fill={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const StyledRefreshButtonVector = styled(RefreshButtonVector)`
  cursor: pointer;
  
  svg {
    filter: drop-shadow(0 0px 4px #000);
    
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
    }
  }
`;

export default RefreshButtonVector;
