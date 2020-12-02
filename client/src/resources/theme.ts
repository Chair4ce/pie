import { crayonBox } from './crayonBox';
import './fonts/roboto/roboto.css';
import './fonts/helveticaneue/helveticaneue.css';
import './fonts/arvo/arvo.css';
import { createMuiTheme, createStyles, Theme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import { makeStyles } from '@material-ui/core/styles';

const theme = {
  color: {
    fontPrimary: crayonBox.eggWhite,
    fontLoading: crayonBox.lightGray,
    fontInactive: crayonBox.mediumLightGray,
    fontBackgroundInactive: crayonBox.mediumGray,
    fontError: crayonBox.bloodRed,
    fontInputFocus: crayonBox.skyBlue,
    fontUsernameSuffix: crayonBox.lighterGray,
    fontMetricsHeader: crayonBox.brightBlue,
    fontHeader: crayonBox.skyBlueGreen,
    fontSubHeader: crayonBox.lightBlueGray,
    fontErrorAlternate: crayonBox.lessLessBrightRed,
    fontMgrsModal: crayonBox.skyBlueGreener,
    backgroundBase: crayonBox.coolBlack,
    backgroundInformation: crayonBox.steelBlue,
    backgroundInactive: crayonBox.blueGrayLight,
    backgroundFocus: crayonBox.mediumBlueGray,
    backgroundSnackbar: crayonBox.mediumBlue,
    backgroundToolTip: crayonBox.mediumBlue,
    backgroundUsernameSuffix: crayonBox.warmGray,
    backgroundIxnSidebar: crayonBox.darkRedBlue,
    backgroundMetricsCard: crayonBox.darkBlue,
    backgroundPillButton: crayonBox.darkGreenBlue,
    backgroundSnackbarError: crayonBox.darkTomatoRed,
    backgroundScoiTag: crayonBox.aquaGreen,
    backgroundScoiContainer: crayonBox.anotherDarkGreenBlue,
    backgroundDownloadButton: crayonBox.reallyDarkBlue,
    backgroundToggleButton: crayonBox.yetAnotherDarkGreenBlue,
    buttonInactive: crayonBox.mediumBlueGray,
    primaryButton: crayonBox.brightBlue,
    buttonRowDisabled: crayonBox.subtleGray,
    buttonDoesNotMeetEei: crayonBox.tomatoRed,
    borderAddButton: crayonBox.mediumGreenBlue,
    downloadButtonBorder: crayonBox.darkMediumBlueGray,
    regionDividerPrimary: crayonBox.mediumMediumBrightBlue,
    regionDividerSecondary: crayonBox.blueBlueGray,
    inProgress: crayonBox.stoplightYellow,
    complete: crayonBox.stoplightGreen,
    loginIcon: crayonBox.mediumBrightBlue,
    modalInputBorder: crayonBox.subtlerGray,
    dateDividerHighlight: crayonBox.mediumGreenBlue,
    copyTgtBorder: crayonBox.lightCoolBlack,
    dateDividerBox: crayonBox.mediumBrightBrightBlue,
    subduedOutline: crayonBox.anotherGray,
    rejectIcon: crayonBox.subduedTomatoRed,
    rejectArrow: crayonBox.lessBrightRed,
    toggleActive: crayonBox.redlessBlue,
    bullet: crayonBox.mediumGreenBlue,
    starInactive: crayonBox.anotherBluishGray,
    starActive: crayonBox.brightRedlessBlue,
  },

  font: {
    family: 'Roboto,sans-serif',
    weightLight: 300,
    weightNormal: 400,
    weightMedium: 500,
    weightBold: 700,
    weightBolder: 900,
    sizeRowSmall: '12px',
    sizeRowMedium: '14px',
    sizeRow: '16px',
    sizeRegion: '18px',
    sizeMetricsHeader: '20px',
    sizeHeader: '24px',
    sizeHelperText: '28px',
    sizeModalHeader: '30px',
    sizeBigMetric: '40px',
  },
};

const muiPalette = createPalette(
  {
    type: 'dark',
    primary: {
      main: theme.color.primaryButton,
    },
  });

export const muiTheme = createMuiTheme(
  {
    overrides: {
      MuiToolbar: {
        root: {
          background: '#000000',
        },
      },
    },
    palette: muiPalette,
    typography: {
      fontFamily: theme.font.family,
    },
  });

const rowPalette = createPalette(
  {
    primary: {
      main: theme.color.fontInputFocus,
    },
    secondary: {
      main: '#FFFFFF',
    },
  });

export const rowTheme = createMuiTheme(
  {
    palette: rowPalette,
    overrides: {
      MuiInput: {
        input: {
          letterSpacing: 'normal',
          '&::placeholder': {
            color: theme.color.fontBackgroundInactive,
          },
          color: theme.color.fontPrimary,
        },
        underline: {
          '&:before': {
            borderBottom: '1px solid white',
          },
        },
      },
    },
  });

export const rowStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    margin: {
      margin: localTheme.spacing(1),
    },
    inputLabel: {
      color: theme.color.fontBackgroundInactive,
    },
    clickable: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',
      marginLeft: '12px',
      '&:hover': {
        boxShadow: '0px 0px 6px #FFFFFF',
      },
      textAlign: 'center',
    },
    tgtClickable: {
      marginLeft: '19px',
    },
    inProgress: {
      marginTop: '2px',
    },
    completed: {
      marginTop: '46px',
    },
    doesNotMeetEei: {
      marginTop: '90px',
    },
    statusUnclickable: {
      alignSelf: 'center',
      boxShadow: '0px 2px 4px #000000',
      fontWeight: 'bold',
      userSelect: 'none',
      textAlign: 'center',
    },
    snackbarButton: {
      fontSize: theme.font.sizeRowMedium,
      background: theme.color.backgroundSnackbar,
    },
  }),
);

