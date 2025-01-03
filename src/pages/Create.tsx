import React, { useState } from 'react';
import {
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    age: 0,
    phoneNumber: '',
    address: '',
    profilePictureUrl: '',
    about: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      age: name === 'birthDate' ? calculateAge(value) : prevUser.age,
    }));
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('User data being sent:', user);

    try {
      const response = await axios.post('https://localhost:44351/api/createuser', user);
      console.log(response.data);
      setSnackbarMessage('User successfully added');
      setSnackbarOpen(true);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Failed to add user');
      setSnackbarOpen(true);
    }
  };

  const handleBackToLists = () => {
    navigate('/');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        <Typography color="text.primary">Add New User</Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: 'black',
                },
              },
            }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: 'black',
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <TextField
              label="Birth Date"
              name="birthDate"
              type="date"
              value={user.birthDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <TextField
              label="Age"
              name="age"
              value={user.age}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormLabel component="legend" sx={{ marginRight: 1, color: 'black' }}>Gender:</FormLabel>
            <RadioGroup
              name="gender"
              value={user.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel 
                value="Male" 
                control={<Radio sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />} 
                label="Male" 
              />
              <FormControlLabel 
                value="Female" 
                control={<Radio sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />} 
                label="Female" 
              />
            </RadioGroup>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Profile Picture URL"
            name="profilePictureUrl"
            value={user.profilePictureUrl}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: 'black',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Description"
            name="about"
            value={user.about}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: 'black',
                },
              },
            }}
          />
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          sx={{
            backgroundColor: '#ED1C24',
            color: 'white',
            '&:hover': {
              backgroundColor: '#d11920',
            },
            '&:focus': { outline: 'none' },
          }}
        >
          Submit
        </Button>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Create; 