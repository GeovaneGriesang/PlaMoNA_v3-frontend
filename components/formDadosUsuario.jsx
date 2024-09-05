import { registerUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input} from "@mui/material";
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



export default function DadosUsuario(){
    const [nome, setNome] = useState(localStorage.getItem("userName"));
    const [cpf, setCPF] = useState(localStorage.getItem("userCPF"));
    const [email, setEmail] = useState(localStorage.getItem("userMail"));
    const [telefone, setTelefone] = useState(localStorage.getItem("userTelefone"));
    const [alerta_email, setAlertaEmail] = useState(localStorage.getItem("userAlertaEmail"));
    const [alerta_sms, setAlertaSMS] = useState(localStorage.getItem("userAlertaSms"));
    const [endereco, setEndereco] = useState(localStorage.getItem("userEndereco"));
    const [resposta, setResposta] = useState(0);
    
    const [alerta_smsString, setAlerta_smsString] = useState("Sim");
    const [alerta_emailString, setAlerta_emailString] = useState("Sim");

    
    

    async function fetchData() {
        
    }

    const efetuarAlteracao = () => {
        if(email=="" | nome=="" | cpf=="" | endereco=="" | telefone==""){
            alert("Por favor, preencher todos os campos");
        }else {
            const telefoneAlterado = telefone.replace(/\D/g,'');
            
            if(telefoneAlterado.length >= 10 && telefoneAlterado.length <= 11){
                if(testaCPF(cpf)){
                    if(email.match('@')){
                        fetchData();
                        
                        setTimeout(function() {
                            if(resposta==0){
                                alert("Erro ao atualizar os dados!")
                            }else if(resposta==1){
                                alert("Dados atualizados com sucesso!");
                            }
                        }, 200);
                        
                        
                        
                    }else{
                        alert("E-mail inválido");
                    }
                }else{
                    alert("CPF inválido");
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
                            Nome: <br/><Input name='nome' id='nomeID' value={nome}
                            onChange={e => setNome(e.target.value)}/>
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
                        Endereco: <br/>
                        <Input value={endereco}
                        onChange={e => setEndereco(e.target.value)}/>
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
                        CPF: <br/><Input name='cpf' id='cpfID' maxLength="14" value={cpf}
                        onChange={e => setCPF(e.target.value)}/>
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
                        E-mail: <br/>
                        <Input  
                            name='email' 
                            pattern="email" 
                            value={email}
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
                        Telefone: <br/>
                        <Input 
                            value={telefone}
                            type="tel"
                            onChange={e => setTelefone(e.target.value)}
                        />
                        </label>
                        </Box>
                      
                        

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
                        Aviso SMS: <br/>
                        <Input 
                            value={alerta_sms}
                            type="tel"
                            onChange={e => setAlertaSMS(e.target.value)}
                        />
                        </label>
                        <label>
                        Aviso Email: <br/>
                        <Input 
                            value={alerta_email}
                            type="tel"
                            onChange={e => setAlertaSMS(e.target.value)}
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
                                <Button onClick={efetuarAlteracao}>Alterar Dados</Button>
                            </Box>
                            </Box>
                    </Box> 
                </Box>
    </>)
}