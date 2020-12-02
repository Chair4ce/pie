import * as React from 'react';
import styled from 'styled-components';

const pathD = 'M14.2222 1.8H10.5067C10.1333 0.756 9.15556 0 8 0C6.84444 0 5.86667 0.756 5.49333 1.8H1.77778C0.8 1.8 0' +
  ' 2.61 0 3.6V16.2C0 17.19 0.8 18 1.77778 18H14.2222C15.2 18 16 17.19 16 16.2V3.6C16 2.61 15.2 1.8 14.2222 1.8ZM8 1.' +
  '8C8.48889 1.8 8.88889 2.205 8.88889 2.7C8.88889 3.195 8.48889 3.6 8 3.6C7.51111 3.6 7.11111 3.195 7.11111 2.7C7.11' +
  '111 2.205 7.51111 1.8 8 1.8ZM9.77778 14.4H3.55556V12.6H9.77778V14.4ZM12.4444 10.8H3.55556V9H12.4444V10.8ZM12.4444 ' +
  '7.2H3.55556V5.4H12.4444V7.2Z';

interface MyProps {
  hasNarrative: boolean
  className?: string
}

const TrackNarrativeButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={pathD}
          fill="#1E98E5"/>
      </svg>
      {props.hasNarrative ?
        <svg className={'blue-circle'} width="6" height="6" viewBox="0 0 6 6" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#77D6F5"/>
        </svg>
        :
        null
      }
    </Wrapper>
  );
};

export default TrackNarrativeButton;

const Wrapper = styled('div')`
  width: 32px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
  padding-left: 8px;
  cursor: pointer;
  margin-bottom: 2px;
  
  .blue-circle {
    margin-top: -23px;
    margin-left: 1px;
  }

  :hover {
    svg {
      filter: drop-shadow(0 0 4px #FFF);
    }
  }
`;
