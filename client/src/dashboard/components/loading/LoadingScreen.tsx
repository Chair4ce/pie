import * as React from 'react';
import styled from 'styled-components';
import { PacmanLoader } from 'react-spinners';
import classNames from 'classnames';
import theme from '../../../resources/theme';

interface Props {
  className?: string;
}

export const LoadingScreen: React.FC<Props> = props => {
  return (
    <div className={classNames('loading-container', props.className)}>
      <div className={'loading--spinner'}>
        <PacmanLoader
          size={38}
          color={theme.color.fontLoading}
        />
      </div>
      <div className={'loading--message'}>
        LOADING
      </div>
    </div>
  );
};

export const StyledLoadingScreen = styled(LoadingScreen)`
  color: ${theme.color.fontLoading};
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .loading--spinner {
    height: 75px;
    width: 200px;
  }
  
  .loading--message {
    font-family: Arvo, serif !important;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
  }
`;
