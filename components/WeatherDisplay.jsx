import React, { useEffect, useState } from 'react';
import { Avatar, Box, Divider, Paper, ThemeProvider, Typography } from '@mui/material';
import { tokens, theme } from '@/app/theme';
import { WaterDrop, Thunderstorm, Air } from '@mui/icons-material'
import getClima from '@/api/climaapi';
import ReactAnimatedWeather from 'react-animated-weather';
import weatherData from '@/api/climaicons.json'


function findIconByCode(code) {
    const weatherEntry = weatherData.find(entry => entry.code === code);
    return weatherEntry ? weatherEntry.icon : null;
}

export default function WeatherDisplay() {
    const [data, setData] = useState({});
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
      // Função para formatar a data
    const formatCurrentDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Converte o timestamp para milissegundos
        const options = { weekday: 'long', day: 'numeric', month: 'long'};
        const formattedDate = date.toLocaleDateString('pt-BR', options);
        return `${formattedDate}`;
    };

      // Simulando a obtenção da data (use o valor real do timestamp da sua API aqui)
    const timestamp = 1695764565;

      // Formata a data e define no estado
    setCurrentDate(formatCurrentDate(timestamp));
    }, []);

    useEffect(() => {
        async function fetchData() {
            const result = await getClima();
            console.log(result)
            setData(result);
        }

        fetchData();
    }, []);
    return(
        <ThemeProvider theme={theme}>
            <Paper sx={{
                        width: {sm: '30em', xs: '20em'},
                        height: {sm: '26em', sx: '32em'},
                        padding: '1em',
                        margin: '1em',
                        backgroundColor: tokens.primary[600],
                        borderRadius: '2em',
                        }}>
                {data && data.condition && (
                    <Box>
                        <Box sx={{
                            borderRadius: '1em',
                            background: 'linear-gradient( 105deg, #3333ff44, #ffffff44)',
                            height: {sm: '24em', sx: '30em'},
                            padding: '1em',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: '2em',
                                padding: '2em',
                                flexDirection: {sm:'row', xs:'column'}
                            }}>
                                <Box height={'auto'} alignContent={'center'} m={'auto 0'} width={'10em'}>
                                <ReactAnimatedWeather
                                    icon={findIconByCode(data.condition.code)}
                                    color={tokens.blueAccent[300]}
                                    size={64}
                                    animate={true}
                                />
                                </Box>
                                <Box>
                                    <Typography variant='body1' color={tokens.grey[300]}>{currentDate}</Typography>
                                    <Typography variant='h4' color={tokens.grey[100]}>{data.condition.text}</Typography>
                                    <Typography variant='body1' color={tokens.grey[300]}>Venâncio Aires</Typography>
                                </Box>
                                <Typography variant='h3' color={tokens.grey[100]}>{Math.floor(data.temp_c) + "°C"}</Typography>
                            </Box>
                            <Box>
                                <Divider sx={{
                                    borderColor: tokens.grey[300],
                                    borderBottomWidth: '1px',
                                }}/>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-around'} p={'2em'} gap={'2em'}>
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Avatar sx={{
                                        backgroundColor: tokens.grey[600],
                                        width: '3em',
                                        height: '3em',
                                    }}>
                                        <WaterDrop sx={{fontSize:'2em'}}/>
                                    </Avatar>
                                    <Typography variant='body1' color={tokens.grey[100]} textAlign={'center'}>
                                        Umidade
                                    </Typography>
                                    <Typography variant='body2' color={tokens.grey[200]} textAlign={'center'}>
                                        {data.humidity+ "%"}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Avatar sx={{
                                        backgroundColor: tokens.grey[600],
                                        width: '3em',
                                        height: '3em',
                                    }}>
                                        <Thunderstorm sx={{fontSize:'2em'}}/>
                                    </Avatar>
                                    <Typography variant='body1' color={tokens.grey[100]} textAlign={'center'}>
                                        Chuva
                                    </Typography>
                                    <Typography variant='body2' color={tokens.grey[200]} textAlign={'center'}>
                                        {data.precip_mm} mm
                                    </Typography>
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Avatar sx={{
                                        backgroundColor: tokens.grey[600],
                                        width: '3em',
                                        height: '3em',
                                    }}>
                                        <Air sx={{fontSize:'2em'}}/>
                                    </Avatar>
                                    <Typography variant='body1' color={tokens.grey[100]} textAlign={'center'}>
                                        Vento
                                    </Typography>
                                    <Typography variant='body2' color={tokens.grey[200]} textAlign={'center'}>
                                        {data.wind_dir + " - "+ data.wind_kph +"km/h"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Paper>
        </ThemeProvider>
    );
}