import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select
} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import Grafico from './Grafico';
import { obterComparacao } from '@/api/database';
import { Refresh } from '@mui/icons-material';


export default function GraficoComp() {
    
    if(localStorage.getItem('periodoComp')==null){
        localStorage.setItem('periodoComp', 'dia');
    }
    const [periodo, setPeriodo] = useState(localStorage.getItem('periodoComp'));
    const [dia1, setDia1] = useState(new Date().toISOString().substring(0, 10));
    const [dia2, setDia2] = useState(new Date().toISOString().substring(0, 10));
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setData([]);
            
            const result = await obterComparacao(periodo, localStorage.getItem("data1"), localStorage.getItem("data2"));
            console.log("resultado: "+result);
            setData(result);
            
        }
        fetchData();
      }, []);

     

    const handlePeriodo = (event) => {
        
        localStorage.setItem('periodoComp', event.target.value);
        location.reload();
        setPeriodo(localStorage.getItem('periodoComp'));
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
                        dateFormat="yyyy/MM/dd"
                        onChange={
                            (newValue) => localStorage.setItem("data1", newValue)
                            
                        }
                        
                        />
                    <DatePicker label="Data 2"
                        dateFormat="yyyy/MM/dd"
                        onChange={
                            (newValue) => localStorage.setItem("data2", newValue)
                            
                        }
                        openTo="day"
                        />
                        <Button></Button>
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