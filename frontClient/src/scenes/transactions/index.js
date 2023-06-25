import { Box } from '@mui/material'
import Header from 'components/Header'
import Transaction from 'components/Transaction'
import { useState } from 'react'
import { useGetTransactionsQuery } from 'state/api'

const Transactions = () => {
    const [search, setSearch] = useState("")

    const { data, isLoading } = useGetTransactionsQuery({ search });

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Header title="Transactions" subtitle="enter list of Transactions" />
                <Transaction data={data} isLoading={isLoading} setSearch={setSearch} />
            </Box>
        </>
    )
}

export default Transactions
