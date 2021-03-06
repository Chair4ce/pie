import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';
import TextTooltip from '../../dashboard/components/TextTooltip';

const pathD = 'M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.4771' +
  '5 20 10 20ZM5.62578 16.5672C5.64237 16.8114 5.82213 17 6.03836 17H13.9616C14.1779 17 14.3576 16.8114 14.3742 16.56' +
  '72L15.1724 4.81257H15.5862C15.8147 4.81257 16 4.6027 16 4.34381C16 4.08492 15.8147 3.87504 15.5862 3.87504H12.5989' +
  'C12.4091 3.87504 12.2436 3.72865 12.1975 3.51997L11.9404 2.35507C11.8944 2.14639 11.7289 2 11.539 2H8.46101C8.2711' +
  '3 2 8.10562 2.14639 8.05957 2.35507L7.8025 3.51997C7.75644 3.72865 7.59093 3.87504 7.40106 3.87504H4.41379C4.18526' +
  ' 3.87504 4 4.08492 4 4.34381C4 4.6027 4.18526 4.81257 4.41379 4.81257H4.82759L5.62578 16.5672ZM8.60345 3.87112H11.' +
  '5L11.2931 2.93359H8.81035L8.60345 3.87112ZM10.4139 7.54529V13.1704C10.4139 13.4293 10.2286 13.6392 10.0001 13.6392' +
  'C9.77155 13.6392 9.58629 13.4293 9.58629 13.1704V7.54529C9.58629 7.2864 9.77155 7.07653 10.0001 7.07653C10.2286 7.' +
  '07653 10.4139 7.2864 10.4139 7.54529ZM7.68082 13.205L7.32599 7.57741C7.30892 7.30675 7.49815 7.07653 7.73768 7.076' +
  '53C7.95422 7.07653 8.13395 7.26611 8.14938 7.51079L8.50421 13.1383C8.52127 13.409 8.33205 13.6392 8.09251 13.6392C' +
  '7.87597 13.6392 7.69625 13.4496 7.68082 13.205ZM12.6783 7.57741L12.3235 13.205C12.308 13.4496 12.1283 13.6392 11.9' +
  '118 13.6392C11.6722 13.6392 11.483 13.409 11.5001 13.1383L11.8549 7.51079C11.8703 7.26611 12.0501 7.07653 12.2666 ' +
  '7.07653C12.5061 7.07653 12.6954 7.30675 12.6783 7.57741Z';

interface MyProps {
  tooltip?: string
  onClick?: () => void;
  className?: string
}

export const MiniTrashcanButton: React.FC<MyProps> = (props) => {
  return (
    <TextTooltip title={props.tooltip ? props.tooltip : ''}>
      <Wrapper
        className={props.className}
        onClick={props.onClick}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx="10" cy="10" r="10" fill={theme.color.backgroundBase}/>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d={pathD}
            fill={theme.color.primaryButton}
          />
        </svg>
      </Wrapper>
    </TextTooltip>
  );
};

const Wrapper = styled('div')`
  margin-left: -10px;
  margin-top: 3px;
  cursor: pointer;
  
  svg {
    border-radius: 10px;
    box-shadow: 0 2px 4px #000000;
  
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
`;
