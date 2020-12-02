import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import theme from '../../../resources/theme';

interface MyProps {
  exploitDateString: string;
  className?: string;
}

export const MiniDateDivider: React.FC<MyProps> = props => {
  return (
    <div className={classNames('date-divider', 'pending', props.className)}>
      <span>{props.exploitDateString}</span>
    </div>
  )
};

export const StyledMiniDateDivider = styled(MiniDateDivider)`
  width: 42px;
  height: 30px;
  font-weight: ${theme.font.weightMedium};
  font-size: ${theme.font.sizeRowSmall};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  border: 4px solid ${theme.color.dateDividerBox};
  border-radius: 6px;
`;
