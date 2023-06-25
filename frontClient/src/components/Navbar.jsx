import { ArrowDropDownOutlined, DarkModeOutlined, ExitToAppOutlined, LightModeOutlined, Menu as MenuIcon, PersonOutlineOutlined, Search, SettingsOutlined } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLogin, setMode } from 'state'
import Profile from '../assets/profile.jpeg'
import FlexBetween from './FlexBetween'
import { setLogin } from 'service/Common'

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl)

    const handleClick = (e) => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <AppBar sx={{ position: "sticky", top: "0px", background: "none", boxShadow: "none" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <FlexBetween>
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <MenuIcon />
                        </IconButton>

                        <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
                            <InputBase placeholder='Search...' />
                            <IconButton><Search /></IconButton>
                        </FlexBetween>
                    </FlexBetween>

                    <FlexBetween gap="1.5rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? <DarkModeOutlined sx={{ fontSize: "25px" }} /> : <LightModeOutlined sx={{ fontSize: "25px" }} />}
                        </IconButton>
                        <IconButton>
                            <SettingsOutlined />
                        </IconButton>

                        <FlexBetween>
                            <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem" }}>
                                <Box component="img" alt="profile" src={Profile} height="32px" width="32px" borderRadius="50%" sx={{ objectFit: "cover" }} />
                                <Box textAlign="left">
                                    <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                                        {user.name || "santhosh"}
                                    </Typography>
                                    <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                                        {user.occupation || "TECHNOLOGY"}
                                    </Typography>
                                </Box>
                                <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
                            </Button>
                            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        color: theme.palette.secondary[100],
                                        backgroundColor: theme.palette.background.alt
                                    },
                                    '& .MuiMenuItem-root': {
                                        backgroundColor: 'transparent',
                                        '&:active': {
                                            backgroundColor: theme.palette.secondary[600]
                                        }
                                    }
                                }}
                            >
                                <MenuItem><PersonOutlineOutlined sx={{ mr: "10px" }} />Profile</MenuItem>
                                <MenuItem><SettingsOutlined sx={{ mr: "10px" }} />Setting</MenuItem>
                                <MenuItem onClick={() => {
                                    setLogin({ isLogin: false })
                                    dispatch(setIsLogin())
                                }}><ExitToAppOutlined sx={{ mr: "10px" }} />Log Out</MenuItem>
                            </Menu>
                        </FlexBetween>
                    </FlexBetween>
                </Toolbar>
            </AppBar >
        </>
    )
}

export default memo(Navbar)
