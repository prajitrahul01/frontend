import { Box } from "@mui/material"
import PieChart from "../../components/pieChart";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Pie = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fetchData = () => {
        return axios.get('http://localhost:4000/api/user/gender-count');
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
            <Header title="Pie Chart" subtitle="Simple Pie Chart"/>
            <Box height="75vh">
                <PieChart data={data}/>
            </Box>
        </Box>
    )
}

export default Pie;