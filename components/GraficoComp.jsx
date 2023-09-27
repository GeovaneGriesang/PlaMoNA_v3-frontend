import React, {useState, useEffect} from 'react';
import {
    Box,
    MenuItem,
    Select
} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import Grafico from './Grafico';
import { obterComparacao } from '@/api/database';

const fetchData = async (periodo, dia1, dia2, setData) => {
    const res = await obterComparacao(periodo, dia1, dia2);
    setData(res);
};

export default function GraficoComp() {
    const [periodo, setPeriodo] = useState('semana');
    const [dia1, setDia1] = useState(new Date().toISOString().substring(0, 10));
    const [dia2, setDia2] = useState(new Date().toISOString().substring(0, 10));
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
        setTimeout(function() {
            fetchData(periodo, dia1, dia2, setData);
          }, 200);
      }, [periodo, dia1, dia2]);


    const handlePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    return (
        <Box m="20px">
            <Box sx={{
                        display: "flex",
                        gap: "1em",
                        flexDirection: "column",
                        p: {sx: "0.5em", sm: "0.5em 5em"},
                        width: {sx: "16.5em", sm: "100%"}
                    }}>
                <Select variant="outlined"
                    value={periodo}
                    label="Período"
                    onChange={handlePeriodo}
                    >
                    <MenuItem value={'dia'}>Dia</MenuItem>
                    <MenuItem value={'semana'}>Semana</MenuItem>
                    <MenuItem value={'mes'}>Mês</MenuItem>
                    <MenuItem value={'ano'}>Ano</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Data 1"
                        onChange={
                            (newValue) => setDia1(newValue)
                        }
                        
                        />
                    <DatePicker label="Data 2"
                        onChange={
                            (newValue) => setDia2(newValue)
                        }
                        openTo="day"
                        />
                </LocalizationProvider>
            </Box>
            <Box justifyContent={'center'} sx={{
                    overflowX: "scroll",
                    overflowY: "hidden"
                }}>
                <Box height="30em" width="70em" display={'flex'} justifyContent={'center'}>
                    <Grafico data={data}/>
                </Box>
            </Box>
        </Box>
    );
};