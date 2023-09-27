import {Box, Button} from "@mui/material";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import React, {useState} from 'react'
import Grafico from "./Grafico";
import { obterDia } from "@/api/database";

const fetchData = async (dia1, setData) => {
    const res = await obterDia("diaEsp", dia1);
    setData(res);
};

export default function GraficoDia () {
    const [dia1, setDia1] = useState(new Date().toISOString().substring(0, 10));
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
        setTimeout(function() {
            fetchData(dia1, setData);
        }, 200);
    }, [dia1]);

    const aumentarDia1 = () => {
        const dataAtual = new Date(dia1);
        dataAtual.setDate(dataAtual.getDate() + 1);
        setDia1(dataAtual.toISOString().substring(0, 10));
    };

    const diminuirDia1 = () => {
        const dataAtual = new Date(dia1);
        dataAtual.setDate(dataAtual.getDate() - 1);
        setDia1(dataAtual.toISOString().substring(0, 10));
    };

    return (
        <Box m="20px">
            <Box sx={
                {
                    display: "flex",
                    gap: "1em",
                    flexDirection: "column",
                    p: "0.5em 5em"
                }
            }>
                <Box sx={
                    {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }
                }>
                    <Button variant="outlined" sx={{
                        height: "5em"
                    }}
                        onClick={diminuirDia1}>
                        <ArrowLeftOutlined />
                    </Button>

                    <Box sx={
                        {
                            overflowX: "scroll",
                            overflowY: "hidden"
                        }
                    }>
                        <Box height="30em" width="80em">
                            <Grafico data={data} />
                        </Box>
                    </Box>
                    <Button variant="outlined" sx={{
                        height: "5em"
                    }}
                        onClick={aumentarDia1}>
                        <ArrowRightOutlined />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
