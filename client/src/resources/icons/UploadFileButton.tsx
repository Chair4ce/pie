import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const pathD1 = 'M4 5H5.07037L5.6641 4.1094L7.07037 2H12.9296L14.3359 4.1094L14.9296 5H16H28V8H30V4C30 3.44772 29.5523' +
  ' 3 29 3H16L14.2969 0.4453C14.1114 0.167101 13.7992 0 13.4648 0H6.53518C6.20083 0 5.8886 0.167101 5.70313 0.4453L4 ' +
  '3H1C0.447715 3 0 3.44772 0 4V22C0 22.5523 0.447716 23 1 23H29C29.5523 23 30 22.5523 30 22V18H28V21H2V5H4Z';
const pathD2 = 'M23.5625 8L17 13.0309L23.5625 18.0619V15H34V11H23.5625V8Z';

interface MyProps {
  className?: string
}

const UploadFileButton: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <svg width="34" height="33" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={pathD1}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          fill={theme.color.primaryButton}
        />
        <path
          d={pathD2}
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          fill={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const UploadFileButtonVector = styled(UploadFileButton)`
svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}
`;
