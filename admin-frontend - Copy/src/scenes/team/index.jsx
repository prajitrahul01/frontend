import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Modal, Typography, useTheme, Alert, AlertTitle, Select, Button } from '@mui/material';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import './index.css';
import { MenuItem } from '@mui/material';

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        studentid: '',
        studentusername: '',
        studentemail: '',
        studentpassword: '',
        studentdepartment: '',
        updatedAt: ''
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleRowClick = (rowData) => {
        setFormData(rowData);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const signup = await axios.post('http://localhost:3000/update/student', formData);
            alert("Successfully registered");
        } catch (error) {
            console.log(error);
            alert("Registration failed, please try again");
        }
    };

    const fetchData = () => {
        return axios.get('http://localhost:3000/students').then(response => {
            // Add id property to each row object
            const rowsWithIds = response.data.map((row, index) => ({
                ...row,
                id: index + 1 // Assuming index starts from 0, add 1 to avoid id = 0
            }));
            console.log("Data: ", rowsWithIds);
            return rowsWithIds;
        })
    };

    useEffect(() => {
        fetchData()
            .then(response => {
                console.log("Response: ", response); // Add this line to check the response
                // if (response.status === 200) {
                    setRows(response);
                    console.log("Rows: ", rows); // Add this line to check the value of rows
                // } else {
                //     setError("Error fetching data: Unexpected response status");
                // }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Error fetching data: " + error.message);
            });
    }, []);

    const columns = [
        { field: "studentid", headerName: "ID" },
        { field: "studentname", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "studentdepartment", headerName: "Department", flex: 1 },
        // { field: "studentpassword", headerName: "Password", flex: 1 },
        { field: "studentemail", headerName: "Email", flex: 1 },
        { field: "updatedAt", headerName: "Logined At", flex: 1 },
        // {
        //     field: "role", headerName: "Role", flex: 1,
        //     renderCell: ({ row: { role } }) => {
        //         return (
        //             <Box width="100%"
        //                 m="10px auto"
        //                 p="7px"
        //                 display="flex"
        //                 justifyContent="center"
        //                 backgroundColor={
        //                     role === "ADMIN" ? colors.greenAccent[600] : colors.greenAccent[700]
        //                 }
        //                 borderRadius="4px">
        //                 {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
        //                 {role === "SITEMANAGER" && <SecurityOutlinedIcon />}
        //                 {role === "EMPLOYEE" && <LockOpenOutlinedIcon />}
        //                 <Typography color={colors.grey[100]} sx={{ ml: "0px" }}>
        //                     {role}
        //                 </Typography>
        //             </Box>
        //         )
        //     }
        // },
    ];

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
        <Box m="0px 0px 0px 10px">
            <Header title="Studnets" subtitle="Managing the Student Credentials" />
            <Box m="0px 0px 0px 0px"
                height="70vh" sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    }, 
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    
                }}>
                <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} onRowClick={(rowData) => handleRowClick(rowData.row)} />
            </Box>
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
                onClose={handleClose}
                >
                <Box
                    className='modal-content' sx={
                    {bgcolor:colors.blueAccent[700]}
                    }
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Monster
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <label>Id:</label>
                        <input type="number" name='studentid' value={formData.studentid} onChange={handleChange} readOnly/>
                        <label>Email:</label>
                        <input type="email" name='studentemail' value={formData.studentemail} onChange={handleChange} />
                        <label>Username:</label>
                        <input type="text" name='studentname' value={formData.studentname} onChange={handleChange} />
                        <label>Password:</label>
                        <input type="text" name='studentpassword' value={formData.studentpassword} onChange={handleChange} />
                        {/* <Box display="flex" alignItems="center" gap={2}>
                            <Box flex="1">
                                <label>Role:</label>
                                <Select name="role" value={formData.role} onChange={handleChange}>
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                    <MenuItem value="SITEMANAGER">SITE MANAGER</MenuItem>
                                    <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                                </Select>
                            </Box>
                            <Box flex="1">
                                <label>Gender:</label>
                                <Select value={formData.gender} onChange={handleChange} name="gender">
                                    <MenuItem value="MALE">MALE</MenuItem>
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    <MenuItem value="OTHER">OTHER</MenuItem>
                                </Select>
                            </Box>
                        </Box> */}
                        <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
                            <Button type="submit" variant="contained">
                            <Typography color={colors.grey[100]} sx={{ ml: "0px" }}>
                           Submit
                        </Typography>
                            </Button>
                        </Box>
                    </form>
                    
                </Box>
            </Modal>
        </Box>
    );
}

export default Team;
