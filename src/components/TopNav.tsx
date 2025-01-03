import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function TopNav() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#ED1C24',
        mb: 3,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            disableRipple
            sx={{ 
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            List
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav; 