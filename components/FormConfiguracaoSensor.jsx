import { atualizaConfSensor, pesquisaSensores } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, Radio } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

export default function FormRecuperar(){
    const sensores = [{label: 'Sensor do Grão Para', codigo: 1}, {label: 'Sensor de Olavo Bilack', codigo: 2 }];
   
    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = React.useState('');
    const [codValue, setCodValue] = React.useState(0);
    const [descricao, setDescricao] = useState("");
    const [nvlMin, setNvlMin] = useState(0);
    const [nvlMax, setNvlMax] = useState(0);
    const [envMin, setEnvMin] = useState(false);
    const [envMax, setEnvMax] = useState(false);
    const [msgMin, setMsgMin] = useState("");
    const [msgMax, setMsgMax] = useState("");
    const [sensorBanco, setSensorBanco]= useState([]);
    const [sensor, setSensor] = useState(0);
    
    
    

    async function fetchData() {
        alert(await atualizaConfSensor(codValue, descricao, nvlMin, 
            nvlMax, envMin, envMax, msgMin, msgMax));
    }

    async function fetchDataPesquisa() {
        return (await pesquisaSensores(codValue));
    }


    const efetuarPesquisa = () => {
        
        setSensorBanco (fetchDataPesquisa());
            
        setTimeout(function() {
        console.log("Array: " + sensorBanco);
        }, 10000);
        
    };

    const efetuarConfigurar = () => {
        setTimeout(function() {
            fetchData();
        }, 200);
    };


    return(
        <>
        <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                            width: {sm: '35em', xs: '20em'},
                            height: 'auto',
                            padding: '.5em',
                            margin: '1em',
                            backgroundColor: tokens.primary[600]+"88",
                            borderRadius: '2em',
                    }}>
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                           <Autocomplete
                           value={value}
                           onChange={(event, newValue) => {
                             setValue(newValue);
                             setCodValue(newValue.codigo);
                           }}
                           inputValue={inputValue}
                           codValue={codValue}
                           onInputChange={(event, newInputValue) => {
                             setInputValue(newInputValue);
                           }}
                           
                            id="combo-box-demo"
                            options={sensores}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Sensores" />}
                            />
                            
                        </Box>

                        
                        <hr />
                        
                        
                        
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',   
                        }}>
                        <label>
                        Descrição: <br/>
                        <Input 
                        
                        id="inpDesc"
                        onChange={e => setDescricao(e.target.value)}/>
                        </label>
                        </Box>
                        
                        <hr />
                        
                        

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Nível Minimo: <br/>
                        <Input 
                            id="inpNivelMin"
                            type="number"
                            onChange={e => setNvlMin(e.target.value)}
                        /><hr/>
                        <Input 
                                id="radMin"
                                type='radio'
                                onChange={e => setEnvMin(e.target.checked)}
                            /> Enviar alerta caso atinga nível mínimo<br/>
                        </label>

                        


                        </Box>
                        <hr />

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Mensagem enviada: <br/>
                        <Input 
                        id="inpMsgMin"
                        onChange={e => setMsgMin(e.target.value)}/>
                        </label>


                        </Box>
                        
                        <hr />

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Nível Máximo: <br/>
                        <Input 
                            id="inpNivelMax"
                            type="number"
                            onChange={e => setNvlMax(e.target.value)}
                        /><hr/>
                        <Input 
                                id="radMax"
                                type='radio'
                                onChange={e => setEnvMax(e.target.checked)}
                            /> Enviar alerta caso atinga nível Máximo<br/>
                        </label>
                        </Box>
                        
                        <hr />
                        

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Mensagem enviada: <br/>
                        <Input 
                        id="inpMsgMax"
                        onChange={e => setMsgMax(e.target.value)}/>
                        </label>


                        </Box>

                        
                        <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}>
                            <Box sx={{
                                padding: '.5em',
                                margin: '1em',
                                borderRadius: '2em',
                                backgroundColor: tokens.primary[400],
                            }}>
                                <Button onClick={efetuarConfigurar}>Configurar</Button>
                            </Box>
                        </Box>

                        
                    </Box>
                </Box>
        </>
    );
}
