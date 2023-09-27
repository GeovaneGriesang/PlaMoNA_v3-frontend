import { tokens } from "@/app/theme";
import { Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: tokens.grey[900],
    },
  },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

export default function Navbar({buttons, logo}) {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Box className="flex py-3 shadow-lg lg:px-40 md:px-10" sx={{
        backgroundColor: tokens.blueAccent[300], 
        flexDirection: {sm: 'row', xs: 'column'},
        justifyContent: 'space-between',
        alignItems: 'center'
        }}>
        <Box sx={{
          color: tokens.grey[900],
        }}className="align-center justify-center p-3 lg:text-3xl md:text-lg">
          {logo}
        </Box>
        <Box sx={{alignItems: 'center', display: 'flex', gap: '.5em'}} className="align-center lg:justify-center,space-x-4,p-3 md:justify-end,space-x-2 p-2">
          {buttons.map((b, index) => (
            <Button variant="outlined" size={'small'} color='primary' key={index} href={b.href}>
              {b.text}
            </Button>
          ))}
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
}