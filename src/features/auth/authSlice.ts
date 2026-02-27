import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
    id?: number
    name?: string
    email: string
}
interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
}

const storeUser = localStorage.getItem("user")
const storeToken = localStorage.getItem("token")


const initialState: AuthState = {
    user: storeUser ? JSON.parse(storeUser) : null,
    token: storeToken,
    loading: false,
    error: null,
    isAuthenticated: !!storeToken
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credential: { email: string; password: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (credential.email === 'admin@gmail.com' && credential.password === 'admin@123') {
            return {
                user: { id: 1, email: credential.email, name: 'admin' },
                token: "fke-jwt-token"
            }
        } else {
            throw new Error("Invalid credentials")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true

                localStorage.setItem('user',JSON.stringify(action.payload.user))
                localStorage.setItem('token',action.payload.token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? null
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer