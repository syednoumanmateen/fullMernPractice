import { DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import BreakdownChart from 'components/BreakdownChart'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import OverviewChart from 'components/OverviewChart'
import StatBox from 'components/StatBox'
import Transaction from 'components/Transaction'
import moment from 'moment'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useGetDashboardQuery } from 'state/api'

const Dashboard = () => {
    const theme = useTheme()
    const isNonMediumScreen = useMediaQuery("(min-width:1200px)")

    const [month, setMonth] = useState("November")
    const [year, setYear] = useState(2021)
    const [date, setDate] = useState("2021-11-15")

    const { data, isLoading } = useGetDashboardQuery({ month, year, date })

    const monthlySales = data?.thisMonthStats.reduce((a, i) => a += i.totalSales, 0)
    const dailySales = data?.thisTodayStats.reduce((a, i) => a += i.totalSales, 0)

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <FlexBetween>
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />


                    <Box textAlign="end">
                        <Button
                            sx={{
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.background.alt,
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mb: "0.5rem"
                            }}
                        >
                            <DownloadOutlined sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                        <DatePicker selected={new Date(date)} onChange={date => {
                            setDate(moment(date).format("YYYY-MM-DD"))
                            setMonth(moment(date).format("MMMM"))
                            setYear(moment(date).format("YYYY"))
                        }} />
                    </Box>
                </FlexBetween>

                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="160px"
                    gap="20px"
                    sx={{
                        "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
                    }}
                >
                    <StatBox
                        title="Total Customers"
                        value={data && data?.totalCustomers}
                        increase="+14%"
                        description="Since last month"
                        icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />} />
                    <StatBox
                        title="Sales Today"
                        value={data && dailySales}
                        increase="+21%"
                        description="Since last month"
                        icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />} />
                    <Box
                        gridColumn="span 8"
                        gridRow="span 2"
                        backgroundColor={theme.palette.background.alt}
                        p="1rem"
                        borderRadius="0.55rem"
                    >
                        <OverviewChart view="sales" isDashboard={true} />
                    </Box>

                    <StatBox
                        title="Monthly Sales"
                        value={data && monthlySales}
                        increase="+5%"
                        description="Since last month"
                        icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />} />

                    <StatBox
                        title="Yearly Sales"
                        value={data && data?.yearlySalesTotal}
                        increase="+43%"
                        description="Since last month"
                        icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />} />

                    <Box
                        gridColumn="span 8"
                        gridRow="span 3"
                        mb="1rem"
                    >
                        <Transaction data={data} isLoading={isLoading} isDashboard={true} />
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={theme.palette.background.alt}
                        p="1.5rem"
                        mb="1rem"
                        borderRadius="0.55rem"
                    >
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                            Sales By Category
                        </Typography>
                        <BreakdownChart isDashboard={true} />
                        <Typography
                            p="0 0.6rem"
                            fontSize="0.8rem"
                            sx={{ color: theme.palette.secondary[200] }}
                        >
                            Breakdown of real states and information via category for revenue
                            made for this year and total sales.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard
