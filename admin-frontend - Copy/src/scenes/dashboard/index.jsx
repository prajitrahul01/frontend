import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import allData from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/lineChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import BarChart from '../../components/barChart';
import PieChart from '../../components/pieChart';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to Dashboard" />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>
            {/* GRIDS & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >

                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Books added
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                1345
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" mt="-20px">
                    <LineChart isDashboard={true} data={allData.mockLineData} xLabel="Month" yLabel="Books Added"/>

                    </Box>
                </Box>
                {/* TRANSACTIONS */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p="15px"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Downloads
                        </Typography>
                    </Box>
                    {allData.mockTransactions.map((transations, i) => (
                        <Box
                            key={`${transations.txId} - ${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    {transations.txId}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {transations.user}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>{transations.date}</Box>
                            <Box color={colors.grey[100]}>{transations.time}</Box>
                        </Box>
                    ))}
                </Box>
                {/* ROW 3 */}
                <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
                    <Typography variant="h5" fontWeight="600">
                        Visited
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
                        <ProgressCircle size="100" progress='0.40' />
                        <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
                            People Visited in last one hour
                        </Typography>
                        <Typography variant="h5" fontWeight="600">
                            Includes CEG and SAP, MIT
                        </Typography>
                    </Box>
                </Box>
                {/*  */}
                <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]}>
                    < Typography variant="h5" fontWeight="600" sx={{ p: "30px 30px 0 30px" }}>
                        Genre accessed
                    </Typography>
                    <Box height="400px" mt="-20px">
                        <BarChart
                            data={allData.mockBarDepartmentData}
                            index="department"
                            keys={["Friction", "Science", "History", "Biography", "Poetry", "Fantasy", "Self-Help", "Mystery", "Romance", "Graphic Novel"]}
                            xLabel="Department"
                            yLabel="Count"
                        />
                    </Box>
                </Box>
                {/*  */}
                <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} p="30px">
            <Typography variant="h5" fontWeight="600" sx={{mb: "15px"}}>
            Department-wise books accessed 
            </Typography>
            <Box height="400px">
            <PieChart data={allData.mockPieDepartmentData} isDashboard={true}/>
            </Box>
        </Box>
            </Box>
        </Box>
    )
}

export default Dashboard;