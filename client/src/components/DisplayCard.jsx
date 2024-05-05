import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const DisplayCard = ({
    title,
    icon,
    width,
    height,
    backgroundColor,
    children,
}) => {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gridRow="span 6"
            borderRadius="1rem"
            p="1rem 1rem"
            sx={{
                border: "0.5px solid black",
                width: width || "330px", // Default width is 330px
                height: height || "330px", // Default height is 330px
                alignContent: "center",
                backgroundColor:"rgba(255,255,255,0.2)",
                boxShadow:"0 5px 32px 0 rgba(31,38,135,.37)", 
                backdropFilter:"blur(10px)", 
                borderRadius:"10px", // Default background color
                margin: "15px",
            }}
        >
            <Box display="flex" justifyContent="space-between">
                <Typography
                    variant="h6"
                    mb="1rem"
                    sx={{ color: theme.palette.fontcustomcolor.default }}
                    alignItems="center"
                    fontSize="20px"
                >
                    {title}
                </Typography>
                {icon}
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gridColumn="span 4"
                gridRow="span 6"
                borderRadius="0.5rem"
                sx={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DisplayCard;

/* with white background */
// sx={{
//     border: "0.5px solid black",
//     width: width || "330px",
//     height: height || "330px",
//     alignContent: "center",
//     backgroundColor: backgroundColor || theme.palette.background.default,
//     margin: "15px",
// }}