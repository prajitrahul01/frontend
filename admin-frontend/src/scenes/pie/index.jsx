import { Alert, AlertTitle, Box, useTheme } from "@mui/material"
import PieChart from "../../components/pieChart";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import axios from "axios";

const Pie = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fetchData = () => {
        const token = localStorage.getItem("accessToken"); // Change this line
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
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
                setError("Please login with your account");
            });
    }, []);

    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ color: colors.grey[100], m: "10px" }}>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            </Box>
        );
    }
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