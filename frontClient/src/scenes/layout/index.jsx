import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { setIsLogin } from 'state'
import { useGetUserQuery } from 'state/api'

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    let location = useLocation()

    const dispatch = useDispatch()
    dispatch(setIsLogin())

    const userId = useSelector(state => state.global.user.id)
    const isLogin = useSelector(state => state.global.isLogin)

    const { data } = useGetUserQuery(userId)

    return (
        <>
            <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
                {isLogin ?
                    <>
                        <Sidebar user={data || {}} isNonMobile={isNonMobile} drawerWidth="250px" isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                        <Box flexGrow={1}>
                            <Navbar user={data || {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                            <Outlet />
                        </Box>
                    </> : <Navigate to="/login" state={{ from: location }} replace />}
            </Box>
        </>
    )
}

export default Layout
