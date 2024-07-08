import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeComponent1 from "./Table";
import DepartmentList from "./DepartmentList";

const SecondPage: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails.name || !userDetails.phone || !userDetails.email) {
      const params = new URLSearchParams({
        message: "First fill in this form before accessing the page",
      }).toString();
      navigate(`/?${params}`);
    }
  }, [userDetails, navigate]);

  return (
    <Container>
      <HomeComponent1 />
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
