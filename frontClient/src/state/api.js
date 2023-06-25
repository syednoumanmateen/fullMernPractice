import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Products"]
        }),
        getCustomers: build.query({
            query: ({ role }) => ({
                url: `client/customers`,
                method: "GET",
                params: { role }
            }),
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ search }) => ({
                url: `client/transactions`,
                method: "GET",
                params: { search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => `client/geography`,
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => `sales`,
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: ({ role }) => ({
                url: `management/admins`,
                method: "GET",
                params: { role }
            }),
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: ({ month, year, date }) => ({
                url: `general/dashboard`,
                method: "GET",
                params: { month, year, date }
            }),
            providesTags: ["Dashboard"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
} = api;