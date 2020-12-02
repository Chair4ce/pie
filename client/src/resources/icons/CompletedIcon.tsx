import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.3725' +
  '9 24 12 24ZM5.20703 19.7917H9.12396L6.87381 12.2917H5.20703V19.7917ZM15.2077 8.95833H20.208C20.4612 8.9585 20.711' +
  ' 9.01634 20.9385 9.12747C21.166 9.2386 21.3652 9.40012 21.521 9.59972C21.6768 9.79932 21.785 10.0318 21.8375 10.2' +
  '795C21.89 10.5272 21.8853 10.7835 21.8239 11.0292L20.4722 16.4333C20.2919 17.1545 19.8758 17.7947 19.2899 18.2522' +
  'C18.704 18.7097 17.982 18.9582 17.2386 18.9583H10.2907L8.54059 13.125V12.0917C8.54074 11.142 8.86404 10.2207 9.45' +
  '731 9.47917L11.8741 6.45833V3.125H12.7075C13.3706 3.125 14.0065 3.3884 14.4754 3.85724C14.9443 4.32608 15.2077 4.' +
  '96196 15.2077 5.625V8.95833Z';

const CompletedIcon = () => {
  return (
    <svg
      className="icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={theme.color.complete}
      />
    </svg>
  );
};



interface MyProps {
  className?: string;
}

export const ApprovedIcon: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <AcceptedWrapper>
        <svg
          className="accept-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={pathD}
            fillRule="evenodd"
            clipRule="evenodd"
            fill={theme.color.complete}
          />
        </svg>
      </AcceptedWrapper>
    </div>
  )
};

export const RejectedIcon: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <RejectedWrapper>
        <svg
          className="reject-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={pathD}
            fillRule="evenodd"
            clipRule="evenodd"
            fill={theme.color.rejectIcon}
          />
        </svg>
      </RejectedWrapper>
    </div>
  )
};

const AcceptedWrapper = styled('div')`
  display: flex;  
  justify-content: center;
  align-items: center;
  border: 1px solid #FFF;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background-color: ${theme.color.backgroundPillButton};
  cursor: pointer;
  
  :hover {
    box-shadow: 0 0 6px #FFF;
  }
`;

const RejectedWrapper = styled('div')`
  display: flex;  
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.color.subduedOutline};
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background-color: ${theme.color.backgroundPillButton};
  
  svg {
    transform: rotate(180deg);
  }
`;

export default CompletedIcon;
