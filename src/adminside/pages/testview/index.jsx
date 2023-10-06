import { Box } from "@mui/material";
import React from "react";

const TestView = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(12, 7.3vh)"
      gridAutoRows="200px"
      // gridAutoRows="5em"
      //   gap="20px"
      gap="10px"
    >
      <Box
        gridColumn="span 3"
        gridRow='span 2'
        backgroundColor='black'
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    </Box>
  );
};

export default TestView;
