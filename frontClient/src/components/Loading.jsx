import { Box } from '@mui/material'
import React, { memo } from 'react'

const Loading = () => {
    return (
        <>
            <Box fontSize="16px" fontWeight="700" textAlign="center" >
                Loading...
            </Box>
        </>
    )
}

export default memo(Loading)
