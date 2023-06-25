
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useGetUserPerformanceQuery } from 'state/api'

const Performance = () => {
    const theme = useTheme()
    const userId = useSelector(state => state.global.user.id)
    const { data, isLoading } = useGetUserPerformanceQuery(userId)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        }, {
            field: "userId",
            headerName: "User ID",
            flex: 1
        }, {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
            valueFormatter: params => moment(params?.value).format("DD-MMM-YYYY hh:mm A")
        }, {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: params => params.value.length
        }, {
            field: "cost",
            headerName: "Cost($)",
            flex: 1,
            renderCell: params => `$${Number(params.value).toFixed(2)}`
        }
    ]

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Header title="Performance" subtitle="See your list of Affiliate Sales Performance" />
                <Box mt="40px" sx={{
                    "$  .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}>
                    <DataGrid loading={isLoading || !data?.sales} getRowId={(row) => row._id} rows={data?.sales || []} columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            }
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Performance
