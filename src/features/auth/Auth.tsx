import { useAppSelector, useAppDispatch } from "../../app/hook"
import { loginUser, logout } from "./authSlice"

export default function Auth() {

    const dispatch = useAppDispatch()
    const { loading, error, user, isAuthenticated } = useAppSelector(
        (state) => state.auth
    )

    const handelLogin = () => {
        dispatch(loginUser({ email: "admin@gmail.com", password: "admin@123" }))
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {isAuthenticated && <p>Welcome {user?.email}</p>}
            {!isAuthenticated && <button onClick={handelLogin}>Login</button>}
            {isAuthenticated && <button onClick={() => dispatch(logout())}>Logout</button>}
        </div>
    )
}