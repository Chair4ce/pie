import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M13.375 18.135C14.6457 18.135 15.84 17.6398 16.741 16.741C17.6398 15.8421 18.135 14.6457 18.135 13.3' +
  '75C18.135 12.1042 17.6398 10.91 16.741 10.009C15.8421 9.10799 14.6457 8.61499 13.375 8.61499C12.1042 8.61499 10.9' +
  '1 9.11012 10.009 10.009C9.11012 10.9079 8.61499 12.1042 8.61499 13.375C8.61499 14.6457 9.11012 15.84 10.009 16.74' +
  '1C10.91 17.6398 12.1042 18.135 13.375 18.135Z';
const pathD2 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71' +
  '573 30 15 30ZM18.4303 17.2595L23.9489 22.7781C23.9651 22.7942 23.978 22.8135 23.9867 22.8346C23.9955 22.8557 24 2' +
  '2.8784 24 22.9013C24 22.9242 23.9955 22.9469 23.9867 22.968C23.978 22.9892 23.9651 23.0084 23.9489 23.0246L23.022' +
  '4 23.9489C23.0062 23.9651 22.987 23.978 22.9659 23.9867C22.9447 23.9955 22.9221 24 22.8992 24C22.8763 24 22.8536 ' +
  '23.9955 22.8325 23.9867C22.8113 23.978 22.7921 23.9651 22.7759 23.9489L17.2573 18.4324C16.1502 19.2867 14.7987 19' +
  '.7499 13.375 19.7499C11.6707 19.7499 10.0706 19.0869 8.86787 17.8821C7.66512 16.6793 7 15.0771 7 13.375C7 11.6707' +
  ' 7.663 10.0706 8.86787 8.86787C10.0706 7.66512 11.6729 7 13.375 7C15.0771 7 16.6793 7.663 17.8821 8.86787C19.0848' +
  ' 10.0727 19.7499 11.6707 19.7499 13.375C19.7499 14.7987 19.2867 16.1523 18.4303 17.2595Z';

interface MyProps {
  className?: string
}

const BrowseButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg width={'30'} height={'30'} viewBox={'0 0 30 30'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
        <circle cx={'15'} cy={'15'} r={'15'} fill={theme.color.backgroundFocus}/>
        <path
          fill={theme.color.primaryButton}
          d={pathD1}
        />
        <path
          d={pathD2}
          fill={theme.color.primaryButton}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
        />
      </svg>
    </Wrapper>
  );
};

export default BrowseButton;

const Wrapper = styled('div')`
  display: flex;
  margin-right: 4px;
  
  svg {
    border-radius: 15px;
    box-shadow: 0 2px 4px #000000;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
 }
`;
