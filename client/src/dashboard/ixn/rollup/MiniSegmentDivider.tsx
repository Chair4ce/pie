import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import { SegmentModel } from '../../../store/ixn/SegmentModel';

interface Props {
  segment: SegmentModel|null;
  className?: string;
}

export const MiniSegmentDivider: React.FC<Props> = props => {

  return (
    <div className={classNames(props.className)}>
      <div className={'segment-divider-placeholder'}>
        <div className={'segment-divider--bar'}/>
        <div className={'segment-divider--box-container'}>
          <div className={'segment-divider--box'}>
            <div className={'add-segment-form'}>
              <div className={classNames('segment-value', 'segment-start')}>
                {props.segment!.startTime.format('HH:mm:ss') + 'Z'}
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={classNames('segment-value', 'segment-end')}>
                {props.segment!.endTime.format('HH:mm:ss') + 'Z'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StyledMiniSegmentDivider = styled(MiniSegmentDivider)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .segment-divider-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .segment-divider--bar {
    margin-bottom: -4px;
    margin-left: 2px;
    width: 459px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: radial-gradient(175px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});
    z-index: 3;
  }
  
  .segment-spacer {
    width: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .segment-divider--box {
    width: 306px;
    height: 26px;
    margin-top: -4px;
    background: ${theme.color.backgroundBase};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 36px 0 36px;
    z-index: 1;
  }
  .segment-divider--box-container {
    width: 314px;
    height: 30px;
    background: radial-gradient(175px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 4px 4px 4px;
    z-index: 1;
  }
  
  .add-segment-form {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;
