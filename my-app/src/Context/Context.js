import React, { useEffect, useState } from "react";
import { Login_ADM, Logout_REQ, RegisterEvent_ADM, SignUp_ADM, verifyAuthentic_REQ } from "../Services/Adm_request";
import { AddEvent_USER, login_USER, SignUp_USER } from "../Services/User_request";


export const MyContext = React.createContext({
});

export function MyProvider({ children }) {
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events") || "[]"));
    const [authentic, setAuthentic] = useState(false);
    const [authenticInLocalStorage, setAuthenticInLocalStorage] = useState(JSON.parse(localStorage.getItem("authentic") || false));

    useEffect(() => {
        localStorage.setItem("authentic", true);

        console.log("Recebido da requisição")
        console.log(authentic)

        console.log("Pego do LocalStorage")
        console.log(authenticInLocalStorage)

    }, [authentic]);

    useEffect(() => {
        console.log("====== EVENTS INSERT =======");
        console.log(events);

        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    // ------------------------- Login -------------------------
    const handleLogin = async (values) => {

        const { data, authentic } = await Login_ADM(values);

        setAuthentic(authentic);
        setEvents(data.events);

        return authentic
    }

    const handleLoginUser = async (values) => {

        const { data, authentic } = await login_USER(values);
        console.log("==========AUTHENTIC LOGIN USER==========");
        console.log(authentic);

        if (authentic) {
            // localStorage.setItem("events", events);
            setEvents(data.events);
            setAuthentic(authentic);
            return { authentic }
        }
        return authentic
    }

    const doLogout = async () => {
        await Logout_REQ();
        setAuthentic(false);
    }

    const verifyAuthentic = async () => {
        const { authenticed } = await verifyAuthentic_REQ();
        console.log("verificando cookie");
        console.log(authenticed);
        setAuthentic(authenticed);
        return
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
    const handleSignUpAdm = async (values) => {
        const { data, authentic } = await SignUp_ADM(values);
        if (authentic) {
            setEvents(data.events);
            setAuthentic(authentic);
        }

        return authentic
    }

    const handleRegisterEvent = async (_event) => {
        const response = await RegisterEvent_ADM(_event);
        setEvents(prevState => prevState.concat(_event));
    }

    const handleSignupUser = async (_user) => {
        const { data, authentic } = await SignUp_USER(_user);
        if (authentic) {
            setEvents(data.events);
            setAuthentic(authentic);
        }
        return authentic
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
                authenticInLocalStorage,

                handleLogin,
                handleLoginUser,
                doLogout,
                verifyAuthentic,
                setAuthentic,

                handleSignUpAdm,
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