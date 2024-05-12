import React from 'react';
import { Typography } from '@mui/material';

const PageNotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3">Page Not Found</Typography>
      <Typography variant="body1">The requested page could not be found.</Typography>
    </div>
  );
};

export default PageNotFound;
