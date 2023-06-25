import React,{ memo } from "react"
const { useTheme, Typography } = require("@mui/material")

const Role = ({ role }) => {
    const theme = useTheme()
    const color = {
        backgroundColor: role === 'user' ? theme.palette.grey[700] : role === 'admin' ? theme.palette.secondary[700] : theme.palette.primary[700],
        padding: '5px 10px',
        borderRadius: "10px"
    }
    return <Typography sx={color}>{role}</Typography>
}

export default memo(Role)