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
import PersonIcon from '@mui/icons-material/Person';

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        email: '',
        // password: '',
        userRole: '',
        gender: '',
        lastLoginTimeStamp: ''
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
            const signup = await axios.post('http://localhost:4000/api/user/registration', formData);
            alert("Successfully registered");
        } catch (error) {
            console.log(error);
            alert("Registration failed, please try again");
        }
    };

    // const fetchData = () => {
    //     const token = localStorage.getItem("accessToken"); // Change this line
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
    //     return axios.get('http://localhost:4000/api/user/getAll');
    // };
    const fetchData = () => {
        const token = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.get('http://localhost:4000/api/user/getAll')
            .then(response => {
                // Add id property to each row object
                const rowsWithIds = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1 // Assuming index starts from 0, add 1 to avoid id = 0
                }));
                return rowsWithIds;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                let errorMessage = error.message;
                if (error.response && error.response.data) {
                    errorMessage = error.response.data;
                }
                setError("Error fetching data: " + errorMessage);
            });
    };
    useEffect(() => {
        fetchData()
            .then(response => {
                console.log("Response: ", response)
                // if (response.status === 200) {
                    setRows(response);
                // } else {
                //     setError("Error fetching data: Unexpected response status");
                // }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                let errorMessage = error.message;
            if (error.response && error.response.data) {
                errorMessage = error.response.data;
            }
                setError("Error fetching data: " + errorMessage);
            });
    }, []);

    const columns = [
        { field: "userId", headerName: "ID" },
        { field: "userName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "gender", headerName: "Gender", flex: 1 , renderCell: ({row: {gender}}) => {
            if(gender == 0) return "Male";
            if(gender == 1) return "Female";
            if(gender == 2) return "Others";
        }},
        // { field: "password", headerName: "Password", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "lastLoginTimeStamp", headerName: "LastLoginTimeStamp", flex: 1 },
        {
            field: "userRole", headerName: "Role", flex: 1,
            renderCell: ({ row: { userRole } }) => {
                return (
                    <Box width="100%"
                        m="10px auto"
                        p="7px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            userRole == 1 ? colors.greenAccent[600] : colors.greenAccent[700]
                        }
                        borderRadius="4px">
                        {userRole == 1 && <SecurityOutlinedIcon />}
                        {userRole == 2 && <PersonIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "0px" }}>
                            {(userRole==1)?"SITEMANAGER":""}
                            {(userRole==2)?"EMPLOYEE":""}
                        </Typography>
                    </Box>
                )
            }
        },
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
            <Header title="TEAM" subtitle="Managing the Team Members" />
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
                        <input type="number" name='user_id' value={formData.userId} onChange={handleChange} readOnly/>
                        <label>Email:</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} />
                        <label>Username:</label>
                        <input type="text" name='userName' value={formData.userName} onChange={handleChange} />
                        {/* <label>Password:</label>
                        <input type="text" name='password' value={formData.password} onChange={handleChange} /> */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box flex="1">
                                <label>Role:</label>
                                <Select name="userRole" value={formData.userRole} onChange={handleChange}>
                                    {/* <MenuItem value="ADMIN">ADMIN</MenuItem> */}
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
                        </Box>
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
