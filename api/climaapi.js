'use server'
import axios from "axios";

export default async function getClima(){
    const clima = await axios.get("https://api.weatherapi.com/v1/current.json?key=101cc28a65e04cceb1c123057232203&q=Venâncio&lang=pt");
    return clima.data.current;
}
