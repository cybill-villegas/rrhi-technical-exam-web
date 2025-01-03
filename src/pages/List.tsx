import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Breadcrumbs,
  Link,
  Divider,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const StyledButton = styled(Button)({
  backgroundColor: '#ED1C24',
  '&:hover': {
    backgroundColor: '#d11920',
  },
});

const StyledMenuItem = styled(MenuItem)({
  '&:hover': {
    backgroundColor: '#d11920',
    color: 'white',
  },
});

interface User {
  userId: number;
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  age: number;
  createdAt: string;
  phoneNumber: string;
  address: string;
  profilePictureUrl: string;
  about: string;
}

interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

interface ApiResponse {
  users: User[];
  pagination: Pagination;
}

function List() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = React.useState(1); 
  const [rowsPerPage, setRowsPerPage] = React.useState(10); 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    fetchUsers(page, rowsPerPage); 
  }, [page, rowsPerPage]); 

  const fetchUsers = async (pageNumber: number, pageSize: number) => {
    try {
      const response = await axios.get(`https://localhost:44351/api/getallusers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      setUsers(response.data.users); 
      setTotalCount(response.data.pagination.totalCount); 
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleAction = (action: string) => {
    if (selectedUser) {
      switch (action) {
        case 'view':
          navigate(`/view/${selectedUser.userId}`);
          break;
        case 'update':
          navigate(`/update/${selectedUser.userId}`);
          break;
        case 'delete':
          handleDeleteClick(selectedUser);
          break;
      }
    }
    handleClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); 
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user); 
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`https://localhost:44351/api/deleteuser/${selectedUser.userId}`);
        fetchUsers(page, rowsPerPage);
        setSnackbarMessage(`${selectedUser.name}'s profile has been deleted.`); 
        setSnackbarOpen(true); 
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
    handleClose();
    handleCloseDialog();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        User Profiles
      </Typography>
      
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
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
        >
          Add New User
        </StyledButton>
      </Box>

      <Card sx={{ 
        minWidth: 275,
        boxShadow: 3,
        borderRadius: 2,
        mb: 3 
      }}>
        <CardContent sx={{ 
          p: 0,
          '&:last-child': {
            pb: 0
          }
        }}>
          <Typography variant="h5" component="div" sx={{ mb: 0 }}>
          </Typography>
          <TableContainer>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Name</TableCell>
                      <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Email</TableCell>
                      <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Birthday</TableCell>
                      <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Age</TableCell>
                      <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Created At</TableCell>
                      <TableCell align="right" sx={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.userId}
                        sx={{
                          '&:nth-of-type(odd)': { backgroundColor: '#fff' },
                          '&:nth-of-type(even)': { backgroundColor: '#ffeaea' },
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell size="small">{user.name}</TableCell>
                        <TableCell size="small">{user.email}</TableCell>
                        <TableCell size="small">{new Date(user.birthDate).toLocaleDateString()}</TableCell>
                        <TableCell size="small">{user.age}</TableCell>
                        <TableCell size="small">{new Date(user.createdAt).toLocaleString()}</TableCell>
                        <TableCell size="small" align="right">
                          <IconButton
                            aria-label="more"
                            id={`long-button-${user.userId}`}
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, user)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </TableContainer>
        </CardContent>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => handleAction('view')}>View</StyledMenuItem>
          <StyledMenuItem onClick={() => handleAction('update')}>Update</StyledMenuItem>
          <StyledMenuItem onClick={() => handleAction('delete')}>Delete</StyledMenuItem>
        </Menu>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete {selectedUser?.name}'s profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default List; 