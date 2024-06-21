
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const ContactPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Our Office
            </Typography>
            <Typography>
              123 Main Street, Cityville, Country
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography>
              Email: info@example.com
            </Typography>
            <Typography>
              Phone: +1 (123) 456-7890
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
