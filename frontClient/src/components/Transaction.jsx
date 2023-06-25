import React, { memo, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import moment from 'moment'

const Transaction = ({ isDashboard = false, data = [], isLoading = false, setSearch }) => {
    const theme = useTheme()

    const [searchInput, setSearchInput] = useState("");

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
            valueFormatter: params => moment(params?.value).format("DD-MMM-YYYY hh:mm A")
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length,
        },
        {
            field: "cost",
            headerName: "Cost($)",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];


    return (
        <>
            <Box mt={isDashboard ? "" : "40px"} sx={{
                height: isDashboard ? "500px" : "",
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
                <DataGrid loading={isLoading || !data} getRowId={(row) => row._id} rows={(data && data.transactions) || []} columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    components={isDashboard ? {} : { Toolbar: DataGridCustomToolbar }}
                    componentsProps={isDashboard ? {} : {
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </>
    )
}

export default memo(Transaction)
