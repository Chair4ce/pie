import * as React from 'react';
import theme from '../theme';
import classNames from 'classnames';
import TextTooltip from '../../dashboard/components/TextTooltip';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface MyProps {
  message?: string
  className?: string
}

const pathD1 = 'M20.3207 16.1649C20.6758 15.8653 20.6758 15.3182 20.3207 15.0185L2.73368 0.178241C2.24604 -0.233233 1' +
  '.5 0.113399 1.5 0.751441V10.1372C1.5 10.4134 1.72386 10.6372 2 10.6372H4.5C4.77614 10.6372 5 10.4134 5 10.1372V7.3' +
  '5075C5 7.26596 5.09889 7.21965 5.16402 7.27392L8 9.63724L14.7786 15.4474C14.895 15.5472 14.895 15.7273 14.7786 15.' +
  '8271L8 21.6372L5.16402 24.0006C5.09889 24.0548 5 24.0085 5 23.9237V21.1372C5 20.8611 4.77614 20.6372 4.5 20.6372H2' +
  'C1.72386 20.6372 1.5 20.8611 1.5 21.1372V30.432C1.5 31.07 2.24604 31.4167 2.73368 31.0052L20.3207 16.1649Z';

const pathD2 = 'M1.5 17.1372H4V18.0563C4 18.0935 4.03912 18.1177 4.07236 18.1011L6 17.1372H9.83333C9.94152 17.1372 10' +
  '.0468 17.1022 10.1333 17.0372L11.9467 15.6772C11.9733 15.6572 11.9733 15.6172 11.9467 15.5972L10.1333 14.2372C10.0' +
  '468 14.1723 9.94152 14.1372 9.83333 14.1372H6L4.07236 13.1734C4.03912 13.1568 4 13.181 4 13.2181V14.1372H1.5L0.064' +
  '1151 13.7147C0.0320896 13.7053 0 13.7293 0 13.7627V17.6239C0 17.6587 0.0347792 17.6829 0.0674492 17.6707L1.5 17.13' +
  '72Z';

export const RejectArrow: React.FC<MyProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
                                 createStyles({
                                                customWidth: {
                                                  maxWidth: 125,
                                                },
                                              }
                                 ));
  const classes = useStyles();

  return (
    <div className={classNames('reject-arrow', props.className)}>
      <TextTooltip disableHoverListener={!props.message} title={props.message} classes={{tooltip: classes.customWidth}}>
        <svg
          width="21"
          height="32"
          viewBox="0 0 21 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={pathD1} fill={theme.color.rejectArrow}/>
          <path d={pathD2} fill={theme.color.rejectArrow}/>
        </svg>
      </TextTooltip>
    </div>
  );
};
