import { useState } from "react";
import { useProSidebar, Menu, MenuItem, ProSidebarProvider } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/index.es';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from "../../theme";
import HomeOutlinedIcons from "@mui/icons-material/LightModeOutlined";
// import MenuOutlinedIcons from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcons from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcons from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcons from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcons from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcons from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcons from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcons from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcons from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcons from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcons from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcons from "@mui/icons-material/MapOutlined";
import { Sidebar } from 'react-pro-sidebar';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <MenuItem active={selected === title} style={{ color: colors.grey[100] }} onClick={() => setSelected(title)} icon={icon}>
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

    return (<Box sx={{
        "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important"
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px"
        },
        "& .pro-inner-item:hover": {
            color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
            color: "#6870fa !important"
        }
    }}>
        <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[400]}>
            <Menu iconShape="square">
                <MenuItem onClick={()=>setIsCollapsed(!isCollapsed)}
                icon={isCollapsed?<MenuOutlinedIcons/>: undefined}
                style={{margin: "10px 0 20px 0",
                color: colors.grey[100]}}>
                    {!isCollapsed && (
                        <Box display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px">
                            <Typography variant="h4" color={colors.grey[100]}>
                                ADMINS
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcons />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>


                {/* USER */}
                {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`../../asserts/user.png`}
                                style={{ cursor: "pointer", borderRadius: "50%" }} />
                        </Box>
                        <Box textAlign="center">
                            <Typography varient="h2" color={colors.grey[100]} fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}>Rahul</Typography>
                            <Typography varient="h5"
                                color={colors.greenAccent[500]}>Vp Fancy Admin</Typography>
                        </Box>
                    </Box>
                )}
                {/* MENU ITEMS */}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item
                    title="Dashboard"
                    to="/"
                    icon={<HomeOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}>Data</Typography>
                    <Item
                    title="Manage team"
                    to="/team"
                    icon={<PeopleOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="Contacts Info"
                    to="/contacts"
                    icon={<ContactsOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="Invoices Balances"
                    to="/invoices"
                    icon={<ReceiptOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}>Pages</Typography>
                    <Item
                    title="Profile Form"
                    to="/form"
                    icon={<PersonOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="Calendar Today"
                    to="/calendar"
                    icon={<CalendarTodayOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="FAQ Page"
                    to="/faq"
                    icon={<HelpOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}>Charts</Typography>
                    <Item
                    title="Bar Chart"
                    to="/bar"
                    icon={<BarChartOutlinedIcons/>} 
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
                    <Item
                    title="Line Chart"
                    to="/line"
                    icon={<TimelineOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                    <Item
                    title="Geography Chart"
                    to="/geography"
                    icon={<MapOutlinedIcons/>} 
                    selected={selected}
                    setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </Sidebar>
    </Box>);
}

export default SideBar;