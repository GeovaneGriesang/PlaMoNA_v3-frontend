import { tokens } from "@/app/theme";
import { Box, Typography } from "@mui/material";


export default function Footer() {
    return(
        <>
            <Box py='2em' px={{sm: '5em', xs: '2em'}} width='100vw' mt='5em' classname='shadow-lg' sx={{
                    background: tokens.blueAccent[200], color: "#000000"
                }}>
                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                    <Box sx={{
                                objectFit: 'contain',
                                width: {sm: '20em', xs: '10em' },
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                        }}>
                        <img src='/logo_horizontal.png' alt='PlaMoNa'/>
                    </Box>
                    <Box sx={{
                                objectFit: 'contain',
                                width: {sm: '20em', xs: '10em' },
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                        }}>
                        <img src='/ifsul_colorido.png' alt='IFSUL'/>
                    </Box>
                </Box>
                <Typography variant="body2" textAlign='center'>
                        2023 &copy; IFSul - Venâncio Aires
                </Typography>
            </Box>
        </>
    )
}