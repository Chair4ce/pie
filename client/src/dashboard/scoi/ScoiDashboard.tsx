import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme, { rowStyles } from '../../resources/theme';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { useDispatch, useSelector } from 'react-redux';
import { editScoi, exitScoiPage, postScoiUpdate } from '../../store/scoi/Actions';
import { StyledScoiTable } from './ScoiTable';
import { ScoiModel } from '../../store/scoi/ScoiModel';
import { ApplicationState } from '../../store';
import { StyledRfiAssociationBullet } from './bullets/RfiAssociationBullet';
import { StyledTgtAssociationBullet } from './bullets/TgtAssociationBullet';
import { IxnAssociationModel, RfiAssociationModel, TgtAssociationModel } from '../../store/scoi/AssociationModels';
import { StyledCalloutAssociationBullet } from './bullets/CalloutAssociationBullet';
import { StyledTrackAssociationBullet } from './bullets/TrackAssociationBullet';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../utils';
import { IxnInfoButton, RfiInfoButton, TgtInfoButton, TrackInfoButton } from '../../resources/icons/RfiInfoButton';

interface MyProps {
  className?: string;
}

export const ScoiDashboard: React.FC<MyProps> = (props) => {
  const scois: ScoiModel[] = useSelector(({scoiState}: ApplicationState) => scoiState.scois);
  const editingScoiId = useSelector(({scoiState}: ApplicationState) => scoiState.editingScoiId);

  const [selectedScoiId, setSelectedScoiId] = useState(scois.length > 0 ? scois[0].id : -1);
  const [showRfiInfo, setShowRfiInfo] = useState(true);
  const [rfiInfo, setRfiInfo] = useState([] as RfiAssociationModel[]);
  const [showTargetInfo, setShowTargetInfo] = useState(true);
  const [targetInfo, setTargetInfo] = useState([] as TgtAssociationModel[]);
  const [showCalloutInfo, setShowCalloutInfo] = useState(true);
  const [showTrackInfo, setShowTrackInfo] = useState(true);
  const [ixnInfo, setIxnInfo] = useState([] as IxnAssociationModel[]);
  let selectedScoi: ScoiModel|undefined = scois.find(scoi => scoi.id === selectedScoiId);

  const cookie: Cookie = useCookies(['magpie'])[0].magpie;

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const rowClasses = rowStyles();

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  document.onkeydown = checkKey;

  function checkKey(e: any) {
    let scoiId: number|undefined = undefined;
    if (selectedScoi) {
      //Up arrow
      if (e.keyCode === 38) {
        let index = scois.indexOf(selectedScoi);
        if (index > 0) {
          scoiId = scois[index - 1].id;
          setSelectedScoiId(scoiId);
        }
      }
      //Down arrow
      else if (e.keyCode === 40) {
        let index = scois.indexOf(selectedScoi);
        if (index < scois.length - 1) {
          scoiId = scois[index + 1].id;
          setSelectedScoiId(scoiId);
        }
      }
      if (scoiId) {
        setTimeout(() => {
          let element = document.getElementById('scoi-row-' + scoiId);
          if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
          }
        }, 50);
      }
    }
  }

  useEffect(() => {
    if (showRfiInfo && selectedScoi) {
      fetch('/api/scoi/rfi?name=' + selectedScoi.name, {method: 'get'})
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return;
          }
        })
        .then(jsons => {
          if (jsons) {
            setRfiInfo(jsons);
          } else {
            setRfiInfo([]);
          }
        })
        .catch((reason) => console.log(reason));
    }
  }, [showRfiInfo, selectedScoiId]);

  useEffect(() => {
    if (showTargetInfo && selectedScoi) {
      // callApi('get', '/api/scoi/tgt?name=' + selectedScoi.name)
      fetch('/api/scoi/tgt?name=' + selectedScoi.name, {method: 'get'})
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return;
          }
        })
        .then(jsons => {
          if (jsons) {
            setTargetInfo(jsons);
          } else {
            setTargetInfo([]);
          }
        })
        .catch((reason) => console.log(reason));
    }
  }, [showTargetInfo, selectedScoiId]);

  useEffect(() => {
    if ((showCalloutInfo || showTrackInfo) && selectedScoi) {
      // callApi('get', '/api/scoi/tgt?name=' + selectedScoi.name)
      fetch('/api/scoi/ixn?name=' + selectedScoi.name, {method: 'get'})
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return;
          }
        })
        .then(jsons => {
          if (jsons) {
            setIxnInfo(jsons);
          } else {
            setIxnInfo([]);
          }
        })
        .catch((reason) => console.log(reason));
    }
  }, [showCalloutInfo, showTrackInfo, selectedScoiId]);

  const handleSelectScoi = (scoiId: number) => {
    setSelectedScoiId(scoiId);
  };

  const toggleRfiInfo = () => {
    setShowRfiInfo(!showRfiInfo);
  };

  const toggleTgtInfo = () => {
    setShowTargetInfo(!showTargetInfo);
  };

  const toggleCalloutInfo = () => {
    setShowCalloutInfo(!showCalloutInfo);
  };

  const toggleTrackInfo = () => {
    setShowTrackInfo(!showTrackInfo);
  };

  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(exitScoiPage());
  };

  const handleEditScoi = (scoiId: number) => {
    if (selectedScoiId === scoiId) {
      dispatch(editScoi(scoiId));
    }
  };

  const handlePostScoi = (newScoi: ScoiModel) => {
    dispatch(postScoiUpdate(newScoi, cookie.userName));
    let oldScoi = scois.find((scoi) => scoi.id === newScoi.id);
    if (oldScoi && oldScoi.note !== newScoi.note) {
      displaySnackbar(`${newScoi.name} Note Saved`);
    }
  };

  const mapRfiAssociations = () => {
    return (
      rfiInfo.map((rfiAssociation: RfiAssociationModel, index: number) =>
                    <StyledRfiAssociationBullet key={`rfi-${index}`} rfiAssociation={rfiAssociation}/>,
      )
    );
  };

  const mapTargetAssociations = () => {
    return (
      targetInfo.map((targetAssociation: TgtAssociationModel, index: number) =>
                       <StyledTgtAssociationBullet key={`tgt-${index}`} tgtAssociation={targetAssociation}/>,
      )
    );
  };

  const mapCalloutAssociations = () => {
    return (
      ixnInfo.map((ixnAssociation: IxnAssociationModel, index: number) =>
                    <StyledCalloutAssociationBullet key={`callout-${index}`} ixnAssociation={ixnAssociation}/>,
      )
    );
  };

  const mapTrackAssociations = () => {
    return (
      ixnInfo.map((ixnAssociation: IxnAssociationModel, index: number) =>
                    <StyledTrackAssociationBullet key={`track-${index}`} ixnAssociation={ixnAssociation}/>,
      )
    );
  };

  return (
    <div className={props.className}>
      <div className={'scoi-dash--header'}>
        <div className={'back-button'} onClick={handleBackClick}>
          <StyledBackButtonVector/>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'scoi-row-cell scoi-associations'}>
          <div className={'rfi-associations-button'}
               onClick={toggleRfiInfo}
          >
            <RfiInfoButton active={showRfiInfo}/>
          </div>
          <div className={'tgt-associations-button'}
               onClick={toggleTgtInfo}
          >
            <TgtInfoButton active={showTargetInfo}/>
          </div>
          <div className={'callout-associations-button'}
               onClick={toggleCalloutInfo}
          >
            <IxnInfoButton active={showCalloutInfo}/>
          </div>
          <div className={'track-associations-button'}
               onClick={toggleTrackInfo}
          >
            <TrackInfoButton active={showTrackInfo}/>
          </div>
        </div>
      </div>
      <div className={'scoi-dash--body'}>
        <StyledScoiTable
          scois={scois}
          selectedScoiId={selectedScoiId!}
          handleSelectScoi={handleSelectScoi}
          showRfiInfo={showRfiInfo}
          toggleRfiInfo={toggleRfiInfo}
          showTgtInfo={showTargetInfo}
          toggleTgtInfo={toggleTgtInfo}
          showCalloutInfo={showCalloutInfo}
          toggleCalloutInfo={toggleCalloutInfo}
          showTrackInfo={showTrackInfo}
          toggleTrackInfo={toggleTrackInfo}
          editingScoiId={editingScoiId}
          handleEdit={handleEditScoi}
          handlePostScoi={handlePostScoi}
        />
        <div className={'divider-bar'}/>
        <div className={'scoi-info-container'}>
          <div className={'scoi-info'}>
            {showRfiInfo ?
              <div className={'scoi-info-section rfi-associations'}>
                <div className={'scoi-info-section--header rfi-header'}>
                  Associated RFI Descriptions
                </div>
                <div className={'scoi-info-section--body'}>
                  {mapRfiAssociations()}
                </div>
              </div>
              :
              null
            }
            {showTargetInfo ?
              <div className={'scoi-info-section tgt-associations'}>
                <div className={'scoi-info-section--header'}>
                  Associated Targets
                </div>
                <div className={'scoi-info-section--body'}>
                  {mapTargetAssociations()}
                </div>
              </div>
              :
              null
            }
            {showCalloutInfo ?
              <div className={'scoi-info-section callout-associations'}>
                <div className={'scoi-info-section--header'}>
                  Referenced Callouts
                </div>
                <div className={'scoi-info-section--body'}>
                  {mapCalloutAssociations()}
                </div>
              </div>
              :
              null
            }
            {showTrackInfo ?
              <div className={'scoi-info-section track-associations'}>
                <div className={'scoi-info-section--header'}>
                  Cited Track Narratives
                </div>
                <div className={'scoi-info-section--body'}>
                  {mapTrackAssociations()}
                </div>
              </div>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export const StyledScoiDashboard = styled(ScoiDashboard)`
  height: 100vh;
  width: 100%;
  word-break: break-word;
  
  .back-button {
    cursor: pointer;
  }
  
  .scoi-dash--body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 129px);
  }
  
  .scoi-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundInformation};
    margin-bottom: 17px;
    padding: 0 34px 0 18px;
  }
  
  .divider-bar {
    background: ${theme.color.backgroundInformation};
    box-shadow: 2px 2px 4px #000000;
    border-radius: 8px;
    width: 8px;
    height: 100%;
    margin: 0 55px 0 23px;
    flex-shrink: 0;
  }
  
  .scoi-info-container {
    width: 962px;
    height: calc(100vh - 159px);
    margin-top: 30px;
    border-radius: 8px;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${theme.color.backgroundInformation};
    padding: 15px 10px 15px 17px;
  }
  
  .scoi-info {
    height: 100%;
    width: 100%;
    padding-right: 28px;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
  }
  
  .scoi-info-section {
    margin-bottom: 14px;
  }
  
  .scoi-info-section--header {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: ${theme.color.toggleActive};
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 8px;
  }
  
  .rfi-header {
    margin-bottom: 0 !important;
  }
  
  .scoi-info-section--body {
    padding-left: 21px;
    display: flex;
    flex-direction: column;
  }
  
  .scoi-associations {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 192px;
    height: 30px;
    
    svg {
      cursor: pointer;
      border-radius: 15px;
      box-shadow: 0 2px 4px #000000;
    
      :hover {
        box-shadow: 0 0 6px #FFFFFF;
      }
    }
  }
  
`;
