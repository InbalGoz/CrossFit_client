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
  Modal,
  TextField,
  Box,
} from "@mui/material";

//Redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllCustomers,
  verifyCustomer,
} from "../../store/actions/authActions";
import { createNotificationForAll } from "../../store/actions/notificationActions";
import { Customer } from "../../models/customer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomerTable: React.FC = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const allCustomers = useAppSelector((state) => state.customer.all_customers);
  
  //console.log({allCustomers});
  const cellStyle = { fontSize: "15pt" };

  //verify the customer
  const handleClick = (customer_id: any) => {
    dispatch(verifyCustomer(customer_id));
    alert("Customer has been verified");
  };

  const onChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleMessageForm = () => {
    setOpen(true);
  };

  const handleSend = () => {
    const newNotification = {
      title: "System Message",
      desc: message,
      isRead: false,
      createdAt: new Date(),
    };
    dispatch(createNotificationForAll(newNotification));
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const addRows = allCustomers.map((customer: Customer, index) => (
    <TableRow key={index}>
      <TableCell style={cellStyle}>{customer.id}</TableCell>
      <TableCell style={cellStyle}>{customer.fName}</TableCell>
      <TableCell style={cellStyle}>{customer.lName}</TableCell>
      <TableCell style={cellStyle}>{customer.phone}</TableCell>
      <TableCell style={cellStyle}>{customer.email}</TableCell>
      <TableCell>
        {!customer.isVerified ? (
          <Button variant='contained' onClick={() => handleClick(customer.id)}>
            verify
          </Button>
        ) : (
          "verified"
        )}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <div>
        <Typography
          component='h1'
          variant='h3'
          sx={{
            fontFamily: "Nunito",
            marginLeft: 30,
            marginTop: 10,
            marginBottom: 3,
            maxWidth: 300,
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
          <TableContainer sx={{ maxHeight: 600 }}>
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

          <Button sx={{ m: 2 }} variant='contained' onClick={handleMessageForm}>
            Send Message to all customers
          </Button>
        </Paper>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            Write a Message:
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='message'
            label='Message:'
            name='message'
            autoComplete='message'
            autoFocus
            onChange={onChange}
          />
          <Button onClick={handleSend}>Send</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerTable;
