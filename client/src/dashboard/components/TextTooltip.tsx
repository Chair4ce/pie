import { Theme, Tooltip, withStyles } from '@material-ui/core';
import theme from '../../resources/theme';

// @ts-ignore
const TextTooltip = withStyles((localTheme: Theme) => ({
  tooltip: {
    backgroundColor: theme.color.backgroundToolTip,
    color: theme.color.fontPrimary,
    width: 'inherit',
    height: 'inherit',
    minHeight: 22,
    borderRadius: 11,
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(Tooltip);

// @ts-ignore
export const PocTooltip = withStyles((localTheme: Theme) => ({
  tooltip: {
    backgroundColor: theme.color.backgroundToolTip,
    color: theme.color.fontPrimary,
    maxWidth: '600px',
    height: 'inherit',
    minHeight: 22,
    borderRadius: 11,
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(Tooltip);

// @ts-ignore
export const MgrsTooltip = withStyles((localTheme: Theme) => ({
  tooltip: {
    backgroundColor: theme.color.backgroundToolTip,
    color: theme.color.fontPrimary,
    width: 'inherit',
    height: 26,
    borderRadius: 13,
    fontSize: '18px',
    lineHeight: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(Tooltip);

// @ts-ignore
export const EeiTooltip = withStyles((localTheme: Theme) => ({
  tooltip: {
    backgroundColor: theme.color.backgroundFocus,
    color: theme.color.fontPrimary,
    width: 'inherit',
    height: 'fit-content',
    borderRadius: 11,
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'center',
  },
}))(Tooltip);

export default TextTooltip;
