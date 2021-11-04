import React, { useEffect, useState } from "react";
import { Login_ADM, RegisterEvent_ADM } from "../Services/Adm_request";
import { AddEvent_USER, login_USER, SignUp_USER } from "../Services/User_request";


export const MyContext = React.createContext({
    id: null,
    user: null,
    moviesOnCart: [],
    moviesOnWishList: [],
    moviesOnHistory: []
});

export function MyProvider({ children }) {
    const [events, setEvents] = useState([]);
    

    // ------------------------- Login -------------------------
    const handleLogin = async (values) => {

        const response = await Login_ADM(values);
        console.log(response);
        setEvents(response.events);

    }

    const handleLoginUser = async (values) => {

        const response = await login_USER(values);
        console.log(response);
        setEvents(response.events);

    }

    // ------------------------- Logout -------------------------
    // const handleLogout = async () => {
    //     setUser(0);

    //     setAuthenticated(false);

    //     setMovieOnCart([]);
    //     setWishList([]);
    //     setMovieOnHistory([]);
    //     setLoading([]);
    //     setUser([]);
    //     setLoading(false);

    //     localStorage.clear();

    // }

    // ------------------------- Sign Up -------------------------
    const handleSignUp = async (values) => {
    }

    const handleRegisterEvent = async (_event) => {
        const response = await RegisterEvent_ADM(_event);
        setEvents(prevState => prevState.concat(_event));
    }

    const handleSignupUser = async (_user) => {
        const response = await SignUp_USER(_user);
    }

    const handleAddEvent = async (idEvent) => {
        console.log("========= ID EVENT ==========");
        console.log(idEvent);
        const response = await AddEvent_USER(idEvent);
        return response;
    }

    return (
        <MyContext.Provider
            value={{
                user: null,

                handleLogin,
                handleLoginUser,

                handleSignUp,
                handleRegisterEvent,

                handleSignupUser,

                handleAddEvent,

                events
            }}
        >
            {children}
        </MyContext.Provider>
    );
};