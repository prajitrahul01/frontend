import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import BarChart from '../../components/barChart';
import allData from '../../data/mockData';
import html2canvas from 'html2canvas';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const BarDepartment = () => {
    const chartRef = useRef(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleDownload = () => {
        const chartContainer = chartRef.current;

        html2canvas(chartContainer).then(canvas => {
            canvas.toBlob(blob => {
                const anchor = document.createElement('a');
                anchor.download = 'bar_chart.png';
                anchor.href = URL.createObjectURL(blob);
                anchor.click();

                URL.revokeObjectURL(anchor.href);
            });
        });
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Bar Chart" subtitle="Simple Bar Chart" />
                <Box>
                    <Button variant="contained"
                        // color="primary"
                        component="span" startIcon={<ArrowDownwardOutlinedIcon />}
                        onClick={handleDownload}
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            // padding: "10px 20px",
                            '&:hover': {
                                backgroundColor: colors.blueAccent[500], // Change to a darker shade for hover
                            }
                        }}
                    >
                        <Typography sx={{ color: colors.grey[100] }} variant="h7" >
                            Download Chart
                        </Typography>
                    </Button>
                </Box>
            </Box>

            <Box height="75vh" ref={chartRef}>
                <BarChart
                    data={allData.mockBarDepartmentData}
                    index="department"
                    keys={["Friction", "Science", "History", "Biography", "Poetry", "Fantasy", "Self-Help", "Mystery", "Romance", "Graphic Novel"]}
                    xLabel="Department"
                    yLabel="Count"
                />
            </Box>
        </Box>
    )
}

export default BarDepartment;
