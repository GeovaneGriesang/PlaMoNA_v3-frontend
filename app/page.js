'use client'
import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    ThemeProvider,
    Typography
} from '@mui/material';
import { obterMedicao } from '@/api/database';
import Grafico from '@/components/Grafico';
import { theme, tokens } from './theme';
import Navbar from '@/components/Navbar';
import WeatherDisplay from '@/components/WeatherDisplay';
import Footer from '@/components/Footer';

const buttons = [
    {
      text: "Monitoramento",
      href: "/monitoramento",
    },
    {
      text: "Sobre",
      href: "/sobre",
    },
  ];

export default function Page() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await obterMedicao('semana');
            setData(result);
        }

        fetchData();
    }, []);

    return (
        <>
        <ThemeProvider theme={theme}>
            <Box sx={{
                    backgroundColor: tokens.grey[100],
                }}>
                <Navbar logo={
                
                <Box sx={{display:'flex', alignItems: 'center'}}>
                    <Box sx={{
                            objectFit: 'contain',
                            width: {sm: '1.5em', xs: '3em' },
                            height: 'auto'
                    }}>
                        <img src='/Logoico.png' />
                    </Box>
                    <h2>PlaMoNA</h2>
                    </Box>

                } buttons={buttons} />
                
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <Paper sx={{
                            width: {sm: '30em', xs: '20em'},
                            height: '26em',
                            padding: '1em',
                            margin: '1em',
                            backgroundColor: tokens.primary[600],
                            borderRadius: '2em',
                        }}>
                            <Box sx={{
                                borderRadius: '1em',
                                background: 'linear-gradient( 105deg, #3333ff44, #ffffff44)',
                                height: '24em',
                                padding: '1em',
                            }}>
                                <Grafico data={data} />
                            </Box>
                    </Paper>
                    <WeatherDisplay />
                </Box>
                <Footer/>
            </Box>
        </ThemeProvider>
        </>
    );
}
