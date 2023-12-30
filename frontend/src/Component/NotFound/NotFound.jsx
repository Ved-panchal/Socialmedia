import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline  style={{color:"white"}}/>
        <Typography variant="h2" style={{ padding: "2vmax",color:"var(--socials-text-light)" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography style={{color:"white", backgroundColor:"var(--socials-secondary)",padding:".5rem 1rem",borderRadius:"9px"}} variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;