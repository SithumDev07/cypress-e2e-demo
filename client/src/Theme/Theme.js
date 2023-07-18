// import { green, indigo } from "@mui/material/colors";
import { createTheme, } from "@mui/material/styles";

const theme = createTheme({
    components: {},
    palette: {
        green: {
            main: "#008272",
            contrastText : "white",
            // light: "#000000",
        },
        greend: {
            main: "#00564B",
        },
        greenl: {
            main: "#00a893",
        },
        dark: {
            main: "#101010",
        },
        white: {
            main: "#fff",
        },
        offwhite: {
            main: "#f0f0f0",
        },
        red: {
            main: "#E5052E",
        },
        yellow: {
            main: "#E5CF05",
        },
        gray: {
            main: "#707070",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
    spacing:2,

});

export default theme;
