'use server'
import { StepContext } from '@mui/material';
import axios from 'axios';

  

// Função para enviar os dados de registro para o servidor
export const registerUser = async(nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha ) =>{
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/register', { nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha });
      return (response.data.loginState);
    } catch (error) {
      console.log(error);
      console.log("nada");
    }
  };


  export const loginUser = async ( email, senha ) => {
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/login', { email, senha });
      console.log(response.data.message);
      if(response.data.loginState==1){
          console.log(response.data.usuario);
          console.log('/');
          const user = response.data.usuario;
          console.log(user.nome);
          return(user);
      }else{
        return null;
      }
      
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  export const recuperarSenha = async ( email ) => {
    try {
      console.log(email);
      const response = await axios.post('http://127.0.0.1:4000/email', { email });
      console.log(response.data.message);
      return response.data.message;
    }catch(error){
      console.error('Erro durante o envio do email', error);
    }
  };

  export const enviaNovaSenha = async( codigo, novaSenha) => {
      try{
        const response = await axios.post('http://127.0.0.1:4000/novaSenha', { codigo, novaSenha });
        console.log(response.message);
        return response.data.message;
      } catch(error){
        console.error('Erro durante o envio do email', error);
      }
  }

  export const atualizaConfSensor = async (idSensor, descricao, nvlMin, 
    nvlMax, envMin, envMax, msgMin, msgMax) => {
      try{
        const response = await axios.post('http://127.0.0.1:4000/atualizaSensor', {idSensor, descricao, nvlMin, 
        nvlMax, envMin, envMax, msgMin, msgMax});
        console.log(response.message);
        return response.data.message;
      } catch(error){
        console.error('Erro ao atualizar configurações do sensor', error);
      }
    }

    export const pesquisaSensores = async (idSensor) => {
      try{
        const response = await axios.post('http://127.0.0.1:4000/getSensores', {idSensor} );
        console.log(response.message);
        if(response.data.state==0){
          console.alert("Certo!" + response.data.resultado.data);
          return response.data.resultado.data;
        }else{
          alert("Errado"+response.data.message);
        }
      } catch(error){
        console.error('Erro ao atualizar configurações do sensor', error);
      }
    }
