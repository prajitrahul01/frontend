import { Box } from "@mui/material"
import LineChart from "../../components/lineChart";
import Header from "../../components/Header";
import allData from "../../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
const Line = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fetchData = () => {
        return axios.get('http://localhost:3000/bookMonth');
    };
    useEffect(() => {
        fetchData()
            .then(response => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError("Error fetching data: Unexpected response status");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Error fetching data: " + error.message);
            });
    }, []);
    return (
        
        <Box m="20px">
            <Header title="Line Chart" subtitle="Line Pie Chart"/>
            <Box height="75vh">
                <LineChart data={data} xLabel="Month" yLabel="Books Added"/>
            </Box>
        </Box>
    )
}

export default Line;