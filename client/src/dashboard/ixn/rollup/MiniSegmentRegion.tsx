import * as React from 'react';
import styled from 'styled-components';
import { SegmentModel } from '../../../store/ixn/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import { StyledMiniSegmentDivider } from './MiniSegmentDivider';
import { StyledMiniIxnRow } from './MiniIxnRow';
import { RollupMode } from '../RollupView';

interface MyProps {
  segment: SegmentModel;
  ixns: IxnModel[];
  rollupMode: RollupMode;
  selectedIxns: number[];
  select: (ixnId: number) => void;
  readOnly: boolean;
  className?: string;
}

export const MiniSegmentRegion: React.FC<MyProps> = (props) => {

  const printRows = () => {
    return props.ixns.map((ixn: IxnModel, index: number) =>
                        <StyledMiniIxnRow
                          ixn={ixn}
                          key={index}
                          selected={props.selectedIxns.includes(ixn.id as number)}
                          select={props.select}
                          rollupMode={props.rollupMode}
                          readOnly={props.readOnly}
                        />,
    );
  };

  return (
    <div className={props.className}>
      <StyledMiniSegmentDivider
        segment={props.segment}
      />
      {printRows()}
    </div>
  );
};

export const StyledMiniSegmentRegion = styled(MiniSegmentRegion)`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
