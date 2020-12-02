import IxnModel from '../../store/ixn/IxnModel';
import { Button, IconButton } from '@material-ui/core';
import SnackbarDismissIcon from '../../resources/icons/SnackbarDismissIcon';
import * as React from 'react';
import { SegmentModel } from '../../store/ixn/SegmentModel';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../store/tgt/ExploitDatePostModel';
import RfiModel from '../../store/rfi/RfiModel';
import classNames from 'classnames';

type UndoTypes = IxnModel|SegmentModel|TargetPostModel|TargetPostModel[]|ExploitDatePostModel|FormData|number;

export const UndoSnackbarAction = (key: any, data: UndoTypes, postData: (data: any) => void,
                                   closeSnackbar: (key: any) => void, className: string) => {
  return (
    <>
      <Button
        variant={'text'}
        color={'primary'}
        onClick={() => {
          postData(data);
          closeSnackbar(key);
        }}
        className={classNames(className, 'undo-button')}
      >
        UNDO
      </Button>
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

export const PriorityUndoSnackbarAction = (key: any, data: RfiModel[],
                                           postPriority: (rfis: RfiModel[], pathVars: string) => void,
                                           closeSnackbar: (key: any) => void, className: string,
                                           rfiNum: string) => {
  return (
    <>
      <Button
        variant={'text'}
        color={'primary'}
        onClick={() => {
          postPriority(data, rfiNum);
          closeSnackbar(key);
        }}
        className={classNames(className, 'undo-button')}
      >
        UNDO
      </Button>
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
