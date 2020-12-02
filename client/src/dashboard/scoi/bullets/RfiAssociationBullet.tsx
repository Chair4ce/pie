import * as React from 'react';
import { formatRfiNum } from '../../../utils';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import { Bullet } from '../../../resources/icons/Bullet';
import { RfiAssociationModel } from '../../../store/scoi/AssociationModels';

interface MyProps {
  rfiAssociation: RfiAssociationModel;
  className?: string;
}

const RfiAssociationBullet: React.FC<MyProps> = (props) => {

  return (
    <div className={props.className}>
      <span>
        <Bullet/>
        <span className={'rfi-num'}>{`RFI: ${formatRfiNum(props.rfiAssociation.rfiNum)}`}</span>  {props.rfiAssociation.description}
      </span>
    </div>
  )
}

export const StyledRfiAssociationBullet = styled(RfiAssociationBullet)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-top: 8px;

  span {
    display: inline-block;
  }
  
  svg {
    margin: 0 9px 2px 4px;
  }
 
  .info-bullet {
    margin-top: 8px;
    flex-shrink: 0;
    flex-grow: 0;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: ${theme.color.bullet};
  }
  
  .rfi-num {
    color: ${theme.color.toggleActive};
  }
`
