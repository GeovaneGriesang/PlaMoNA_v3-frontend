import { recuperarSenha } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input} from "@mui/material";
import React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function FormRecuperar(){
    const [email, setEmail] = useState("");
    const [confEmail, setConfEmail] = useState("");

    async function fetchData() {
        alert(await recuperarSenha(email));
    }

    const efetuarRecuperacao = () => {
        if(email.match('@') && email==confEmail){
            console.log("Enviando email");
            
            setTimeout(function() {
                fetchData();
            }, 200);
        }else{
            alert("Email inválido ou não compátivel");
        }
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
                            <label>
                        E-mail: <br/>
                        <Input  
                            name='email' 
                            pattern="email" 
                            placeholder='exemplo@exemplo.com'
                            onChange={e => setEmail(e.target.value)}
                        />
                        </label>
                        </Box>
                        

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <label>
                        Confirmar e-mail: <br/>
                        <Input
                            pattern="email" 
                            placeholder='exemplo@exemplo.com'
                            onChange={e => setConfEmail(e.target.value)}
                        />
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
                                <Button onClick={efetuarRecuperacao}>Enviar codico</Button>
                            </Box>
                            </Box>
                    </Box>
                </Box>
        </>
    );
}