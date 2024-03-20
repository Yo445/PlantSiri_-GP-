import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Gridbox = ({ title, value, icon }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.white}
      borderRadius="0.5rem"
      sx={{ border: `1px solid ${theme.palette.bordercolor.default}` }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h6"
          mb="1rem"
          sx={{ color: theme.palette.fontcustomcolor.defaul , width:"700px"}}
          alignItems="center"
          fontSize="25px"
        >
          {title}
        </Typography>
        {React.cloneElement(icon, {
          fontSize: "large", // Adjust the font size of the icon
        })}
      </Box>

      <Typography
        variant="h1"
        mb="1rem"
        fontWeight="600"
        sx={{ color: theme.palette.fontcustomcolor.second }}
        textAlign="center"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default Gridbox;
