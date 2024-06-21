import { Box } from "@mui/material"
import LineChart from "../../components/lineChart";
import Header from "../../components/Header";

const Line = () => {
    return (
        <Box m="20px">
            <Header title="Line Chart" subtitle="Line Pie Chart"/>
            <Box height="75vh">
                <LineChart/>
            </Box>
        </Box>
    )
}

export default Line;