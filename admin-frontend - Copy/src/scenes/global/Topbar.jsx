import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import DarkModeOutlinedIcons from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcons from "@mui/icons-material/LightModeOutlined";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
    <Box display="flex" justifyContent="flex-end" p={2}>
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark"?(<DarkModeOutlinedIcons/>):(<LightModeOutlinedIcons/>)}
            </IconButton>
        </Box>
    </Box>);
}
export default TopBar;
