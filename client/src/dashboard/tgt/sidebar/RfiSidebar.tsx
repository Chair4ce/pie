import * as React from 'react';
import RfiModel from '../../../store/rfi/RfiModel';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { StyledMiniRfiRow } from './MiniRfiRow';
import { StyledMiniRfiRegion } from './MiniRfiRegion';
import ScrollShadow from 'react-scroll-shadow';
import theme from '../../../resources/theme';
import classNames from 'classnames';
import styled from 'styled-components';


interface MyProps {
  rfi: RfiModel;
  selectRfi: (rfi: RfiModel) => void;
  className?: string;
}

function printRows(rfis: RfiModel[], selectedRfiId: number, selectRfi: (rfi: RfiModel) => void) {
  return rfis.map((rfi: RfiModel, index: number) =>
                    <StyledMiniRfiRow rfi={rfi} key={index} index={index} selected={selectedRfiId === rfi.id}
                                      selectRfi={selectRfi}/>,
  );
}

export const RfiSidebar: React.FC<MyProps> = (props) => {
  let openRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.openRfis);
  let closedRfis: RfiModel[] = useSelector(({rfiState}: ApplicationState) => rfiState.closedRfis);

  return (
    <div className={props.className}>
      <div className={classNames('sidebar-container', 'no-select', 'collapsed')}>
        <ScrollShadow
          bottomShadowColors={{
            active: 'linear-gradient(to top, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, #041319 0%, #1B2326 82px, ${theme.color.backgroundBase} 82px);`,
          }}
          topShadowColors={{
            active: 'linear-gradient(to bottom, #000000 0%, #00000000 100%);',
            inactive: `linear-gradient(90deg, #041319 0px, #1B2326 82px, ${theme.color.backgroundBase} 82px);`,
          }}
          shadowSize={10}
        >
            <div className={'mini-rfi-table-collapsed'}>
              {openRfis.length > 0 ?
                <StyledMiniRfiRegion
                  title={'pri'}
                  emptyMessage={''}
                >
                  {printRows(openRfis, props.rfi.id, props.selectRfi)}
                </StyledMiniRfiRegion>
                :
                null
              }
              <StyledMiniRfiRegion
                title={'cld'}
                emptyMessage={''}
              >
                {printRows(closedRfis, props.rfi.id, props.selectRfi)}
              </StyledMiniRfiRegion>
            </div>
        </ScrollShadow>
      </div>
    </div>
  );
};

export const StyledRfiSidebar = styled(RfiSidebar)`

  .sidebar-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(90deg, #041319 0px, #1B2326 210px, ${theme.color.backgroundBase} 210px);
    height: calc(100vh - 63px);
    margin-right: 5px;
  }
  
  .collapsed {
    background: linear-gradient(90deg, #041319 0px, #1B2326 82px, ${theme.color.backgroundBase} 82px) !important;
  }
  
  .mini-rfi-table {
    padding: 21px 32px 21px 8px;
  }
  
  .mini-rfi-table-collapsed {
    padding: 21px 20px 21px 8px;
  }
`;
