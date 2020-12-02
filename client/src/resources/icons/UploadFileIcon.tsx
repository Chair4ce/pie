import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M18.5 5L21.5 8H18.5V5Z';
const pathD2 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71' +
  '573 30 15 30ZM7.5 5C7.5 4.44772 7.94772 4 8.5 4H18.5L22.5 8V12H18V9.80385L12 15L18 20.1962V18H22.5V25C22.5 25.552' +
  '3 22.0523 26 21.5 26H8.5C7.94772 26 7.5 25.5523 7.5 25V5Z';

interface MyProps {
  hasProduct: boolean;
  className?: string
}

const UploadFileIcon: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg className={'file-icon'} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#112C37"/>
        <path
          d={pathD1}
          fill={theme.color.primaryButton}
        />
        <path
          d={pathD2}
          fill={theme.color.primaryButton}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
        />
      </svg>
      {props.hasProduct ?
        <div className={'blue-circle'}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="3" fill="#77D6F5"/>
          </svg>
        </div>
        :
        null
      }
    </Wrapper>
  );
};

export default UploadFileIcon;

const Wrapper = styled('div')`
  filter: drop-shadow(0 2px 4px #000);
  
  :hover {
    .file-icon {
      border-radius: 15px;
      box-shadow: 0 0 6px #FFF;
    }
  }
 
  .blue-circle {
    margin-top: -47px;
    margin-left: 27px;
  }
`;
