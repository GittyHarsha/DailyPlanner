
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import {shadows} from '@mui/system';

const bgcolor=alpha('#ffffff', 0.4);

export const theme = createTheme({
    palette: {
      primary: {
        main: bgcolor,
      }
    },
    components: {
      // Name of the component\
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: bgcolor,
            borderRadius: 25,
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
          }
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
            transform: "scale(0.75)",
            marginLeft: '0',
            backgroundColor: bgcolor,
            padding: 15,
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: 25,
            
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
            root: {
                align: 'center',
                padding: '2px',
                backgroundColor: 'transparent',
            }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '0.5rem',
            margin: '0',
            transform: "auto",
            backgroundColor: 'transparent',
          }
      },
    },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            backgroundColor: 'white',
             borderRadius: '10%', 
             color: 'black',
              boxShadow: '1',
              backgroundColor: 'white',
              borderRadius: 25,
          }
      }
      },
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
             my: 2,
             borderRadius: 25,
          }
      }
      },
      MuiBox: {
        styleOverrides: {
          root: {
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: 25,
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
          }
        }
      }
    
  }
  });