import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { MenuItem, Menu,Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useState } from "react";
import MenuOutlinedIcons from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcons from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcons from "@mui/icons-material/PersonOutlined";
import PieChartOutlinedIcons from "@mui/icons-material/PieChartOutlined";


const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Link to={to} style={{textDecoration: 'none'}}>
            <MenuItem active={selected === title} style={{color: colors.grey[300]}} onClick={() => setSelected(title)} icon={icon}>
            <Typography>{title}</Typography>
            </MenuItem>
        </Link>
    )
}

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const accessToken = localStorage.getItem('accessToken');

    // Render sidebar only if access token exists
    if (!accessToken) {
      return null; // Return null if no access token
    }
    return (<Box sx={{
        "& .MuiBox-root": {
            height: "100vh"
        },
        "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper":{
            backgroundColor: "transparent !important"
        },
        "& .pro-inner-item":{
            padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover":{
            color: "#6870fa !important"
        },
        "& .pro-menu-item.active": {
            color: "#6870fa !important"
        }
    }}>
        <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]}>
            <Menu iconShape="square">
                <MenuItem onClick={()=>setIsCollapsed(!isCollapsed)}
                icon={isCollapsed?<MenuOutlinedIcons/>:undefined}
                style={{margin: "10px 0 20px 0", color: colors.grey[100]}}>
                {!isCollapsed && (
                    <Box display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px">
                    <Typography variant="h3" color={colors.grey[100]}>
                        ADMINS
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcons />
                    </IconButton>
                </Box>
                )}
                </MenuItem>

                {/* MENU ITEMS */}
                <Box paddingLeft={isCollapsed?undefined:"10%"}>
                    <Item title="Manage team" to="/team" icon={<PeopleOutlinedIcons/>} selected={selected} setSelected={setSelected}/>
                    <Item
                    title="Profile Form"
                    to="/form"
                    icon={<PersonOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="Pie Chart"
                    to="/pie"
                    icon={<PieChartOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                />
                </Box>

            </Menu>
        </Sidebar>
    </Box>);
}
export default SideBar;
