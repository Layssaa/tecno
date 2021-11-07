import React, { useEffect, useState } from "react";
import { Login_ADM, Logout_REQ, RegisterEvent_ADM, verifyAuthentic_REQ } from "../Services/Adm_request";
import { AddEvent_USER, login_USER, SignUp_USER } from "../Services/User_request";


export const MyContext = React.createContext({
});

export function MyProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [authentic, setAuthentic] = useState(false);

    // ------------------------- Login -------------------------
    const handleLogin = async (values) => {

        const response = await Login_ADM(values);

        setEvents(response.events);
        setAuthentic(true);
    }

    const handleLoginUser = async (values) => {

        const response = await login_USER(values);
        console.log(response);
        setEvents(response.events);

    }

    const doLogout = async () => {
        await Logout_REQ()
    }

    const verifyAuthentic =async () => {
        const response =await verifyAuthentic_REQ();
        console.log("verificando cookie");
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
                authentic,

                handleLogin,
                handleLoginUser,
                doLogout,
                verifyAuthentic,

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