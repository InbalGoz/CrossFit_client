import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RecommendedLessons from "../components/RecommendedLessons";

const Home = () => {
  const [isAdmin, setAdmin] = useState(true);
console.log('here');
  return (
    <div>
      <Header isAdmin={isAdmin} />
      <RecommendedLessons />
    </div>
  );
};

export default Home;
