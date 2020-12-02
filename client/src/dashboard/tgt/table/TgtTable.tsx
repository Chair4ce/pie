import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import ScrollShadow from '../../components/scroll-shadow';

interface MyProps {
  displayHelperText: boolean;
  className?: string;
}

export const TgtTable: React.FC<MyProps> = (props) => {
  return (
    <div className={classNames('tgt-table-wrapper', props.className)} id={'tgt-table-scrollable-region'}>
      <ScrollShadow
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
        <div className={'tgt-table'}>
          {props.children}
          {props.displayHelperText ?
            <div className={'helper-text'}>
              Input or select a coverage date for your targets
            </div>
            :
            null
          }
        </div>
      </ScrollShadow>
    </div>
  );
};

export const StyledTgtTable = styled(TgtTable)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 56px;
  height: 100%;
  margin-left: 5px;
  
  .tgt-table {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 26px;
    padding-right: 20px;
  }
  
  .helper-text {
    margin-top: 50px;
    text-align: center;
    font-size: ${theme.font.sizeHeader};
    align-self: center;
  }
`;
