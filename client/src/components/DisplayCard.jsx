import React from "react";
import { Box, Typography } from "@mui/material";

const DisplayCard = ({
    title,
    icon,
    width,
    height,
    children,
}) => {


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
                height: height || "260px", // Default height is 330px
                alignContent: "center",
                backgroundColor:"rgba(255,255,255,0.15)",
                boxShadow:"0 5px 32px 0 rgba(31,38,135,.37)", 
                backdropFilter:"blur(12px)", 
                borderRadius:"10px", // Default background color
                margin: "15px",
            }}
        >
            <Box display="flex" justifyContent="space-between">
                <Typography
                    variant="h6"
                    sx={{ color: "rgb(38, 38, 38)" }}
                    alignItems="center"
                    fontSize="16px"
                >
                    {title}
                </Typography>
                <div style={{fontSize:"18px"}}>{icon}</div>
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
