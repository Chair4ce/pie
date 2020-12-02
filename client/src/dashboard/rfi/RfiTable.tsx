import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import RfiModel from '../../store/rfi/RfiModel';
import { Field, SortKeyModel } from '../../store/sort/SortKeyModel';
import { ClosedRfiRow, OpenRfiRow, PendingRfiRow } from './region/RfiRow';
import { StyledRfiTableHeader } from './rfiDashboardTableHeader/RfiTableHeader';
import { StyledRfiRegion } from './region/RfiRegion';
import ScrollShadow from '../components/scroll-shadow';

interface Props {
  pendingRfis: RfiModel[];
  openRfis: RfiModel[];
  closedRfis: RfiModel[];
  reorderRfis: (openRfis: RfiModel[], newRfis: RfiModel[], rfiNum: string, newIndex: number) => void;
  sortKey: SortKeyModel;
  selectRfi: (rfiId: number) => void;
  selectedRfiId: number;
  sortRfis: (field: Field) => void;
  className?: string;
}

function pendingRfis(rfis: RfiModel[], scrollRegionRef: any, prioritizing: boolean, selectedRfiId: number,
                     selectRfi: (rfiId: number) => void) {
  if (prioritizing) {
    return rfis.map((rfi: RfiModel, index: number) =>
                      <Draggable draggableId={rfi.rfiNum} index={index} key={rfi.rfiNum}>
                        {(provided, snapshot) => {
                          return (
                            // @ts-ignore
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={rfi.rfiNum}
                              ref={provided.innerRef}
                            >
                              <PendingRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}
                                             prioritizing={true}
                                             selected={selectedRfiId === rfi.id} selectRfi={selectRfi}/>
                            </div>
                          );
                        }}
                      </Draggable>,
    );
  } else {
    return rfis.map((rfi: RfiModel, index: number) =>
                      <PendingRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}
                                     prioritizing={false}
                                     selected={selectedRfiId === rfi.id} selectRfi={selectRfi}/>,
    );
  }
}

function openRfis(rfis: RfiModel[], scrollRegionRef: any, prioritizing: boolean,
                  selectedRfiId: number, selectRfi: (rfiId: number) => void) {


  if (prioritizing) {
    return rfis.map((rfi: RfiModel, index: number) =>
                      <Draggable draggableId={rfi.rfiNum} index={index} key={rfi.rfiNum}>
                        {(provided, snapshot) => {
                          return (
                            // @ts-ignore
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={rfi.rfiNum}
                              ref={provided.innerRef}
                            >
                              <OpenRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}
                                          prioritizing={true}
                                          selected={selectedRfiId === rfi.id} selectRfi={selectRfi}/>
                            </div>
                          );
                        }}
                      </Draggable>,
    );
  } else {
    return rfis.map((rfi: RfiModel, index: number) =>
                      <OpenRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}
                                  prioritizing={false}
                                  selected={selectedRfiId === rfi.id} selectRfi={selectRfi}/>,
    );
  }
}

function closedRfis(rfis: RfiModel[], scrollRegionRef: any, selectedRfiId: number, selectRfi: (rfiId: number) => void) {
  return rfis.map((rfi: RfiModel, index: number) =>
                    <ClosedRfiRow rfi={rfi} key={index} scrollRegionRef={scrollRegionRef} index={index}
                                  selected={selectedRfiId === rfi.id} selectRfi={selectRfi}/>,
  );
}

export const RfiTable: React.FC<Props> = props => {
  let scrollRegionRef = React.createRef();
  let prioritizing = props.sortKey.field === Field.PRIORITY && props.sortKey.defaultOrder;

  function reorder(dropResult: DropResult) {
    if (dropResult.destination && dropResult.destination.droppableId === 'region--droppable--open'
      && props.sortKey.field === Field.PRIORITY && props.sortKey.defaultOrder) {
      props.reorderRfis(props.openRfis, props.pendingRfis, dropResult.draggableId, dropResult.destination!.index);
    }
  }

  return (
    <div className={classNames('rfi-table', props.className)}>
      <DragDropContext onDragEnd={reorder}>
        <StyledRfiTableHeader
          sortKey={props.sortKey}
          sortRfis={props.sortRfis}
        />
        <div className={'rfi-table--body'}>
          <ScrollShadow
            scrollRef={scrollRegionRef}
            bottomShadowColors={{
              active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
              inactive: theme.color.backgroundBase,
            }}
            topShadowColors={{
              active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
              inactive: theme.color.backgroundBase,
            }}
            shadowSize={10}
          >
            <Droppable droppableId={`region--droppable--open`}>
              {(provided, snapshot) => {
                return (
                  <StyledRfiRegion
                    title={'prioritized'}
                    emptyMessage={'No Open found'}
                    provided={provided}
                  >
                    {openRfis(props.openRfis, scrollRegionRef, prioritizing, props.selectedRfiId,
                              props.selectRfi)}
                  </StyledRfiRegion>
                );
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--pending`}>
              {(provided, snapshot) => {
                return (
                  <StyledRfiRegion
                    title={'new'}
                    emptyMessage={'Congratulations! Your team opened all the new RFIs in GETS.'}
                    provided={provided}
                  >
                    {pendingRfis(props.pendingRfis, scrollRegionRef, prioritizing, props.selectedRfiId,
                                 props.selectRfi)}
                  </StyledRfiRegion>
                );
              }}
            </Droppable>
            <Droppable droppableId={`region--droppable--closed`}>
              {(provided, snapshot) => {
                return (
                  <StyledRfiRegion
                    title={'closed'}
                    emptyMessage={''}
                    provided={provided}
                  >
                    {closedRfis(props.closedRfis, scrollRegionRef, props.selectedRfiId, props.selectRfi)}
                  </StyledRfiRegion>
                );
              }}
            </Droppable>
          </ScrollShadow>
        </div>
      </DragDropContext>
    </div>
  );
};

export const StyledRfiTable = styled(RfiTable)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 628px;
  
  .rfi-table--body{
    overflow-y: auto; 
    display: flex;
  }
`;
