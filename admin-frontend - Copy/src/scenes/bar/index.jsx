import {Box} from '@mui/material';
import Header from '../../components/Header';
import BarChart from '../../components/barChart';
import allData from '../../data/mockData';

const Bar = () => {
    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart"/>
            <Box height="75vh">
                <BarChart data={allData.mockPieData} keys={["value"]} index="label" xLabel="Gener" yLabel="Count"/>
            </Box>
        </Box>
    )
}

export default Bar;