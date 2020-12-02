import * as React from 'react';
import ScrollShadow from 'react-scroll-shadow';
import theme from '../../../resources/theme';
import styled from 'styled-components';
import { TargetModel } from '../../../store/tgt/TargetModel';
import { StyledMiniTgtRow } from './MiniTgtRow';
import { StyledMiniDateRegion } from './MiniDateRegion';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';

interface MyProps {
  selectedTarget: TargetModel;
  selectTarget: (target: TargetModel, dateString: string) => void;
  className?: string;
}

export const IxnSidebar: React.FC<MyProps> = (props) => {
  const targets: TargetModel[] = useSelector(({tgtState}: ApplicationState) => tgtState.targets);
  const exploitDates: ExploitDateModel[] = useSelector(({tgtState}: ApplicationState) => tgtState.exploitDates);

  const handleSelectTarget = (target: TargetModel) => {
    props.selectTarget(target, exploitDates.find(
      exploitDate => exploitDate.id === target.exploitDateId)!.exploitDate.format('MM/DD/YYYY'));
  };

  const printRows = (exploitDateId: number) => {
    return targets.filter(tgt => tgt.exploitDateId === exploitDateId)
      .map((tgt: TargetModel, index: number) =>
             <StyledMiniTgtRow
               tgt={tgt}
               key={index}
               index={index}
               selected={props.selectedTarget.id === tgt.id}
               selectTgt={handleSelectTarget}
             />,
      );
  };

  const mapDateRegions = () => {
    return exploitDates.map(
      (exploitDate, index: number) =>
        <StyledMiniDateRegion
          title={exploitDate.exploitDate.format('MM/DD')}
          emptyMessage={''}
          key={index}
        >
          {printRows(exploitDate.id)}
        </StyledMiniDateRegion>,
    );
  };

  return (
    <div className={props.className}>
      <div className={'sidebar-container'}>
        <ScrollShadow
          bottomShadowColors={{
            active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, ${theme.color.backgroundBase} 0%, ${theme.color.backgroundIxnSidebar} 58px,` +
              ` ${theme.color.backgroundBase} 58px);`,
          }}
          topShadowColors={{
            active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, ${theme.color.backgroundBase} 0%, ${theme.color.backgroundIxnSidebar} 58px,` +
              ` ${theme.color.backgroundBase} 58px);`,
          }}
          shadowSize={10}
        >
          <div className={'mini-tgt-table'}>
            {mapDateRegions()}
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
};

export const StyledIxnSidebar = styled(IxnSidebar)`
  display: flex;
  justify-self: flex-start !important;
  
  .sidebar-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(90deg, ${theme.color.backgroundBase} 0%, ${theme.color.backgroundIxnSidebar} 58px, 
      ${theme.color.backgroundBase} 58px);
    height: calc(100vh - 63px);
    width: 70px;
    margin-right: 10px;
  }
  
  .mini-tgt-table {
    padding: 21px 20px 21px 8px;
  }
`;
