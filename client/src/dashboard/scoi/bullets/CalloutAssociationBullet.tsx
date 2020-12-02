import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import { Bullet } from '../../../resources/icons/Bullet';
import { IxnAssociationModel } from '../../../store/scoi/AssociationModels';

interface MyProps {
  ixnAssociation: IxnAssociationModel;
  className?: string;
}

const CalloutAssociationBullet: React.FC<MyProps> = (props) => {

  return (
    <div className={props.className}>
      <span>
        <Bullet/>
        <span>{props.ixnAssociation.activity}</span>
      </span>
    </div>
  )
}

export const StyledCalloutAssociationBullet = styled(CalloutAssociationBullet)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  //margin-top: 4px;

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
`
