import { Theme } from './styled';

const primaryColor = '#682c94';
const secondaryColor = '#4b1c6d';
const backgroundColor = '#E5E5E5';
const cardBackgroundColor = '#FFFFFF';
const textColor = '#FFFFFF';
const darkTextColor = '#11052C';
const lightTextColor = '#FFFFFF';
const borderColor = '#EAEAEA';

export const themes: Record<string, Theme> = {
  light: {
    colors: {
      primaryText: darkTextColor,
      secondaryText: secondaryColor,
      themeText: primaryColor,
      themeColor: primaryColor,
      themeColorDark: secondaryColor,
      themeGradient: `linear-gradient(to right, ${primaryColor}, ${primaryColor})`,
      background: backgroundColor,
      cardBackground: cardBackgroundColor,
      selectTopicBg: cardBackgroundColor,
      appLogo: primaryColor,
      buttonText: textColor,
      outlineButtonText: primaryColor,
      buttonBackground: primaryColor,
      selectedAnswer: `${primaryColor}33`, // 20% opacity of primary color
      infoText: primaryColor,
      infoBackground: `${primaryColor}26`, // 15% opacity of primary color
      border: borderColor,
      answerBg: cardBackgroundColor,
      disabledCard: '#fbf4ecbc',
      disabledButton: '#e7e8e9',
      success: '#12B40E',
      successLight: '#DDFFDC',
      danger: '#FF143E',
      dangerLight: '#FFD7DE',
      dangerDark: '#b2102e',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)',
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
  dark: {
    colors: {
      primaryText: lightTextColor,
      secondaryText: lightTextColor,
      themeText: lightTextColor,
      themeColor: primaryColor,
      themeColorDark: secondaryColor,
      themeGradient: `linear-gradient(to right, ${primaryColor}, ${primaryColor})`,
      background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      cardBackground: '#241a1a',
      selectTopicBg: '#21191C',
      appLogo: lightTextColor,
      buttonText: textColor,
      outlineButtonText: lightTextColor,
      buttonBackground: primaryColor,
      selectedAnswer: `${primaryColor}33`, // 20% opacity of primary color
      infoText: primaryColor,
      infoBackground: `${primaryColor}26`, // 15% opacity of primary color
      border: 'transparent',
      answerBg: '#151113',
      disabledCard: '#00000080',
      disabledButton: '#181214',
      success: '#12B40E',
      successLight: '#151113',
      danger: '#FF143E',
      dangerLight: '#151113',
      dangerDark: '#b2102e',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)',
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
};
