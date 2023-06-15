import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    
    interface Palette {
      tertiary: Palette["primary"];
    }
    interface PaletteOptions {
      tertiary?: PaletteOptions["primary"];
    }
    interface PaletteColor {
      lightRed?: string;
      yellow?: string;
      lightGray?: string;
      lightBrown?:string;
      teaPink?: string;
      green?:string
    }
    interface SimplePaletteColorOptions {
      lightRed?: string;
      yellow?: string;
      lightGray?: string;
      lightBrown?:string;
      teaPink?: string;
      green?:string

    }
}

export const theme = createTheme({
  typography: {
    fontFamily: "Josefin Sans, sans-serif",
  
    h1: {
      fontWeight: 700,
      lineHeight: "146.4%",
      fontSize: "36px",
      color: "#37474F",
    },
    h2: {
      fontWeight: 600,
      lineHeight: "39px",
      fontSize: "32px",
      color: "#445862",
    },
    h3: {
      fontWeight: 700,
      lineHeight: "34px",
      fontSize: "28px",
      color: "#445862",
    },
    h4: {
      fontWeight: 600,
      lineHeight: "29px",
      fontSize: "24px",
      color: "#445862",
     
    },

    h5: {
      lineHeight: "24px",
      fontSize: "20px",
      fontWeight: 500,
      
    },

    h6: {
      lineHeight: "20px",
      fontSize: "16px",
      fontWeight: 600,
    
    },

    body1: {
      lineHeight: "20px",
      fontSize: "16px",
      fontWeight: 500,
   
    },
    body2: {
      fontWeight: 400,
      lineHeight: "15px",
      fontSize: "12px",
    
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: "10px",
      fontSize: "8px",
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: "13px",
      fontSize: "11px",
     
    },
  },
});
