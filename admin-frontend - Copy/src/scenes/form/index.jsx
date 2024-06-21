import { Alert, Box, Button, MenuItem, Snackbar, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";

const initialValues = {
    studentname: "",
    studentemail: "",
    studentdepartment: "",
    studentid: "",
    studentpassword: ""
};


const userSchema = yup.object().shape({
    studentname: yup.string().required("required"),
    studentemail: yup.string().email("Invalid email").required("required"),
    studentid: yup.string().required("required"),
    studentpassword: yup.string().required("required"),
    studentdepartment: yup.string().required("required")
});
const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [alertOpen, setAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            console.log("Values: ", values);
            await axios.post('http://localhost:3000/register/student', values);
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
    

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleCloseErrorAlert = () => {
        setErrorAlertOpen(false);
    };

 
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
                            value={values.studentname}
                            name="studentname"
                            error={!!touched.studentname && !!errors.studentname}
                            helperText={touched.studentname && errors.studentname}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="Roll No."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.studentid}
                            name="studentid"
                            error={!!touched.studentid && !!errors.studentid}
                            helperText={touched.studentid && errors.studentid}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="Department"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.studentdepartment}
                            name="studentdepartment"
                            error={!!touched.studentdepartment && !!errors.studentdepartment}
                            helperText={touched.studentdepartment && errors.studentdepartment}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.studentemail}
                            name="studentemail"
                            error={!!touched.studentemail && !!errors.studentemail}
                            helperText={touched.studentemail && errors.studentemail}
                            sx={{gridColumn:"span 2"}}/>
                            <TextField fullWidth 
                            variant="filled"
                            type="text"
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.studentpassword}
                            name="studentpassword"
                            error={!!touched.studentpassword && !!errors.studentpassword}
                            helperText={touched.studentpassword && errors.studentpassword}
                            sx={{gridColumn:"span 4"}}/>
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