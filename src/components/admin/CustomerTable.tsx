import React, { Fragment, useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

//redux
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllCustomers } from '../../store/actions/authActions';
import { customerSlice } from '../../store/slices/customerSlice';

const CustomerTable = () => {
  //const [coustomers, setCustomers] = useState([]);
 // const [isDisabled , setIsDisabled] = useState(false)

  const dispatch = useAppDispatch();
  const allCustomers = useAppSelector((state) => state.customer.all_customers);

  const cellStyle = { fontSize: '15pt' };

  const handleClick = (temp_customer: any) =>{

    const newCustomer = {
      id: temp_customer.id,
      fName: temp_customer.fName,
      lName: temp_customer.lName,
      email: temp_customer.email,
      password: temp_customer.password,
      phone: temp_customer.phone,
      birthday: temp_customer.birthday,
      subStart: temp_customer.subStart,
      subEnd: temp_customer.subEnd,
     //isAdmin: boolean,
     isVerified: true,
    }

    console.log("newCustomer" , newCustomer)
    dispatch(customerSlice.actions.setCustomer(newCustomer));
  };

  

  useEffect(() => {
    dispatch(getAllCustomers());
    /*const fetchCustomers = () => {
      const newAllCustomers: any = allCustomers.filter(
        (customer) => customer.isVerified === false
      );
      setCustomers(newAllCustomers);
    };
    fetchCustomers();*/
  }, [dispatch , allCustomers]);

  // const submitStyle = {backgroundColor:'rgba(0, 102, 255,0.8)', fontSize:'20px'}
  /*
   {
            (customer.isVerified === false && <Button onClick={() => handleClick(customer)}>Panding</Button> ) ||
           (customer.isVerified === true && <Button onClick={() => handleClick(customer)}>Confirmed</Button>)
          }
  */


  const addRows = allCustomers.map((customer: any , index) => (
    <TableRow key={index}>
      <TableCell style={cellStyle}>{customer.id}</TableCell>
      <TableCell style={cellStyle}>{customer.fName}</TableCell>
      <TableCell style={cellStyle}>{customer.lName}</TableCell>
      <TableCell style={cellStyle}>{customer.phone}</TableCell>
      <TableCell style={cellStyle}>{customer.email}</TableCell>
      <TableCell>
        
         {(customer.isVerified === false && <Button onClick={() => handleClick(customer)}>Panding</Button> )}
        
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Typography
        component='h1'
        variant='h3'
        sx={{ fontFamily: 'Nunito', marginLeft: 30, marginTop: 10 }}
      >
        Customers
      </Typography>
      <Paper
        sx={{
          overflow: 'hidden',
          marginLeft: 30,
          maxWidth: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>Student Number</TableCell>
                <TableCell style={cellStyle}>First Name</TableCell>
                <TableCell style={cellStyle}>Last Name</TableCell>
                <TableCell style={cellStyle}>Phone</TableCell>
                <TableCell style={cellStyle}>Email</TableCell>
                <TableCell style={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Fragment>{addRows}</Fragment>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CustomerTable;

/*
{studentData && studentData.map((student , index) => (
                  <StudentRow key={index} student={student} index={studentData.indexOf(student) + 1} handleDelete={handleDelete}/>  
               ))}*/
