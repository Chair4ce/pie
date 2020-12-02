import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = 'M30 22.5H30.5V22V18V17.5H30H20.5V10V8.79289L19.6464 9.64645L9.64645 19.6464L9.29289 20L9.64645 20.3536' +
  'L19.6464 30.3536L20.5 31.2071V30V22.5H30ZM0.5 20C0.5 9.24814 9.24814 0.5 20 0.5C30.7519 0.5 39.5 9.24814 39.5 20C3' +
  '9.5 30.7519 30.7519 39.5 20 39.5C9.24814 39.5 0.5 30.7519 0.5 20Z';

interface Props {
  className?: string
}

const ImportCopyButton = (props: Props) => {
  return (
    <div className={props.className}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx="20" cy="20" r="20" fill={theme.color.fontPrimary}/>
        <path
          d={pathD}
          fill={theme.color.primaryButton}
          stroke={theme.color.primaryButton}
        />
      </svg>
    </div>
  );
};

export const StyledImportRollupsButton = styled(ImportCopyButton)`
  svg {
    border-radius: 20px;
    box-shadow: 0 2px 4px #000000;
    cursor: pointer;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`;

export const StyledCopyTargetsButton = styled(ImportCopyButton)`
  svg {
    border-radius: 20px;
    box-shadow: 0 2px 4px #000000;
    transform: rotate(180deg);
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`
