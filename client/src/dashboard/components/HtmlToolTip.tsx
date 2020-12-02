import { Theme, Tooltip, withStyles } from '@material-ui/core';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    marginTop: '-15px',
  },
}))(Tooltip);

export default HtmlTooltip;
