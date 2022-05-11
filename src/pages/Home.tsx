import { Button, Typography, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SocialFollow from "../components/SocialFollow";
import RecommendedLessons from "../components/RecommendedLessons";
import backgroundImage from "../assets/backGroundImage.jpeg";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { customerService } from "../services/customerService";
import { employeeService } from "../services/employeeService";
import { Customer } from "../models/customer";
import { Employee } from "../models/employee";

const root: Object = {
  minHeight: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
};

const Home = () => {
  const [isAdmin, setAdmin] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [employee, setEmployee] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { user, user_type } = useAppSelector((state) => state.auth);
  //const { customer } = useAppSelector((state) => state.customer);

  const getCustomer = async () => {
    console.log({ user });
    if (user) {
      const logedCustomer: Customer = await customerService.getById(user.id);
      console.log({ logedCustomer });
      setCustomer(logedCustomer || null);
    }
  };

  const getEmployee = async () => {
    console.log({ user });
    if (user) {
      const logedEmployee: Employee = await employeeService.getLoggedEmployee(
        user.id
      );
      // if (logedEmployee.isAdmin) {
      ///  setAdmin(true);
      //}
      setEmployee(logedEmployee || null);
    }
  };

  useEffect(() => {
    console.log("user_type", user_type);
    if (user && user_type === "customer") {
      getCustomer();
    } else {
      getEmployee();
    }
  }, []);

  console.log("here");
  return (
    <div style={root}>
      <Header />
      <Grid
        container
        spacing={20}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "60px",
            }}
          >
            <Typography
              variant='h3'
              component='h2'
              sx={{ color: "white", align: "center", fontFamily: "Nunito" }}
            >
              {(user_type == "customer" &&
                `Hello , ${customer?.fName} ${customer?.lName}`) ||
                (user_type == "employee" &&
                  `Hello , ${employee.fName} ${employee.lName}`)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <RecommendedLessons />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ position: "absolute", bottom: 1, marginBottom: 20 }}
        >
          <Box>
            <Typography
              variant='h3'
              component='h2'
              sx={{ color: "white", align: "center", fontFamily: "Nunito" }}
            >
              {(user_type == "customer" &&
                customer &&
                `Your subscription ends on: ${new Date(
                  customer.subEnd
                ).toLocaleString()}`) ||
                ""}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <SocialFollow />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
//`Your subscription ends on: ${new Date(
// customer.subEnd
// ).toLocaleString()}`
/*
sx={{
              display: "flex",
              flexDirection: "column",
              // marginBottom: "0px",
              //marginTop: 3,
              justifyContent: "center",
              alignItems: "center",
              //padding: "60px",
            }}
<Grid
        container
        spacing={20}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid item xs={12} md={5}>
          <Typography
            sx={{ mt: 6, mb: 2, fontFamily: 'Nunito' }}
            variant='h5'
            component='div'
          >
            Lessons types
          </Typography>

          <Button variant='contained' onClick={() => setOpenLessonType(true)}>
            Add Lesson Type
          </Button>

          <Demo>
            <List dense={dense}>{lessonsTypes}</List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography
            sx={{ mt: 6, mb: 2, fontFamily: 'Nunito' }}
            variant='h5'
            component='div'
          >
            Lessons
          </Typography>
          <Button variant='contained' onClick={() => setOpenLesson(true)}>
            Schedual a new Lesson
          </Button>
          <Demo>
            <List dense={dense}>{renderLessons}</List>
          </Demo>
        </Grid>
      </Grid>
*/
