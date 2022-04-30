import React, { Fragment, useState, useEffect } from "react";
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
} from "@mui/material";

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllCustomers,
  verifyCustomer,
} from "../../store/actions/authActions";

const CustomerTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const allCustomers = useAppSelector((state) => state.customer.all_customers);

  const cellStyle = { fontSize: "15pt" };

  //verify the customer
  const handleClick = (customer_id: any) => {
    dispatch(verifyCustomer(customer_id));
    alert("Customer has been verified");
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const addRows = allCustomers.map((customer: any, index) => (
    <TableRow key={index}>
      <TableCell style={cellStyle}>{customer.id}</TableCell>
      <TableCell style={cellStyle}>{customer.fName}</TableCell>
      <TableCell style={cellStyle}>{customer.lName}</TableCell>
      <TableCell style={cellStyle}>{customer.phone}</TableCell>
      <TableCell style={cellStyle}>{customer.email}</TableCell>
      <TableCell>
        <Button variant='contained' onClick={() => handleClick(customer.id)}>
          Confirm
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Typography
        component='h1'
        variant='h3'
        sx={{
          fontFamily: "Nunito",
          marginLeft: 30,
          marginTop: 10,
          marginBottom: 3,
        }}
      >
        Customers
      </Typography>
      <Paper
        sx={{
          overflow: "hidden",
          marginLeft: 30,
          maxWidth: "70%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer sx={{ maxHeight: 700 }}>
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
