import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import classNames from 'classnames';
import { ScoiModel } from '../../../store/scoi/ScoiModel';
import { MgrsTooltip } from '../../components/TextTooltip';

interface MyProps {
  scoi: ScoiModel;
  className?: string;
}

const ScoiChip: React.FC<MyProps> = (props) => {
  return (
    <div className={classNames('scoi-chip', props.className)}>
      <MgrsTooltip className={'mgrs-tooltip'}  title={'MGRS: ' + props.scoi.mgrs}>
        <span>{props.scoi.name}</span>
      </MgrsTooltip>
    </div>
  );
};

export const StyledScoiChip = styled(ScoiChip)`
  background: ${theme.color.backgroundScoiTag};
  border-radius: 4px;
  margin-left: 8px;
  margin-top: 8px;
  height: 19px;
  width: 135px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  padding: 0 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
