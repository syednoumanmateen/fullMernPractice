import { createSlice } from "@reduxjs/toolkit";
import { getIsLogin } from "service/Common";

const initialState = {
    mode: "dark",
    isLogin: false,
    path: "http://localhost:5000",
    user: {
        id: "63701cc1f03239b7f700000e",
        role: "user"
    }
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : "light"
        },
        setIsLogin: (state) => {
            state.isLogin = getIsLogin()
        },
        setUser: (state, action) => {
            state.user.id = action?.payload?.id
            state.user.role = action?.payload?.role
        }
    }
})

export const { setMode, setUser, setIsLogin } = globalSlice.actions;

export default globalSlice.reducer