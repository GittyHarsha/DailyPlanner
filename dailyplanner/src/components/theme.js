
import { createTheme, ThemeProvider } from '@mui/material/styles';
export const theme = createTheme({
    components: {
      // Name of the component
      MuiTableContainer: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
            transform: "scale(0.65)",
            marginLeft: '0',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
            root: {
                align: 'center',
                padding: '2px'
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
            transform: "auto"
          }
      },

    },
  }
  });