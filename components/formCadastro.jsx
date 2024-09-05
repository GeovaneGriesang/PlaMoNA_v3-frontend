import { registerUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import axios from "axios";

function testaCPF(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;

}

export default function Cadastro(){
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [alerta_email, setAlertaEmail] = useState(false);
    const [alerta_sms, setAlertaSMS] = useState(false);
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [endereco, setEndereco] = useState("");

    const efetuarCadastro = () => {
        if(email=="" | nome=="" | cpf=="" | endereco=="" | telefone=="" | confSenha=="" | senha=="" ){
            alert("Por favor, preencher todos os campos");
        }else {
            var alerta_emailInt=0, alerta_smsInt=0;
            const telefoneAlterado = telefone.replace(/\D/g,'');
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
            if(telefoneAlterado.length >= 10 && telefoneAlterado.length <= 11){
                if(senha.match(regex) && senha==confSenha){
                    
                    if(testaCPF(cpf)){
                        if(email.match('@')){
                            if(alerta_email){
                                alerta_emailInt=1;
                            }else{
                                alerta_emailInt=0;
                            }
                            if(alerta_sms){
                                alerta_smsInt=1;
                            }else{
                                alerta_smslInt=0;
                            }
                            registerUser(nome, cpf, endereco, email, telefone, alerta_smsInt, alerta_emailInt, senha);
                        }else{
                            alert("E-mail inválido");
                        }
                    }else{
                        alert("CPF inválido");
                    }
                }else{
                    alert("Senha inválida");
                }
            }else{
                alert("Telefone inválido");
            } 
        }
    };


return (
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
                            <label margin='1px'>
                            Nome: <br/><input name='nome' id='nomeID' 
                            onChange={e => setNome(e.target.value)}/>
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
                        Endereco: <br/>
                        <input placeholder="Rua, Nº, Bairro"
                        onChange={e => setEndereco(e.target.value)}/>
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
                        CPF: <br/><input name='cpf' id='cpfID' maxLength="14"
                        onChange={e => setCPF(e.target.value)}/>
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
                        Telefone: <br/>
                        <input 
                            placeholder='(51)91234-5678'
                            type="tel"
                            onChange={e => setTelefone(e.target.value)}
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
                        
                        <hr/>

                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                        Confirme a senha: <br/><input type='password' name='confSenha' id='confSenhaID'
                        onChange={e => setConfSenha(e.target.value)}
                        />
                        </label>
                        </Box>                        
                        
                        <hr/>

                        <Box sx={{
                            padding: '.5em',
                            margin: '.5em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                        <label>
                            Forma de aviso:
                            
                        </label>
                        </Box>
                        <Box sx={{
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}> 
                        <label>
                            <input 
                                type='radio' 
                                onChange={e => setAlertaSMS(e.target.checked)}
                            /> Aviso por SMS<br/>
                            <input 
                                type='radio'
                                onChange={e => setAlertaEmail(e.target.checked)}
                            /> Aviso por E-mail
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
                                <Button onClick={efetuarCadastro}>Cadastrar-se</Button>
                            </Box>
                            </Box>
                    </Box> ;
                </Box>
    </>)
}