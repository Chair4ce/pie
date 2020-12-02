import * as React from 'react';
import styled from 'styled-components';
import { StyledTgtRow } from './TgtRow';
import { StyledExploitDateDivider } from './ExploitDateDivider';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../../store/tgt/TargetModel';
import RfiModel from '../../../store/rfi/RfiModel';
import { Status } from '../TgtDashboard';
import { StyledTgtInputRow } from './TgtInputRow';
import theme from '../../../resources/theme';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../../store/tgt/ExploitDatePostModel';
import classNames from 'classnames';

interface MyProps {
  rfi: RfiModel;
  addDate: boolean;
  setAddDate: (addDate: boolean) => void;
  exploitDate: ExploitDateModel;
  exploitDateDisplay: string;
  targets: TargetModel[];
  setAddEditTarget: (status: Status, id?: number) => void;
  editTarget: number;
  addTgt: number;
  index: number;
  addingOrEditing: boolean;
  postTarget: (target: TargetPostModel) => void;
  postExploitDate: (date: ExploitDatePostModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgt: TargetModel) => void;
  deleteExploitDate: (exploitDate: ExploitDateModel) => void;
  disabled: boolean;
  highlight: boolean;
  setEditingElement: (e: Element|null) => void;
  className?: string;
}

export const TgtDateRegion: React.FC<MyProps> = (props) => {

  function printTargets() {
    return props.targets.map(
      (target: TargetModel, index: number) =>
        props.editTarget === target.id ?
          <StyledTgtInputRow
            target={target}
            key={index}
            rfi={props.rfi}
            exploitDate={props.exploitDate}
            setAddEditTarget={props.setAddEditTarget}
            addingOrEditing={props.addingOrEditing}
            postTarget={props.postTarget}
            setEditingElement={props.setEditingElement}
          />
          :
          <StyledTgtRow
            target={target}
            key={index}
            rfi={props.rfi}
            exploitDate={props.exploitDate}
            setAddEditTarget={props.setAddEditTarget}
            addingOrEditing={props.addingOrEditing}
            postTarget={props.postTarget}
            deleteTgt={props.deleteTgt}
            navigateToIxnPage={props.navigateToIxnPage}
            highlight={props.highlight}
          />,
    );
  }

  return (
    <div className={props.className}>
      <StyledExploitDateDivider
        rfiId={props.rfi.id}
        setAddDate={props.setAddDate}
        exploitDate={props.exploitDate}
        exploitDateDisplay={
          new Date(props.exploitDate.exploitDate.utc().unix() * 1000
                     + (new Date().getTimezoneOffset() * 60 * 1000) + 60 * 60 * 1000).toString()
        }
        className={'date-divider--' + props.exploitDateDisplay}
        uKey={props.index}
        hasTgts={props.targets.length > 0}
        postExploitDate={props.postExploitDate}
        deleteExploitDate={props.deleteExploitDate}
        disabled={props.addingOrEditing}
        highlight={props.highlight}
      />
      <div className={'tgt-input'}>
        {printTargets()}
        {props.addTgt === props.exploitDate.id ?
          <StyledTgtInputRow
            target={null}
            key={99999}
            rfi={props.rfi}
            exploitDate={props.exploitDate}
            setAddEditTarget={props.setAddEditTarget}
            addingOrEditing={props.addingOrEditing}
            postTarget={props.postTarget}
            setEditingElement={props.setEditingElement}
          />
          :
          <div
            className={classNames('add-tgt-button', 'no-select', props.disabled ? 'disabled' : null)}
            onClick={() => props.setAddEditTarget(Status.ADD, props.exploitDate.id)}
          >
            Add Target
          </div>
        }
      </div>
    </div>
  );
};

export const StyledTgtDateRegion = styled(TgtDateRegion)`
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRegion};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  
  .separator-line {
    flex-grow: 1;
    height: 2px;
    border-radius: 4px;
    background: ${theme.color.fontPrimary};
    margin-bottom: 8px;
  }
  
  .separator-title {
    width: 108px;
    text-align: center;
  }
  
  .input-tgt-name {
    width: 115px;
  }
  
  .input-mgrs {
    width: 141px;
  }
  
  .input-notes {
    width: 389px;
    font-size: 12pt;
  }
  
  .input-description {
    width: 262px;
    font-size: 12pt;
  }
  
  .input-status {
    width: 140px;
  }
  
  .input-delete {
    border-left: 4px solid ${theme.color.backgroundBase};
    width: 89px;
    height: 62px;
  }
  
  .input-exploitation {
    border-left: 4px solid ${theme.color.backgroundBase};
    width: 111px;
    height: 62px;
  }
  
  .tgt-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 1212px;
  }
  
  .add-tgt-form-box {
    height: 62px;
    min-width: 1359px;
    margin-top: 8px;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
`;
