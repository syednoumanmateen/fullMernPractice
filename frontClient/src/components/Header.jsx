import React, { memo } from 'react'
import Typography from '@mui/material/Typography'
import { Box, useTheme } from '@mui/material'

const Header = ({ title, subtitle }) => {
    const theme = useTheme()

    return (
        <>
            <Box>
                <Typography variant="h1" color={theme.palette.secondary[100]} fontWeight="bold" sx={{ mb: "5px" }}>{title}</Typography>
                <Typography variant="h5" color={theme.palette.secondary[300]}>{subtitle}</Typography>
            </Box>
        </>
    )
}

export default memo(Header)
