import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function FormRecuperar(){
    const [email, setEmail] = useState("");
    const [confEmail, setConfEmail] = useState("");

    const efetuarRecuperacap = () => {
        if(email.match('@') && email==confEmail){
            console.log("Enviando email");
                //enviarEmailRecuperacao(email);
        }else{
            alert("Email inválido ou não compátivel");
            console.log("Email inválido ou não compátivel");
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
                        <input  
                            name='email' 
                            pattern="email" 
                            placeholder='exemplo@exemplo.com'
                            onChange={e => setEmail(e.target.value)}
                        />
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
                        Confirmar e-mail: <br/>
                        <input
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
                                <Button onClick={efetuarRecuperacap}>Recuperar Senha</Button>
                            </Box>
                            </Box>
                    </Box>
                </Box>
        </>
    );
}