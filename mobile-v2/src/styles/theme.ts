import { MD3LightTheme } from "react-native-paper";

import { mantineColors } from "../utils/colors";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal"
    }
  },
  ios: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal"
    }
  },
  android: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal"
    }
  }
};

const lightBlueColors = {
  colors: {
    primary: mantineColors.blue[5],
    // primary: '#339AF0',
    onPrimary: "rgb(255, 255, 255)",
    // onPrimary: '#E7F5FF',
    primaryContainer: "rgb(224, 224, 255)",
    // primaryContainer: '#D0EBFF',
    onPrimaryContainer: mantineColors.blue[9],
    // onPrimaryContainer: '#1C7ED6',
    secondary: "rgb(92, 93, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(225, 224, 249)",
    onSecondaryContainer: "rgb(25, 26, 44)",
    tertiary: "rgb(120, 83, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 216, 238)",
    onTertiaryContainer: "rgb(46, 17, 38)",
    error: mantineColors.red[8],
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    imageContainer: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(190, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(245, 242, 255)",
      level2: "rgb(239, 236, 255)",
      level3: "rgb(233, 230, 255)",
      level4: "rgb(231, 228, 255)",
      level5: "rgb(227, 224, 255)"
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)"
  }
};

const theme = {
  ...lightBlueColors
};

export default theme;
