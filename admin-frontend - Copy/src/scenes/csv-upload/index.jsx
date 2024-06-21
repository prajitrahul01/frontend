import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Upload } from '@mui/icons-material';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';

const CSVUploadPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      console.log('File uploaded:', selectedFile);
      // You can perform additional actions here, such as sending the file to a server
    } else {
      console.error('No file selected');
    }
  };

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom >
        Upload CSV File
      </Typography>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-file">
        {/* <Button
          variant="contained"
          color="primary"
          component="span"
          style={{ marginTop: '20px' }}
          startIcon={<Upload />}
          sx={{color: colors.grey[500]}}
        >
           Choose File
        </Button> */}
        <Button variant="contained"
          color="primary"
          component="span"
          style={{ marginTop: '20px' }} startIcon={<AttachmentOutlinedIcon />}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            '&:hover': {
              backgroundColor: colors.blueAccent[500], // Change to a darker shade for hover
            }
          }}
        >
          Choose File
        </Button>
      </label>
      <label style={{ marginLeft: '10px' }}>
      <Button variant="contained"
          // color="primary"
          component="span"
          disabled={!selectedFile}
          style={{ marginTop: '20px' }} startIcon={<Upload />}
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            '&:hover': {
              backgroundColor: colors.greenAccent[500], // Change to a darker shade for hover
            }
          }}
        >
        <Typography sx={{color: colors.grey[100]}} variant="h7" >
        Upload
      </Typography>
      </Button>
      </label>
    </Container>
  );
};

export default CSVUploadPage;
