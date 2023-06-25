import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import Loading from 'components/Loading'
import React, { useState } from 'react'
import { useGetProductsQuery } from 'state/api'

const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)
    const isMobile = useMediaQuery("(max-width:700px)")

    return (
        <Card sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            width: isMobile ? "120%" : "100%"
        }}>
            <CardContent>
                <Typography sx={{ fontSize: "14px" }} color={theme.palette.secondary[700]} gutterBottom>{category}</Typography>
                <Typography variant="h5" component="div">{name}</Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>${Number(price).toFixed(2)}</Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                {!isExpanded ? <Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
                    see More
                </Button> : <Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
                    see Less
                </Button>}
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                <CardContent>
                    <Typography>Id:{_id}</Typography>
                    <Typography>Supply Left:{supply}</Typography>
                    <Typography>Yearly Sales This Year:${stat?.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year:{stat?.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card >
    )
}

const Products = () => {
    const { data, isLoading } = useGetProductsQuery()
    const isNonMobile = useMediaQuery("(min-width:1000px)")
    const isNonTab = useMediaQuery("(min-width:1400px)")

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Header title="Products" subtitle="See your list of products" />
                {data || !isLoading ? (
                    <Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%"
                        sx={{ "&>div": { gridColumn: isNonMobile ? isNonTab ? undefined : "span 2" : "span 4" } }}>
                        {data.map(({ _id, name, description, price, rating, category, supply, productStats }) => (
                            <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={productStats} />
                        ))}
                    </Box>
                ) : (<Loading />)}
            </Box>
        </>
    )
}

export default Products
