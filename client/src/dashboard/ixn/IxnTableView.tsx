import * as React from 'react';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledIxnTable } from './table/IxnTable';
import { StyledSegmentDivider } from './table/SegmentDivider';
import classNames from 'classnames';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { StyledSegmentRegion } from './table/SegmentRegion';
import { TargetModel } from '../../store/tgt/TargetModel';
import IxnModel from '../../store/ixn/IxnModel';
import { StyledIxnSidebar } from './sidebar/IxnSidebar';

interface MyProps {
  target: TargetModel;
  segments: SegmentModel[];
  ixns: IxnModel[];
  autofocus: boolean;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  collapsedSegments: number[];
  collapse: (segmentId: number) => void;
  userName: string;
  dateString: string;
  readOnly: boolean;
  addSegment: boolean;
  editSegment: number;
  editIxn: number;
  addNote: number;
  highlight: number;
  selectTarget: (target: TargetModel, dateString: string) => void;
  handleSetAddSegment: () => void;
  handleEditSegment: (segmentId: number) => void;
  handleEditIxn: (ixnId: number) => void;
  handleAddNote: (ixnId: number) => void;
  handlePostSegment: (segment: SegmentModel) => void;
  handlePostIxn: (ixn: IxnModel) => void;
  handleDeleteIxn: (ixn: IxnModel) => void;
  handleDeleteSegment: (segment: SegmentModel) => void;
  addingOrEditing: boolean;
  setEditingElement: (e: Element|null) => void;
  setSegmentChanged: (isSegmentChanged: boolean) => void;
  setIxnChanged: (isIxnChanged: boolean) => void;
  className?: string;
}

export const IxnTableView: React.FC<MyProps> = (props) => {

  function printSegmentRegions() {
    return props.segments.map(
      (segment: SegmentModel, index: number) =>
        <StyledSegmentRegion
          target={props.target}
          segment={segment}
          ixns={props.ixns.filter((ixn) => ixn.segmentId === segment.id)}
          key={index}
          postSegment={props.handlePostSegment}
          postIxn={props.handlePostIxn}
          deleteIxn={props.handleDeleteIxn}
          tgtAnalyst={props.tgtAnalyst}
          setTgtAnalyst={props.setTgtAnalyst}
          cancelAddSegment={props.handleSetAddSegment}
          deleteSegment={props.handleDeleteSegment}
          editSegment={props.editSegment}
          setEditSegment={props.handleEditSegment}
          editIxn={props.editIxn}
          setEditIxn={props.handleEditIxn}
          addingOrEditing={props.addingOrEditing}
          autofocus={props.autofocus}
          collapsed={props.collapsedSegments.includes(segment.id as number)}
          setCollapsed={props.collapse}
          userName={props.userName}
          dateString={props.dateString}
          addNote={props.addNote}
          setAddNote={props.handleAddNote}
          readOnly={props.readOnly}
          setEditingElement={props.setEditingElement}
          setSegmentChanged={props.setSegmentChanged}
          setIxnChanged={props.setIxnChanged}
          highlight={props.highlight}
        />,
    );
  }

  return (
    <div className={classNames(props.className, 'ixn-dash')}>
      <StyledIxnSidebar
        selectedTarget={props.target}
        selectTarget={props.selectTarget}
      />
      <div className={'ixn-dash-body'}>
        {props.segments.length > 0 ?
          <StyledTableHeader
            headers={['Exploit Analyst', 'Time', 'Callout', 'Track Analyst', 'Track Status', 'Track ID',
              'Checker', 'delete-spacer']}
          />
          :
          null
        }
        <StyledIxnTable>
          {printSegmentRegions()}
          {props.addSegment && !props.readOnly ?
            <StyledSegmentDivider
              className={'segment-divider-empty'}
              target={props.target}
              segment={null}
              postSegment={props.handlePostSegment}
              postIxn={props.handlePostIxn}
              deleteSegment={props.handleDeleteSegment}
              cancelAddSegment={props.handleSetAddSegment}
              hasIxns={false}
              setEdit={props.handleEditSegment}
              editing={true}
              disabled={false}
              disableCancel={props.segments.length === 0}
              setEditingElement={props.setEditingElement}
              setSegmentChanged={props.setSegmentChanged}
            />
            :
            null
          }
          {props.segments.length < 1 && !props.readOnly ?
          <span className={'segment-helper-text'}>Input a Start And Stop Time For Your Segment</span> : null}
        </StyledIxnTable>
        {/*Prevents user from tabbing out of page to address bar*/}
        <input className={'hidden-input'}/>
      </div>
      <div className={'ixn-body-spacer'}>&nbsp;</div>
    </div>
  );
};
