import { enviaNovaSenha } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function FormRecuperar(){
    const [codigo, setCodigo] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");

    async function fetchData() {
        alert(await enviaNovaSenha(codigo, senha));
    }


    const AlterarSenha = () => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        if(senha.match(regex) && senha==confSenha){
            if(codigo!=""){
                setTimeout(function() {
                    fetchData();
                }, 200);
                
            }
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
                        Digite o código enviado: <br/>
                        <Input
                            onChange={e => setCodigo(e.target.value)}
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
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Senha: <br/>
                        <Input 
                            type='password'
                            onChange={e => setSenha(e.target.value)}
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
                            Confirme a senha: <br/><Input type='password' name='confSenha' id='confSenhaID'
                            onChange={e => setConfSenha(e.target.value)}
                        />
                        </label>
                        </Box>                   
                            <Box sx={{
                                padding: '.5em',
                                margin: '1em',
                                borderRadius: '2em',
                                backgroundColor: tokens.primary[400],
                            }}>
                                <Button onClick={AlterarSenha}>Alterar Senha</Button>
                            </Box>
                            </Box>
                    </Box>
                </Box>
        </>
    );
}
