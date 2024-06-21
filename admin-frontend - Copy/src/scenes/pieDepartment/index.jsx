import { Box } from "@mui/material"
import PieChart from "../../components/pieChart";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import allData from "../../data/mockData";

const PieDepartment = () => {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fetchData = () => {
        return axios.get('http://localhost:3000/students/departments');
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
            <Header title="Pie Depeartment Chart" subtitle="Department-wise books accessed in a day"/>
            <Box height="75vh">
                <PieChart data={data}/>
            </Box>
        </Box>
    )
}

export default PieDepartment;