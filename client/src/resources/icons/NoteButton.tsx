import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M7.69868 7.59204L8.62034 6.84342L16.0317 15.9678L15.11 16.7164L7.69868 7.59204Z';
const pathD2 = 'M8.34592 6.50601L7.42426 7.25463L6.87528 6.57875L7.79693 5.83013L8.34592 6.50601';
const pathD3 = 'M16.6685 17.6943L16.2441 16.3563L15.4459 17.0046L16.6685 17.6943Z';
const pathD4 = 'M11.4286 22.8571C17.7404 22.8571 22.8571 17.7404 22.8571 11.4286C22.8571 5.11675 17.7404 0 11.4286 0' +
  'C5.11674 0 0 5.11675 0 11.4286C0 17.7404 5.11674 22.8571 11.4286 22.8571ZM13.6262 3.92037H5.22427V18.5938C5.22427' +
  ' 19.1461 5.67198 19.5938 6.22427 19.5938H17.2855C17.8378 19.5938 18.2855 19.1461 18.2855 18.5938V9.0814L17.9791 8' +
  '.74204H13.932V4.25907L13.6262 3.92037ZM14.4766 4.86228V8.13909H17.4348L14.4766 4.86228Z';

interface MyProps {
  hasNote: boolean;
  className?: string;
}

export const NoteButton: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Wrapper className={props.className}>
      {props.hasNote ?
        <div className={'blue-circle-spacer'}>
          &nbsp;
        </div>
        :
        null
      }
        <svg
          width='30'
          height='30'
          viewBox='0 0 23 23'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx="15" cy="15" r="15" fill={theme.color.backgroundInformation}/>
          <path
            d={pathD1}
            fill={theme.color.primaryButton}
          />
          <path
            d={pathD2}
            fill={theme.color.primaryButton}
          />
          <path
            d={pathD3}
            fill={theme.color.primaryButton}
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d={pathD4}
            fill={theme.color.primaryButton}
          />
        </svg>
      {props.hasNote ?
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

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-left: -4px;
  filter: drop-shadow(0px 2px 4px #000);
  
  :hover {
    svg {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
    
  svg {
    border-radius: 15px;
  
  }
  
  .blue-circle-spacer {
    width: 3px;
  }
  
  .blue-circle {
    margin-left: -3px;
    margin-top: -3px;
  }
`;
