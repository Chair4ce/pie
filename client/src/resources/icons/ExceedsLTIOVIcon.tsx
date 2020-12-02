import * as React from 'react';
import styled from 'styled-components';

const pathD = "M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 " +
  "17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2." +
  "84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 20C4.477 " +
  "20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 14H11V16H9V14ZM9 " +
  "4H11V12H9V4Z";

const ExceedsLTIOVIcon = () => {
  return (
    <Wrapper>
      <svg
        className={"icon"}
        width={"20"}
        height={"20"}
        viewBox={"0 0 20 20"}
        fill={"none"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill="#041319"
        />
        <path
          d={pathD}
          fill={"#0B5680"}
        />
      </svg>
    </Wrapper>
  );
};

export default ExceedsLTIOVIcon;

const Wrapper = styled('div')`
height: 20px;
width: 20px;
`;
