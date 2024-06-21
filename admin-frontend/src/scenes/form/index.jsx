import { Alert, AlertTitle, Box, Button, MenuItem, Snackbar, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { tokens } from '../../theme';


const initialValues = {
    userName: "",
    email: "",
    userRole: "",
    gender: ""
};


const userSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    userRole: yup.string().required("required"),
    gender: yup.string().required("required")
});
const Form = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [alertOpen, setAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const token = localStorage.getItem("accessToken"); // Change this line
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            await axios.post('http://localhost:4000/api/user/registration', values);
            setAlertOpen(true);
            resetForm();
        } catch (error) {
            console.error('Error creating user:', error);
            let errorMessage = "Error creating user. Please try again later.";
            if (error.response && error.response.data) {
                errorMessage = error.response.data;
            }
            setErrorAlertOpen(true);
            setError(errorMessage);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken"); // Change this line
        if(!token)
            setError("You are not logged in");
    }, []);
    
    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ color: colors.grey[100], m: "10px" }}>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            </Box>
        );
    }

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleCloseErrorAlert = () => {
        setErrorAlertOpen(false);
    };

    const roles = ["SITEMANAGER", "EMPLOYEE"];
    const genders = ["MALE", "FEMALE", "OTHER"];
    return (<Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile"/>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues}
            validationSchema={userSchema}>
                {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile? undefined:"span 4"}
                        }}>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="User Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userName}
                            name="userName"
                            error={!!touched.userName && !!errors.userName}
                            helperText={touched.userName && errors.userName}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Role"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userRole}
                                name="userRole"
                                error={!!touched.role && !!errors.role}
                                helperText={touched.role && errors.role}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender}
                                name="gender"
                                error={!!touched.gender && !!errors.gender}
                                helperText={touched.gender && errors.gender}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {genders.map((gender) => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">Create New User</Button>
                        </Box>
                    </form>
    )}
            </Formik>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                message="User saved in the database"
            />
            <Snackbar
                open={errorAlertOpen}
                autoHideDuration={3000}
                onClose={handleCloseErrorAlert}
            >
                <Alert severity="error" onClose={handleCloseErrorAlert}>
                    Error: {error}
                </Alert>
            </Snackbar>
        
    </Box>);
}

export default Form;