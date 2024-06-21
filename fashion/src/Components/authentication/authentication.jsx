
import Grid from '@mui/material/Grid';

import './authentication.css';

import LoginPage from '../login/login';
import SignUp from '../signup/sign';

export const Authentication = (props) => {

    return (
        
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }} minHeight="200px">
                <Grid item xs={12} sm={6}>
                    <LoginPage/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SignUp/>
                </Grid>
            </Grid>
       
    );
};

export default Authentication;
