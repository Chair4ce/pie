import { Box } from '@material-ui/core';
import theme from '../../../resources/theme';
import TgtTriangleVector from '../../../resources/icons/TgtTriangleVector';
import * as React from 'react';

export interface StatusButtonProps {
  buttonClass: string;
  onClick?: () => void;
  className?: string;
}


const NotStartedButton: React.FC<StatusButtonProps> = props => {
  return (
    <div className={props.className}>
      <Box
        height={32}
        width={110}
        border={2}
        borderRadius={16}
        borderColor={theme.color.fontPrimary}
        bgcolor={theme.color.backgroundPillButton}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingRight={0.25}
        paddingLeft={2.8}
        fontSize={12}
        className={props.buttonClass}
      >
        Status
        <TgtTriangleVector/>
      </Box>
    </div>
  );
};

export default NotStartedButton;
