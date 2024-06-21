import { Box } from "@mui/material"
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from '@mui/material';
const Geography = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" >
            <Header title="Geographgy Chart" subtitle="Simple Geographgy Chart"/>
            <Box height="75vh" border={`1px solid ${colors.grey[100]}`}>
                <GeographyChart/>
            </Box>
        </Box>
    )
}

export default Geography;