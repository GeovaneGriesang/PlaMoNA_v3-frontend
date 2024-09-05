import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function FormLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const efetuarLogin = () => {
        if(email.match('@')){
                loginUser(email, senha);
        }else{
            alert("E-mail inválido");
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
                        Senha: <br/>
                        <input 
                            type='password'
                            onChange={e => setSenha(e.target.value)}
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
                                <Button onClick={efetuarLogin}>Login</Button>
                            </Box>
                            </Box>
                    </Box>
                </Box>
        </>
    )
}