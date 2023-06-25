import { Search } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'
import React, { memo } from 'react'
import FlexBetween from './FlexBetween'

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch, setRole, role, type = false }) => {
    const theme = useTheme()

    return (
        <>
            <GridToolbarContainer>
                <FlexBetween width="100%">
                    <FlexBetween>
                    </FlexBetween>
                    {!type ?
                        <TextField
                            label="Search..."
                            sx={{ mb: "0.5rem", width: "15rem" }}
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setSearch(searchInput);
                                                setSearchInput("");
                                            }}
                                        >
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        /> :
                        <>
                            <FormControl sx={{ m: "0.5rem" }}>
                                <InputLabel>Roles</InputLabel>
                                <Select
                                    label="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                    sx={{ color: theme.palette.secondary[100], width: "20ch" }}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="superadmin">Super Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </>}
                </FlexBetween>
            </GridToolbarContainer>
        </>
    )
}

export default memo(DataGridCustomToolbar)
