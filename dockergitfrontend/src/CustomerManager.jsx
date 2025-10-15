import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import './CustomerManager.css';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
    gender: '',
    address: '',
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedCustomer, setFetchedCustomer] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/customerapi`;

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setCustomers(res.data);
    } catch {
      setMessage('Failed to fetch customers.');
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in customer) {
      if (!customer[key] || customer[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addCustomer = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, customer);
      setMessage('Customer added successfully.');
      fetchAllCustomers();
      resetForm();
    } catch {
      setMessage('Error adding customer.');
    }
  };

  const updateCustomer = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, customer);
      setMessage('Customer updated successfully.');
      fetchAllCustomers();
      resetForm();
    } catch {
      setMessage('Error updating customer.');
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllCustomers();
    } catch {
      setMessage('Error deleting customer.');
    }
  };

  const getCustomerById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedCustomer(res.data);
      setMessage('');
    } catch {
      setFetchedCustomer(null);
      setMessage('Customer not found.');
    }
  };

  const handleEdit = (cust) => {
    setCustomer(cust);
    setEditMode(true);
    setMessage(`Editing customer with ID ${cust.id}`);
  };

  const resetForm = () => {
    setCustomer({
      id: '',
      name: '',
      email: '',
      contact: '',
      gender: '',
      address: '',
    });
    setEditMode(false);
  };

  return (
    <Box className="customer-container">
      {message && (
        <Alert severity={message.toLowerCase().includes('error') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>Customer Management</Typography>

      <Box component={Paper} className="form-box">
        <Typography variant="h6">{editMode ? 'Edit Customer' : 'Add Customer'}</Typography>
        <Box className="form-grid">
          <TextField label="ID" name="id" type="number" value={customer.id} onChange={handleChange} />
          <TextField label="Name" name="name" value={customer.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={customer.email} onChange={handleChange} />
          <TextField label="Contact" name="contact" value={customer.contact} onChange={handleChange} />
          <FormControl>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={customer.gender} onChange={handleChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Address" name="address" value={customer.address} onChange={handleChange} />
        </Box>
        <Box className="btn-group">
          {!editMode ? (
            <Button variant="contained" color="primary" onClick={addCustomer}>Add Customer</Button>
          ) : (
            <>
              <Button variant="contained" color="success" onClick={updateCustomer}>Update</Button>
              <Button variant="outlined" onClick={resetForm}>Cancel</Button>
            </>
          )}
        </Box>
      </Box>

      <Box className="fetch-box">
        <Typography variant="h6">Get Customer By ID</Typography>
        <Box className="fetch-row">
          <TextField label="Enter ID" type="number" value={idToFetch} onChange={(e) => setIdToFetch(e.target.value)} />
          <Button variant="contained" onClick={getCustomerById}>Fetch</Button>
        </Box>
        {fetchedCustomer && (
          <Box className="fetch-result">
            <pre>{JSON.stringify(fetchedCustomer, null, 2)}</pre>
          </Box>
        )}
      </Box>

      <Box className="table-box">
        <Typography variant="h6">All Customers</Typography>
        {customers.length === 0 ? (
          <Typography>No customers found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(customer).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((cust) => (
                  <TableRow key={cust.id}>
                    {Object.keys(customer).map((key) => (
                      <TableCell key={key}>{cust[key]}</TableCell>
                    ))}
                    <TableCell>
                      <Button variant="contained" color="success" size="small" onClick={() => handleEdit(cust)} sx={{ mr: 1 }}>Edit</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteCustomer(cust.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default CustomerManager;
