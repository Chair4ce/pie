import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../resources/theme';
import { StyledStarRating } from '../../resources/icons/StarRating';
import { useParams } from 'react-router';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RfiFeedbackModel, { MissionImpact, Quality, Timeliness } from '../../store/rfi/RfiFeedbackModel';
import { postRfiFeedback } from '../../store/rfi';

interface MyProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const FeedbackDashboard: React.FC<MyProps> = (props) => {
  const [stars, setStars] = useState(-1);
  const [selected, setSelected] = useState(-1);
  const [lastSelected, setLastSelected] = useState(-1);
  const [glow, setGlow] = useState(-1);
  const [description, setDescription] = useState('');
  const [timeliness, setTimeliness] = useState(Timeliness.DEFAULT);
  const [quality, setQuality] = useState(Quality.DEFAULT);
  const [missionImpact, setMissionImpact] = useState(MissionImpact.DEFAULT);
  const [comments, setComments] = useState('');
  const [allSubmitted, setAllSubmitted] = useState(false);

  let starFeedbackSubmitted: boolean = stars > 0;
  let someSpecificFeedbackSubmitted: boolean = timeliness !== Timeliness.DEFAULT || quality !== Quality.DEFAULT ||
    missionImpact !== MissionImpact.DEFAULT;
  let allSpecificFeedbackSubmitted: boolean = timeliness !== Timeliness.DEFAULT && quality !== Quality.DEFAULT &&
    missionImpact !== MissionImpact.DEFAULT;

  const {rfiNum} = useParams();
  const [disabled, setDisabled] = useState(!rfiNum);

  const classes = useStyles();

  useEffect(() => {
    if (rfiNum) {
      fetch(`/api/rfi/rfi-description?rfiNum=${rfiNum}`,
            {
              method: 'get',
            })
        .then(response => {
          if (response.ok)
            return response.text()
          else // Disable if response not found
            setDisabled(true)
            return '';
        })
        .then(responseText => setDescription(responseText))
        .catch(reason => console.log(`Fetch failed: ${reason}`));
    }
  }, [rfiNum]);

  useEffect(() => {
    if (allSpecificFeedbackSubmitted) {
      let feedBackForm = document.getElementById('feedback-form');
      if (feedBackForm) {
        feedBackForm.scrollTo({top: feedBackForm.scrollHeight, behavior: 'smooth'});
      }
    }
  }, [allSpecificFeedbackSubmitted]);

  useEffect(() => {
    if (rfiNum && starFeedbackSubmitted) {
      handleSubmit();
    }
  }, [stars, timeliness, quality, missionImpact]);

  const handleSetNoGlow = (glow: number) => {
    setGlow(-1);
    setSelected(glow);
  };

  const handleSetSelect = (select: number) => {
    setSelected(select);
    setLastSelected(select);
    setGlow(-1);

    if (rfiNum) {
      setStars(select);

      setTimeout(() => {
        let feedBackForm = document.getElementById('feedback-form');
        if (feedBackForm) {
          feedBackForm.scrollTo({top: feedBackForm.scrollHeight, behavior: 'smooth'});
        }
      }, 1000);
    }
  };

  const handleSetGlow = (glow: number) => {
    setGlow(glow);
    if (selected > glow) {
      setLastSelected(selected);
      setSelected(glow);
    }
  };

  const handleTimelinessChange = (event: any) => {
    setTimeliness(event.target.value);
  };

  const handleQualityChange = (event: any) => {
    setQuality(event.target.value);
  };

  const handleMissionImpactChange = (event: any) => {
    setMissionImpact(event.target.value);
  };

  const handleCommentsChange = (event: any) => {
    setComments(event.target.value);
  };

  const handleSubmit = () => {
    if (rfiNum) {
      postRfiFeedback(new RfiFeedbackModel(rfiNum, stars, timeliness, quality, missionImpact, comments))
        .catch((reason) => console.log('Failed to post feedback: ' + reason));
    }
  };

