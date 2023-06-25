import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import Header from 'components/Header'
import Role from 'components/Role'
import { useState } from 'react'
import { useGetCustomersQuery } from 'state/api'

const Customers = () => {
    const theme = useTheme()
    const [role, setRole] = useState("user")

    const { data, isLoading } = useGetCustomersQuery({ role: role === 'all' ? "" : role })
    const type = true

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        }, {
            field: "name",
            headerName: "Name",
            flex: 0.5
        }, {
            field: "email",
            headerName: "Email",
            flex: 1
        }, {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: params => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        }, {
            field: "country",
            headerName: "Country",
            flex: 0.4
        }, {
            field: "occupation",
            headerName: "Occupation",
            flex: 1
        }, {
            field: "role",
            headerName: "Role",
            flex: 0.5,
            renderCell: params => <Role role={params.value} />
        }
    ]

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Header title="Customers" subtitle="See your list of customers" />
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
                    <DataGrid loading={isLoading || !data} getRowId={(row) => row._id} rows={data || []} columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            }
                        }}
                        components={{ Toolbar: DataGridCustomToolbar }}
                        componentsProps={{
                            toolbar: { type, role, setRole },
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Customers