export const longInputStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    modal: {
      marginLeft: -471,
      marginTop: -301,
      width: 942,
      height: 602,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
      lineHeight: '21px',
    },
    modalText: {
      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: '280px',
    },
    deleteModal: {
      marginLeft: -271,
      marginTop: -94,
      width: 542,
      height: 188,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weightBold,
      fontSize: theme.font.sizeHeader,
    },
    deleteProductModal: {
      marginLeft: -158,
      marginTop: -114,
      width: 316,
      height: 228,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weightBold,
      fontSize: theme.font.sizeHeader,
    },
    modalIcon: {
      paddingLeft: '6px',
    },
    uploadModal: {
      marginLeft: -231,
      marginTop: -156,
      width: 462,
      height: 312,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weightBold,
      fontSize: theme.font.sizeHeader,
    },
    rejectModal: {
      marginLeft: -332,
      marginTop: -204,
      width: 662,
      height: 408,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
    },
    //@ts-ignore
    modalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.fontPrimary,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundInformation,
      borderRadius: 8,
      borderColor: theme.color.backgroundFocus,
      borderWidth: 2,
      borderStyle: 'solid',
      paddingTop: '12px',
    },
    deleteModalBody: {
      borderWidth: '4px !important',
    },
    //@ts-ignore
    narrativeModalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.fontPrimary,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundFocus,
      borderRadius: 8,
    },
    rollupModalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.color.fontPrimary,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundFocus,
      borderRadius: 8,
      padding: '0 2px',
    },
    modalConfirmation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.color.backgroundFocus,
      width: '100%',
      height: '52px',
      flexShrink: 0,
      justifySelf: 'flex-end',
      padding: '0 115px',
      boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.5)',
      borderBottomRightRadius: '6px',
      borderBottomLeftRadius: '6px',
      zIndex: 2,
    },
    productDeleteConfirmation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '180px',
      height: '52px',
      flexShrink: 0,
      justifySelf: 'flex-end',
    },
    modalUploadButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '3px',
      backgroundColor: theme.color.backgroundFocus,
      width: '456px',
      height: '38px',
      flexShrink: 0,
      justifySelf: 'flex-end',
      borderBottomRightRadius: '5px',
      borderBottomLeftRadius: '5px',
      zIndex: 2,
    },
    modalButton: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    uploadModalButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '86px',
      height: '26px',
      borderRadius: '13px',
      backgroundColor: theme.color.primaryButton,
      cursor: 'pointer',
      fontSize: theme.font.sizeRow,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    uploadModalText: {
      fontSize: theme.font.sizeHeader,
      color: theme.color.fontHeader,
      fontWeight: theme.font.weightBold,
      marginTop: '-25px',
    },
    uploadDropArea: {
      width: '140px',
      height: '177px',
      border: '2px dotted' + theme.color.fontHeader,
    },
    modalTextfield: {
      backgroundColor: theme.color.backgroundInformation,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      padding: '0 4px !important',
      width: '100%',
    },
    rejectTextfield: {
      backgroundColor: theme.color.backgroundInformation,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      padding: '0 4px',
      width: '658px',
    },
    modalTextfieldReadonlyContainer: {
      overflowWrap: 'break-word',
      overflowY: 'auto',
    },
    modalTextfieldReadonly: {
      width: 900,
      height: 525,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
    },
    rejectHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 917,
      height: 534,
      overflow: 'auto',
      padding: '6px 2px',
      background: theme.color.backgroundInformation,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      backgroundColor: theme.color.backgroundFocus,
      padding: '8px',
      justifySelf: 'flex-end',
    },
    copyToClipboard: {
      width: 208,
      height: 38,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.font.sizeRow,
      borderRadius: 4,
      cursor: 'pointer',
      border: '1px solid' + theme.color.primaryButton,
      marginRight: '17px',
      '&:hover': {
        boxShadow: '0 0 6px #FFF',
      },
    },
    spacer: {
      width: 128,
    },
    uploadSpacer: {
      width: 124,
      marginLeft: 4,
    },
    saveSubmitButton: {
      width: 208,
      height: 38,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.font.sizeRow,
      borderRadius: 4,
      cursor: 'pointer',
      background: theme.color.primaryButton,
      '&:hover': {
        boxShadow: '0 0 6px #FFF',
      },
    },
  },
));

export default theme;