  return (
    <div className={classNames(props.className, 'feedback-dashboard')}>
      {allSubmitted ?
        <>
          <div className={classNames('star-container-end', rfiNum ? null : 'disabled')}
               onMouseOut={() => handleSetNoGlow(lastSelected)}>
            {[1, 2, 3, 4, 5].map(index => {
              if (index <= stars) {
                return (
                  <StyledStarRating
                    setGlow={() => {
                    }}
                    setSelected={() => {
                    }}
                    selected={true}
                    lastSelected={true}
                    glow={true}
                    key={`Star-${index}`}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className={'end-message'}>Thank you so much!</div>
        </>
        :
        <>
          {allSpecificFeedbackSubmitted ?
            null
            :
            <>
              <div className={'rfi-title'}>{!disabled ? `RFI: ${rfiNum}` : 'Error: Bad Link'}</div>
              <div className={'feedback-dialogue'}>{starFeedbackSubmitted ? 'Thank You!' : 'How did we do?'}</div>
            </>
          }
          <div className={classNames('feedback-form', allSpecificFeedbackSubmitted ? 'feedback-form-extended' : null)}
               id={'feedback-form'}>
            <div className={classNames('star-container', disabled ? 'disabled' : null)}
                 onMouseOut={() => handleSetNoGlow(lastSelected)}>
              {[1, 2, 3, 4, 5].map(index => {
                return (
                  <StyledStarRating
                    setGlow={() => handleSetGlow(index)}
                    setSelected={() => handleSetSelect(index)}
                    selected={selected >= index}
                    lastSelected={lastSelected >= index}
                    glow={glow >= index}
                    key={`Star-${index}`}
                  />
                );
              })}
            </div>
            {starFeedbackSubmitted ?
              <>
                <div className={'feedback-dialogue feedback-margin'}>
                  {someSpecificFeedbackSubmitted ? allSpecificFeedbackSubmitted ?
                    '\xa0'
                    :
                    'Next, how was the...'
                    :
                    'If you have time, how was the...'
                  }
                </div>
                <div className={'specific-feedback--container'}>
                  <FormControl className={classNames('timeliness-form', classes.formControl)}>
                    <InputLabel id='timeliness-label'>Timeliness</InputLabel>
                    <Select
                      labelId='timeliness-label'
                      id='timeliness-select'
                      value={timeliness}
                      onChange={handleTimelinessChange}
                    >
                      <MenuItem className={'timeliness-menu-item'}
                                value={Timeliness.EARLY}>{Timeliness.EARLY}</MenuItem>
                      <MenuItem className={'timeliness-menu-item'}
                                value={Timeliness.ON_TIME}>{Timeliness.ON_TIME}</MenuItem>
                      <MenuItem className={'timeliness-menu-item'} value={Timeliness.LATE}>{Timeliness.LATE}</MenuItem>
                      <MenuItem className={'timeliness-menu-item'}
                                value={Timeliness.NEVER}>{Timeliness.NEVER}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classNames('quality-form', classes.formControl)}>
                    <InputLabel id='quality-label'>Quality</InputLabel>
                    <Select
                      labelId='quality-label'
                      id='quality-select'
                      value={quality}
                      onChange={handleQualityChange}
                    >
                      <MenuItem className={'quality-menu-item'} value={Quality.HIGH}>{Quality.HIGH}</MenuItem>
                      <MenuItem className={'quality-menu-item'} value={Quality.LOW}>{Quality.LOW}</MenuItem>
                      <MenuItem className={'quality-menu-item'} value={Quality.BAD}>{Quality.BAD}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classNames('impact-form', classes.formControl)}>
                    <InputLabel id='missionImpact-label'>Mission Impact</InputLabel>
                    <Select
                      labelId='missionImpact-label'
                      id='missionImpact-select'
                      value={missionImpact}
                      onChange={handleMissionImpactChange}
                    >
                      <MenuItem className={'impact-menu-item'}
                                value={MissionImpact.HIGH}>{MissionImpact.HIGH}</MenuItem>
                      <MenuItem className={'impact-menu-item'} value={MissionImpact.LOW}>{MissionImpact.LOW}</MenuItem>
                      <MenuItem className={'impact-menu-item'} value={MissionImpact.NO}>{MissionImpact.NO}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <span className={'no-select'}>&nbsp;</span>
              </>
              :
              null
            }
            {allSpecificFeedbackSubmitted ?
              <div className={'comments-container'}>
                <div className={'feedback-dialogue'}>Thank you for the feedback!</div>
                <TextField
                  className={'comments-input'}
                  value={comments}
                  onChange={handleCommentsChange}
                  autoFocus
                  multiline
                  rows={10}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    className: 'comments-input-field',
                  }}
                  placeholder={'Feel free to leave any additional feedback here'}
                />
              </div>
              :
              null
            }
          </div>
          <div className={classNames('rfi-description', allSpecificFeedbackSubmitted ? 'lighter' : null)}>
            <div className={'description-title'}>
              RFI Description
            </div>
            <div className={'description'}>
              {!disabled ? description : 'You have navigated to an invalid link.'}
            </div>
          </div>
          {allSpecificFeedbackSubmitted ?
            <div className={'submit-button no-select'}
                 onClick={() => {
                   handleSubmit();
                   setAllSubmitted(true);
                 }}>
              <span>Submit</span>
            </div>
            :
            null
          }
        </>
      }
    </div>
  );
};

export const StyledFeedbackDashboard = styled(FeedbackDashboard)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.backgroundBase};
  font-family: ${theme.font.family};
  font-size: ${theme.font.sizeHeader};
  
  .feedback-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 95px;
  }
  
  .rfi-title {
    font-weight: ${theme.font.weightBold};
    font-size: ${theme.font.sizeBigMetric};
    color: #617886;
    line-height: 21px;
    margin-bottom: 55px;
  }
  
  .feedback-dialogue {
    color: ${theme.color.fontHeader};
    font-size: ${theme.font.sizeModalHeader};
    font-weight: ${theme.font.weightBold};
    line-height: 35px;
    text-align: center;
  }
  
  .rfi-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-weight: ${theme.font.weightMedium};
    background: ${theme.color.backgroundInformation};
    border-radius: 20px;
    line-height: 19px;
    width: 733px;
    height: 280px;
    padding: 8px 36px 36px;
    box-shadow: 0 -5px 10px #000;
    margin-top: -20px;
    z-index: 999;
  }
  
  .description-title {
    color: ${theme.color.fontHeader};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightBold};
    line-height: 19px;
    text-align: center;
    padding-top: 8px;
    margin-bottom: 23px;
  }
  
  .description {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    word-wrap: normal;
    overflow: auto;
    font-size: ${theme.font.sizeRow};
    padding-right: 8px;
  }
  
  .star-container {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 525px;
  }
  
  .star-container-end {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  
  .feedback-form {
    width: 750px;
    overflow-y: auto;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .feedback-form-extended {
    height: 311px;
  }
  
  .specific-feedback--container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 70px;
  }
  
  .feedback-margin {
    margin-top: 200px;
  }
  
  .comments-container {
    background: ${theme.color.backgroundInformation};
    width: 733px;
    height: 300px;
    flex-shrink: 0;
    border-radius: 24px;
    padding: 23px 36px;
  }
  
  .comments-input {
    width: 100%;
  }
  
  .submit-button {
    box-shadow: 0 2px 4px #000000;
    cursor: pointer;
    background: ${theme.color.primaryButton};
    border-radius: 4px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 21px;
    width: 112px;
    height: 38px;
    margin-top: -15px;
    margin-bottom: -23px;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    };
  }
  
  .end-message {
    margin-top: 50px;
    font-style: normal;
    font-weight: bold;
    font-size: 45px;
    line-height: 53px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #D8F4FF;
  }
  
  .lighter {
    background-color: #374B52;
  }
`;
