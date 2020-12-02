import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import TextTooltip from '../../dashboard/components/TextTooltip';

const pathD = 'M-0.000976562 0H10.999V1.79999H-0.000976562V0ZM-0.000976562 10.2001H4.399V12.0001H-0.000976562V10.200' +
  '1ZM4.399 6.80005H-0.000976562V8.60004H4.399V6.80005ZM-0.000976562 3.40003H4.399V5.20002H-0.000976562V3.40003ZM6.0' +
  '9059 7.30884C5.83905 7.50901 5.83905 7.89113 6.09059 8.0913L10.3376 11.4711C10.6652 11.7318 11.1489 11.4985 11.14' +
  '89 11.0799V4.32027C11.1489 3.90161 10.6652 3.66834 10.3376 3.92904L6.09059 7.30884Z';

interface MyProps {
  className?: string;
}

export const CollapseButton: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <TextTooltip title={'Collapse'}>
        <Wrapper>
          <div className={'button-icon'}>
            <svg height="12" width="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                d={pathD}
                fill={theme.color.primaryButton}/>
            </svg>
          </div>
          <div className={'bottom-thing-container'}>
            <div className={'bottom-thing'}>&nbsp;</div>
          </div>
        </Wrapper>
      </TextTooltip>
    </div>
  );
};

const pathD1 = 'M0 0H10.9999V1.79999H0V0Z';
const pathD2 = 'M0 10.2001H4.39998V12.0001H0V10.2001Z';
const pathD3 = 'M4.39998 6.80005H0V8.60004H4.39998V6.80005Z';
const pathD4 = 'M0 3.40003H4.39998V5.20002H0V3.40003Z';
const pathD5 = 'M11.9083 8.08984C12.1599 7.88966 12.1599 7.50755 11.9083 7.30737L7.66134 3.92757C7.33375 3.66688 6.84' +
  '999 3.90015 6.84999 4.31881V11.0784C6.84999 11.4971 7.33375 11.7303 7.66134 11.4696L11.9083 8.08984Z';

export const ExpandButton: React.FC<MyProps> = (props) => {
  return (
    <div className={props.className}>
      <TextTooltip title={'Expand'}>
        <Wrapper>
          <div className={'button-icon'}>
            <svg height="12" width="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                d={pathD1}
                fill={theme.color.primaryButton}/>
                <path
                d={pathD2}
                fill={theme.color.primaryButton}/>
                <path
                d={pathD3}
                fill={theme.color.primaryButton}/>
                <path
                d={pathD4}
                fill={theme.color.primaryButton}/>
                <path
                d={pathD5}
                fill={theme.color.primaryButton}/>
            </svg>
          </div>
          <div className={'bottom-thing-container'}>
            <div className={'bottom-thing'}>&nbsp;</div>
          </div>
        </Wrapper>
      </TextTooltip>
    </div>
  );
};

const Wrapper = styled('div')`
  .button-icon {
    display: flex;
    background-color: #1B2326;
    padding: 4px;
    border-bottom-right-radius: 6px;
    cursor: pointer;
    
    svg {
      display: flex;
      z-index: 10001;
      filter: drop-shadow(0 2px 4px #000000);
    
      :hover {
        filter: drop-shadow(0 0 6px #FFFFFF);
      }
    }
  }
  
  .bottom-thing-container {
    background-color: #1B2326;

  }
  
  .bottom-thing {
    background-color: ${theme.color.backgroundBase};
    border-top-left-radius: 3px;
  }
`;
