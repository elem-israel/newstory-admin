import red from "@material-ui/core/colors/red";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
