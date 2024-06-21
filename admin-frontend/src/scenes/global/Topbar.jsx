import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import DarkModeOutlinedIcons from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcons from "@mui/icons-material/LightModeOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login'
        // Additional logic for sign-out action if needed
      };
    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (<DarkModeOutlinedIcons />) : (<LightModeOutlinedIcons />)}
                </IconButton>
            </Box>
            <Box display="flex" paddingTop={0.7}>
                <IconButton>
                    {localStorage.getItem("accessToken") ? (
                        <Link style={{textDecoration: 'none', color: 'inherit'}}>
                            <LogoutOutlinedIcon onClick={handleSignOut}/>
                        </Link>
                    ) : (
                    <Link to="/login" style={{textDecoration: 'none', color: 'inherit'}}>
                        <LoginOutlinedIcon />
                    </Link>)}
                </IconButton>
            </Box>
        </Box>);
}
export default TopBar;
