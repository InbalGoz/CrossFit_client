import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const TopBarSign = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, fontFamily: "Nunito" }}
          >
            <Link to='/' style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Live To Travel
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default TopBarSign;
