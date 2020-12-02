import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../resources/theme';
import { IxnAssociationModel } from '../../../store/scoi/AssociationModels';
import ExpandCollapseTrackArrow from '../../../resources/icons/ExpandCollapseTrackArrow';
import classNames from 'classnames';

interface MyProps {
  ixnAssociation: IxnAssociationModel;
  className?: string;
}

export const TrackAssociationBullet: React.FC<MyProps> = (props) => {
  const [showTrackNarrative, setShowTrackNarrative] = useState(false);

  const toggleTrackNarrative = () => {
    setShowTrackNarrative(!showTrackNarrative);
  };

  return (
    <div className={props.className}>
      <div className={'track-association'}>
        <div className={classNames(showTrackNarrative ? 'callout-expanded' : null, 'callout', 'no-select')} onClick={toggleTrackNarrative}>
          <ExpandCollapseTrackArrow
            collapsed={!showTrackNarrative}
          />
          <span>{props.ixnAssociation.activity}</span>
        </div>
        {showTrackNarrative ?
          <>{props.ixnAssociation.trackNarrative}</>
          :
          null
        }
      </div>
    </div>
  );
};

export const StyledTrackAssociationBullet = styled(TrackAssociationBullet)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-top: 4px;
  width: 100%;
  
  span {
    display: inline-block;
  }
  
  .track-narrative {
      display: inline-block;
  }
  
  .track-association {
    padding-top: 4px;
  }
  
  .callout {
    margin: -2px 4px -2px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 11.5px;
    padding: 2px 6px;
    width: fit-content;
    float: left;

    :hover {
      background: ${theme.color.backgroundFocus};
    }
  }
  
  .callout-expanded {
    color: ${theme.color.toggleActive};
  }
`;
