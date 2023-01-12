import { createTheme, ThemeOptions } from "@mui/material";

// declare module ThemeOptions {
//   interface ThemeOptions {
//     palette: {
//       accent: PaletteColorOptions;
//     };
//   }
// }

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: "#004369",
    },
    secondary: {
      main: "#DB1F48",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

export default createTheme(theme);
