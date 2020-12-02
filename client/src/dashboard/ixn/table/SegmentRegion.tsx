import * as React from 'react';
import { useState } from 'react';
import { StyledSegmentDivider } from './SegmentDivider';
import styled from 'styled-components';
import { TargetModel } from '../../../store/tgt/TargetModel';
import { SegmentModel } from '../../../store/ixn/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import { StyledIxnRow } from './IxnRow';
import { StyledIxnInputRow } from './IxnInputRow';
import ExpandCollapseArrowButton from '../../../resources/icons/ExpandCollapseArrowButton';
import theme from '../../../resources/theme';
import classNames from 'classnames';

interface MyProps {
  target: TargetModel;
  segment: SegmentModel;
  ixns: IxnModel[];
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  postSegment: (segment: SegmentModel) => void;
  deleteSegment: (segment: SegmentModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  cancelAddSegment: () => void;
  editSegment: number;
  setEditSegment: (segmentId: number) => void;
  editIxn: number;
  setEditIxn: (ixnId: number) => void;
  addingOrEditing: boolean;
  autofocus: boolean;
  collapsed: boolean;
  setCollapsed: (segmentId: number) => void;
  userName: string;
  dateString: string;
  addNote: number;
  highlight: number;
  setAddNote: (ixnId: number) => void;
  readOnly: boolean;
  setEditingElement: (e: Element|null) => void;
  setSegmentChanged: (isSegmentChanged: boolean) => void;
  setIxnChanged: (isIxnChanged: boolean) => void;
  className?: string;
}

export const SegmentRegion: React.FC<MyProps> = (props) => {
  const [adding, setAdding] = useState(false);

  const printRows = () => {
    let ixns: (IxnModel|null)[] = Array.from(props.ixns);
    if (!ixns.includes(null) && !props.readOnly) {
      ixns.push(null);
    } //input row--mapped to force a re-render

    return ixns.map((ixn: IxnModel|null, index: number) =>
                      (ixn === null || props.editIxn === ixn.id || props.addNote === ixn.id) ?
                        <StyledIxnInputRow
                          ixn={ixn}
                          key={index}
                          segment={props.segment}
                          postIxn={props.postIxn}
                          deleteIxn={props.deleteIxn}
                          tgtAnalyst={props.tgtAnalyst}
                          setTgtAnalyst={props.setTgtAnalyst}
                          setEditIxn={props.setEditIxn}
                          autofocus={props.autofocus}
                          setAdding={setAdding}
                          disabled={(ixn === null && (props.addNote > 0 || props.editIxn > 0)) || props.readOnly}
                          addingNote={ixn !== null && props.addNote === ixn.id}
                          setAddNote={props.setAddNote}
                          setEditingElement={props.setEditingElement}
                          setIxnChanged={props.setIxnChanged}
                        />
                        :
                        <StyledIxnRow
                          ixn={ixn}
                          key={index}
                          segment={props.segment}
                          postIxn={props.postIxn}
                          deleteIxn={props.deleteIxn}
                          tgtAnalyst={props.tgtAnalyst}
                          setTgtAnalyst={props.setTgtAnalyst}
                          setEditIxn={props.setEditIxn}
                          addingOrEditing={props.addingOrEditing}
                          userName={props.userName}
                          dateString={props.dateString}
                          setAddNote={props.setAddNote}
                          disabled={props.addNote > 0 || props.editIxn > 0}
                          readOnly={props.readOnly}
                          highlight={props.highlight}
                        />,
    );
  };

  const handleCollapseClick = () => {
    if (props.ixns.filter((ixn) => ixn !== null && ixn.id === props.editIxn).length > 0) {
      setTimeout(() => {
        let element = document.getElementById('ixn-time-' + props.editIxn);
        if (element !== null) {
          element.focus();
        } else {
          props.setCollapsed(props.segment.id!);
        }
      }, 500);
    } else if (adding) {
      setTimeout(() => {
        if (document.getElementsByClassName('input-error-msg').length === 0) {
          props.setCollapsed(props.segment.id!);
        } else {
          let element = document.getElementById('ixn-time-' + props.segment.id! + '-new');
          if (element !== null) {
            element.focus();
          }
        }
      }, 500);
    } else {
      props.setCollapsed(props.segment.id!);
    }
  };

  return (
    <div className={props.className}>
      <StyledSegmentDivider
        target={props.target}
        segment={props.segment}
        postSegment={props.postSegment}
        postIxn={props.postIxn}
        deleteSegment={props.deleteSegment}
        cancelAddSegment={props.cancelAddSegment}
        hasIxns={props.ixns.length > 0}
        editing={props.editSegment === props.segment.id}
        setEdit={props.setEditSegment}
        disabled={props.readOnly}
        disableCancel={false}
        setEditingElement={props.setEditingElement}
        setSegmentChanged={props.setSegmentChanged}
      />
      {props.ixns.length > 0 ?
        <div className={classNames(props.collapsed ? 'expand-button' : 'collapse-button',
                                   'expand-collapse')} onClick={props.collapsed ? handleCollapseClick : () => {
        }}>
          <ExpandCollapseArrowButton className={'expand-collapse-arrow'} collapsed={props.collapsed}
                                     onClick={props.collapsed ? () => {} : handleCollapseClick}/>
        </div>
        :
        null
      }
      {props.collapsed ? null : printRows()}
    </div>
  );
};

export const StyledSegmentRegion = styled(SegmentRegion)`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  width: 1455px;
  
  .expand-collapse {
    width: 1410px;
    margin-top: -35px;
    height: 28px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 8px;
    align-self: flex-start;
    margin-left: 27px;
  }
  
  .expand-button {
    border-radius: 6px;
    background-color: ${theme.color.backgroundInformation};
  }
`;
