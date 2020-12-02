import * as React from 'react';
import theme from '../theme';

const rfiPathD1 = 'M8.32812 14.8672H6.59375V11.7422H8.32812C8.84375 11.7422 9.23438 11.8828 9.5 12.1641C9.76562 12.4401 ' +
  '9.89844 12.8229 9.89844 13.3125C9.89844 13.8021 9.76562 14.1849 9.5 14.4609C9.23958 14.7318 8.84896 14.8672 8.3281' +
  '2 14.8672Z';
const rfiPathD2 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.715' +
  '73 30 15 30ZM6.59375 16.9844H8.07812L10.0859 21H13.0234V20.8828L10.6484 16.2969C11.3307 15.974 11.8307 15.5521 12.' +
  '1484 15.0312C12.4714 14.5104 12.6328 13.8542 12.6328 13.0625C12.6328 11.9688 12.2526 11.1224 11.4922 10.5234C10.73' +
  '18 9.92448 9.67708 9.625 8.32812 9.625H3.85156V21H6.59375V16.9844ZM17.0312 16.4688H21.4531V14.3594H17.0312V11.7422' +
  'H21.8984V9.625H14.2891V21H17.0312V16.4688ZM23.2266 21H25.9609V9.625H23.2266V21Z';

const tgtPathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.7' +
  '1573 30 15 30ZM21.3018 11.1977L25.0019 14.25H22.3497V23H17.1016V18.0997C17.1016 16.94 16.1616 16 15.002 16C13.8424' +
  ' 16 12.9023 16.94 12.9023 18.0997V23H7.65215V14.25H5L15.0009 6L18.1523 8.59967V7H21.3018V11.1977Z';

const ixnPathD = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.7' +
  '1573 30 15 30ZM6 10V8H24V10H6ZM6 13.0001V11.0001H21.75V13.0001H6ZM6 14.0002V16.0002H22.875V14.0002H6ZM6 16.9999V18' +
  '.9999H22.875V16.9999H6ZM6 22V20H24V22H6Z';

const trackPathD1 = 'M15.7778 8.55C15.7778 8.0825 15.4278 7.7 15 7.7C14.5722 7.7 14.2222 8.0825 14.2222 8.55C14.2222 ' +
  '9.0175 14.5722 9.4 15 9.4C15.4278 9.4 15.7778 9.0175 15.7778 8.55Z';
const trackPathD2 = 'M11.1111 19.6H16.5556V17.9H11.1111V19.6Z';
const trackPathD3 = 'M11.1111 16.2H18.8889V14.5H11.1111V16.2Z';
const trackPathD4 = 'M11.1111 12.8H18.8889V11.1H11.1111V12.8Z';
const trackPathD5 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 ' +
  '6.71573 30 15 30ZM17.1933 7.7H20.4444C21.3 7.7 22 8.465 22 9.4V21.3C22 22.235 21.3 23 20.4444 23H9.55556C8.7 23 8 ' +
  '22.235 8 21.3V9.4C8 8.465 8.7 7.7 9.55556 7.7H12.8067C13.1333 6.714 13.9889 6 15 6C16.0111 6 16.8667 6.714 17.1933' +
  ' 7.7Z';


interface MyProps {
  active?: boolean;
}

export const RfiInfoButton: React.FC<MyProps> = ({active}) => {
  return (
    <div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill={theme.color.backgroundToggleButton}/>
        <path d={rfiPathD1}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path fillRule={'evenodd'} clipRule={'evenodd'} d={rfiPathD2}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
      </svg>
    </div>
  );
};

export const TgtInfoButton: React.FC<MyProps> = ({active}) => {
  return (
    <div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill={theme.color.backgroundToggleButton}/>
        <path d={tgtPathD}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
      </svg>
    </div>
  );
};

export const IxnInfoButton: React.FC<MyProps> = ({active}) => {
  return (
    <div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill={theme.color.backgroundToggleButton}/>
        <path d={ixnPathD}
              fillRule="evenodd" clipRule="evenodd"
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
      </svg>
    </div>
  );
};


export const TrackInfoButton: React.FC<MyProps> = ({active}) => {
  return (
    <div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill={theme.color.backgroundToggleButton}/>
        <path d={trackPathD1}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path d={trackPathD2}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path d={trackPathD3}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path d={trackPathD4}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path d={trackPathD5}
              fillRule="evenodd" clipRule="evenodd"
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
      </svg>
    </div>
  );
};
