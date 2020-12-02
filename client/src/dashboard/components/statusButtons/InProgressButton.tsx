import * as React from 'react';
import { Box } from '@material-ui/core';
import theme from '../../../resources/theme';
import InProgressIcon from '../../../resources/icons/InProgressIcon';
import { StatusButtonProps } from './NotStartedButton';

const InProgressButton: React.FC<StatusButtonProps> = props => {
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
        paddingLeft={1.25}
        className={props.buttonClass}
        zIndex={1000}
        color={theme.color.fontPrimary}
        fontSize={12}
        fontWeight={'bold'}
        onClick={props.onClick}
      >
        In Progress
        <InProgressIcon/>
      </Box>
    </div>
  );
};

export default InProgressButton;
