import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Divider, Grid, Card, CardContent, CardMedia } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  userId: number;
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  age: number;
  createdAt?: string;
  phoneNumber: string;
  address: string;
  profilePictureUrl: string;
  about: string;
}

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleBackToLists = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:44351/api/getuserbyid/${id}`);
        setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          User Profiles
        </Typography>
        <Button
          onClick={handleBackToLists}
          startIcon={<ArrowBackIcon />}
          sx={{ 
            textTransform: 'none', 
            color: 'text.primary', 
            ml: 2,
            '&:hover': { backgroundColor: 'transparent' },
            '&:focus': { outline: 'none' },
          }} 
          disableRipple
        >
          Back to Lists
        </Button>
      </Box>
      
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link 
          color="inherit" 
          href="#"
          sx={{ 
            textDecoration: 'none',
            color: 'text.primary',
          }}
        >
          User Profiles
        </Link>
        <Typography color="text.primary">View Profile</Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 3 }} />

      
      <div>
        {userProfile ? (
          <div>
            <Card>
                <Box sx = {{paddingLeft: 5, paddingTop: 5, display: 'flex', alignItems: 'center'}}>
                    <img src={userProfile.profilePictureUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />
                    <Box sx={{display: 'block', marginLeft: 5}}>
                        <Typography variant="h5">{userProfile.name}</Typography>
                        <Typography variant="body1">"{userProfile.about}"</Typography>
                    </Box>
                </Box>
                <Box sx={{padding: 5}}>
                    <Typography variant="body1">Email: {userProfile.email}</Typography>
                    <Typography variant="body1">Gender: {userProfile.gender}</Typography>
                    <Typography variant="body1">Birth Date: {userProfile.birthDate}</Typography>
                    <Typography variant="body1">Age: {userProfile.age}</Typography>
                    <Typography variant="body1">Phone Number: {userProfile.phoneNumber}</Typography>
                    <Typography variant="body1">Address: {userProfile.address}</Typography>
                    <Typography variant="body1">Created At: {userProfile.createdAt}</Typography>
                </Box>
                </Card>
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </div>
    </div>
  );
};

export default View; 