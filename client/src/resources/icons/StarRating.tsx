import styled from 'styled-components';
import React from 'react';
import classNames from 'classnames';

const pathD = 'M41.5883 2.5228L49.9221 28.3937C50.4546 30.0466 51.9928 31.1672 53.7295 31.1672H80.7347L58.8574 47.19' +
  '95C57.4676 48.218 56.8862 50.0122 57.4145 51.6524L65.7639 77.5714L43.9527 61.5875C42.5452 60.556 40.6314 60.556 3' +
  '9.2239 61.5875L17.4127 77.5714L25.762 51.6523C26.2904 50.0122 25.709 48.218 24.3191 47.1995L2.44182 31.1672H29.44' +
  '71C31.1837 31.1672 32.722 30.0466 33.2544 28.3937L41.5883 2.5228Z';

interface MyProps {
  glow: boolean;
  selected: boolean;
  setGlow: () => void;
  setSelected: () => void;
  lastSelected: boolean;
  className?: string;
}

const StarRating: React.FC<MyProps> = (props) => {
  return (
    <div className={classNames(props.className, props.glow ? 'glow' : null, 'star')}
         onClick={props.setSelected}
         onMouseOver={props.setGlow}
    >
      <svg
        width={'83'}
        height={'80'}
        viewBox={'-4 -4 91 96'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
        filter={props.glow ? 'drop-shadow(0 0px 50px rgba(255, 255, 255, 0.25))' : ''}
      >
        <path
          d={pathD}
          fill={props.selected ? '#00C2FF' : 'none'}
          stroke={props.selected || props.lastSelected ? '#00C2FF' : props.glow ? '#B5DFF9' : '#617886'}
          strokeWidth={4}
        />
      </svg>
    </div>
  );
};

export const StyledStarRating = styled(StarRating)`
  width: 105px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  cursor: pointer;
`;
