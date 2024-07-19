import { Theme } from './styled';

const mainColor = '#800080'; // Replace this with the actual color from your logo text
const mainColorDark = '#660066'; // A darker shade for hover effect

export const themes: Record<string, Theme> = {
  light: {
    colors: {
      primaryText: '#11052C',
      secondaryText: '#2D264B',
      themeText: '#000000',
      themeColor: mainColor,
      themeColorDark: mainColorDark, // Add this
      themeGradient: `linear-gradient(to right, ${mainColor}, #FFC0CB)`,
      background: '#E5E5E5',
      cardBackground: '#FFFFFF',
      selectTopicBg: '#FFFFFF',
      appLogo: '#000000',
      buttonText: '#FFFFFF',
      outlineButtonText: mainColor,
      buttonBackground: `linear-gradient(90.04deg, ${mainColor} 0.03%, #FFC0CB 99.96%)`,
      selectedAnswer: '#FFD6FF',
      infoText: '#FF783F',
      infoBackground: '#ffb23f26',
      border: '#EAEAEA',
      answerBg: '#ffffff',
      disabledCard: '#fbf4ecbc',
      disabledButton: '#e7e8e9',
      success: '#12B40E',
      successLight: '#DDFFDC',
      danger: '#FF143E',
      dangerLight: '#FFD7DE',
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
      primaryText: '#FFFFFF',
      secondaryText: '#FFFFFF',
      themeText: '#FFFFFF',
      themeColor: mainColor,
      themeColorDark: mainColorDark, // Add this
      themeGradient: `linear-gradient(90deg, #0e050e 0%, #281e20 100%)`,
      background: `linear-gradient(90deg, #0e050e 0%, #281e20 100%)`,
      cardBackground: '#241a1a',
      selectTopicBg: '#21191C',
      appLogo: '#FFFFFF',
      buttonText: '#000000',
      outlineButtonText: '#ffffff',
      buttonBackground: `linear-gradient(90.04deg, ${mainColor} 0.03%, #FFC0CB 99.96%)`,
      selectedAnswer: '#151113',
      infoText: '#FF783F',
      infoBackground: '#ffb23f26',
      border: 'transparent',
      answerBg: '#151113',
      disabledCard: '#00000080',
      disabledButton: '#181214',
      success: '#12B40E',
      successLight: '#151113',
      danger: '#FF143E',
      dangerLight: '#151113',
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
