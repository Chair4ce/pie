import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import { Bullet } from '../../../resources/icons/Bullet';
import { PocTooltip } from '../../components/TextTooltip';
import { TgtAssociationModel } from '../../../store/scoi/AssociationModels';

interface MyProps {
  tgtAssociation: TgtAssociationModel;
  className?: string;
}

export const TgtAssociationBullet: React.FC<MyProps> = (props) => {

  const printPocs = (): string => {
    let pocString = '';
    for (let index in props.tgtAssociation.emails) {
      pocString += (props.tgtAssociation.emails[+index] + '@mail.smil.mil');
      if (+index < props.tgtAssociation.emails.length - 1) {
        pocString += ', ';
      }
    }
    return pocString;
  };

  let emailsString = printPocs();
  let pocs = props.tgtAssociation.emails.length === 0 ? '' : `POC: ${emailsString}`;

  return (
    <div className={props.className}>
      <Bullet/>
      <span>{props.tgtAssociation.name}</span>
      <span>{props.tgtAssociation.mgrs}</span>
      {props.tgtAssociation.emails.length > 1 ?
        <PocTooltip title={emailsString}>
          <div className={'emails cursor'}>{pocs}</div>
        </PocTooltip>
        :
        <div className={'emails'}>{pocs}</div>
      }
    </div>
  );
};

export const StyledTgtAssociationBullet = styled(TgtAssociationBullet)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  //margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 720px;

  span {
  height: 19px;
    margin-right: 20px;
  }
  
  .emails {
    height: 19px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .cursor {
    cursor: pointer;
  }
  
  svg {
    margin: 0 9px 2px 4px;
    flex-shrink: 0;
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
`;
