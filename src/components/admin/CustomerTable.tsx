import React,{Fragment} from 'react';
import { Typography, Button, Paper , Table , TableBody , TableCell , TableContainer, TableHead , TableRow} from '@mui/material';

const CustomerTable = () => {

  const cellStyle={fontSize:'15pt'}

  // const submitStyle = {backgroundColor:'rgba(0, 102, 255,0.8)', fontSize:'20px'}

   const addRows = (
      <TableRow>
        <TableCell style={cellStyle}>1</TableCell>
        <TableCell style={cellStyle}>Inbal</TableCell>
        <TableCell style={cellStyle}>{"Gozland"}</TableCell>
        <TableCell style={cellStyle}>{"0501234567"}</TableCell>
        <TableCell style={cellStyle}>{"email"}</TableCell>
        <TableCell>
         <Button>
          Pending
         </Button>
        </TableCell>
      </TableRow>
   ); 

  
  return (
    <div >
      <Typography component="h1" variant="h3" sx={{fontFamily:'Nunito', marginLeft:30, marginTop:10}}>
            Customers
      </Typography>
    <Paper  sx={{ overflow: 'hidden' ,marginLeft:30, maxWidth:'70%', alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
    
     <TableContainer  sx={{ maxHeight: 480 }}>
       <Table stickyHeader aria-label="sticky table" >
         <TableHead>
            <TableRow >
               <TableCell style={cellStyle}>Student Number</TableCell>
               <TableCell style={cellStyle}>First Name</TableCell>
               <TableCell style={cellStyle}>Last Name</TableCell>
               <TableCell style={cellStyle}>Phone</TableCell>
               <TableCell style={cellStyle}>Email</TableCell>
               <TableCell style={cellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             <Fragment>
               {addRows}
             </Fragment>
          </TableBody>
        </Table>
     </TableContainer>
  </Paper>
  </div>
  )
}

export default CustomerTable;

/*
{studentData && studentData.map((student , index) => (
                  <StudentRow key={index} student={student} index={studentData.indexOf(student) + 1} handleDelete={handleDelete}/>  
               ))}*/