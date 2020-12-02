import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD1 = "M10.4408 15.3589C9.79023 14.9711 9.79023 14.0289 10.4408 13.6411L21.4879 7.05527C22.1545 6.65789 23" +
  " 7.13819 23 7.91422V9C23 9.55228 23.4477 10 24 10H25C25.5523 10 26 9.55228 26 9V2.52074C26 0.968681 24.309 " +
  "0.00809157 22.9759 0.802846L1.44082 13.6411C0.790235 14.0289 0.790234 14.9711 1.44081 15.3589L22.9759 28.1972C24" +
  ".309 28.9919 26 28.0313 26 26.4793V20C26 19.4477 25.5523 19 25 19H24C23.4477 19 23 19.4477 23 20V21.0858C23 21." +
  "8618 22.1545 22.3421 21.4879 21.9447L10.4408 15.3589Z";
const pathD2 = "M18.5136 12.304C18.8315 12.1053 19.1988 12 19.5736 12H29.7639C29.9192 12 30.0723 11.9639 30.2111 " +
  "11.8944L32 11C32 11.5523 32.4477 12 33 12H38.7639C38.9192 12 39.0723 11.9639 39.2111 11.8944L41 11V11.5C41 11." +
  "7761 41.2239 12 41.5 12C41.7761 12 42 12.2239 42 12.5V16.5C42 16.7761 41.7761 17 41.5 17C41.2239 17 41 17.2239 41" +
  " 17.5V18L39.2111 17.1056C39.0723 17.0361 38.9192 17 38.7639 17H33C32.4477 17 32 17.4477 32 18L30.2111 17.1056C30" +
  ".0723 17.0361 29.9192 17 29.7639 17H19.5736C19.1988 17 18.8315 16.8947 18.5136 16.696L16.3568 15.348C15.7301 14." +
  "9563 15.7301 14.0437 16.3568 13.652L18.5136 12.304Z";

interface Props {
  className?: string
}

const BackButtonVector = (props: Props) => {
  return (
    <div className={props.className}>
      <svg
        width="42"
        height="29"
        viewBox="0 0 42 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD1}
          fill={theme.color.primaryButton}
        />
        <path
          d={pathD2}
          fill={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const StyledBackButtonVector = styled(BackButtonVector)`
  svg {
    padding-top: 3px;
    filter: drop-shadow(1px 4px 5px #000);
  
    :hover {
      filter: drop-shadow(0 0px 6px #FFFFFF);
    }
  }
`;
