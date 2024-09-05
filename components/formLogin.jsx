import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input} from "@mui/material";
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

export default function FormLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [user, setUser] = useState(null);
    const [logando, setLogando] = useState(false);
    
        async function fetchData() {
            const usuario = await loginUser(email, senha);
            setUser(usuario);
        }
    
        


    const efetuarLogin = () => {
        if(!logando){
            setLogando(true);
            if(email.match('@')){
                fetchData();
                setTimeout(function() {
                    if(user!=null){
                        do{
                        alert("Logado com sucesso!");
                        console.log(user);
                        localStorage.setItem("userName", user.nome);
                        localStorage.setItem("userMail", user.email);
                        localStorage.setItem("userCPF", user.cpf);
                        localStorage.setItem("userEndereco", user.endereco);
                        localStorage.setItem("userTelefone", user.telefone);
                        localStorage.setItem("userAlertaSms", user.alerta_sms);
                        localStorage.setItem("userAlertaEmail", user.alerta_email);
                        localStorage.setItem("userAcess", user.acesso);
                        } while(user==undefined);
                        setUser(null);
                    }else{
                        alert('Email ou senha incorretos');
                    }
                    setLogando(false);
                    
                }, 500);
            }else{
                alert("E-mail inválido");
            }
        }else{
            alert('logando, aguarde');
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
                        Senha: <br/>
                        <Input 
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