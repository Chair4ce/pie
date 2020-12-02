import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD1 = "M128.619 14L112 1L95.3806 14H15C10.5817 14 7 17.5817 7 22V106C7 110.418 10.5817 114 15 114H133C137." +
  "418 114 141 110.418 141 106V22C141 17.5817 137.418 14 133 14H128.619Z";
const pathD2 = "M128.619 14L112 1L95.3806 14H15C10.5817 14 7 17.5817 7 22V106C7 110.418 10.5817 114 15 114H133C137." +
  "418 114 141 110.418 141 106V22C141 17.5817 137.418 14 133 14H128.619Z";
const pathD3 = "M112 1L113.232 -0.57531L112 -1.53918L110.768 -0.57531L112 1ZM128.619 14L127.387 15.5753L127.93 " +
  "16H128.619V14ZM95.3806 14V16H96.0699L96.6128 15.5753L95.3806 14ZM110.768 2.57531L127.387 15.5753L129.852 12.4247" +
  "L113.232 -0.57531L110.768 2.57531ZM96.6128 15.5753L113.232 2.57531L110.768 -0.57531L94.1483 12.4247L96.6128 15.57" +
  "53ZM15 16H95.3806V12H15V16ZM9 22C9 18.6863 11.6863 16 15 16V12C9.47715 12 5 16.4772 5 22H9ZM9 106V22H5V106H9ZM15 " +
  "112C11.6863 112 9 109.314 9 106H5C5 111.523 9.47715 116 15 116V112ZM133 112H15V116H133V112ZM139 106C139 109.314 1" +
  "36.314 112 133 112V116C138.523 116 143 111.523 143 106H139ZM139 22V106H143V22H139ZM133 16C136.314 16 139 18.6863 " +
  "139 22H143C143 16.4772 138.523 12 133 12V16ZM128.619 16H133V12H128.619V16Z";

interface MyProps {
  className?: string
}

const TgtStatusPickerOutline = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        className="icon"
        width="142"
        height="121"
        viewBox="0 0 142 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1" fill="white">
          <path
            d={pathD1}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="white"
          />
        </mask>
        <path
          d={pathD2}
          fillRule="evenodd"
          clipRule="evenodd"
          fill={theme.color.backgroundBase}
        />
        <path
          d={pathD3}
          fill="white"
          mask="url(#path-1-inside-1)"
        />
      </svg>
    </div>
  );
};

export const StyledTgtStatusPickerOutline = styled(TgtStatusPickerOutline)`
  svg {
    filter: drop-shadow(0 2px 4px #000000);
  }
  z-index: 1;
  margin-bottom: -100px;
`;
