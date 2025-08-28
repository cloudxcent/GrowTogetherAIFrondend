/// <reference types="vite/client" />

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary: string;
      secondary: string;
    };
  }
}