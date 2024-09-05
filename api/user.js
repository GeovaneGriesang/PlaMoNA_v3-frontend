'use server'
import axios from 'axios';



// Função para enviar os dados de registro para o servidor
export const registerUser = async(nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha ) =>{
    try {
      const response = await axios.post('https://plamona-q3aj.onrender.com/api/register', { nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha });
      console.log(response.data.message); 
    } catch (error) {
      console.error('Erro durante o registro:', error);
    }
  };


  export const loginUser = async ( email, senha ) => {
    try {
      const response = await axios.post('https://plamona-q3aj.onrender.com/api/login', { email, senha });
      console.log(response.data.message);
      return(response.data.loginState);
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

