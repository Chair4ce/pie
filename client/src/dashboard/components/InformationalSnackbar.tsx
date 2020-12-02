import { IconButton } from '@material-ui/core';
import SnackbarDismissIcon from '../../resources/icons/SnackbarDismissIcon';
import * as React from 'react';
import classNames from 'classnames';

export const DismissSnackbarAction = (key: any, closeSnackbar: (key: any) => void, className: string) => {
  return (
    <>
      <IconButton
        onClick={() => closeSnackbar(key)}
        color={'primary'}
        className={classNames(className, 'dismiss-snackbar')}
      >
        <SnackbarDismissIcon/>
      </IconButton>
    </>
  );
};
