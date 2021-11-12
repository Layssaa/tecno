import api from "./api"

export const Login_ADM = async (user) => {
    try {
        const { data } = await api.post("/admin/login", user, { withCredentials: true });
        const authentic = true;
        return { data, authentic };
    } catch (error) {
        const authentic = false;
        return { authentic }
    }
};

export const SignUp_ADM = async (user) => {
    try {
        const { data } = await api.post("/admin/signup", user, { withCredentials: true });
        const authentic = true;
        console.log("============ SIGN UP =============");
        return { authentic };

    } catch (error) {
        const authentic = false;
        return { authentic }
    }

};

export const RegisterEvent_ADM = async (event) => {
    const response = await api.post("/admin/register-event", event, { withCredentials: true });
    console.log("======QR CODE======");
    console.log(response.data);
    return response.data;
};

export const Logout_REQ = async () => {
    const response = await api.get("/logout",{}, { withCredentials: true });
    console.log("==========REQ LOGOUT==========");
    console.log(response);
    return
}

export const verifyAuthentic_REQ = async () => {
    try {
        const { data } = await api.get("/verify", { withCredentials: true });
        console.log("DADOS RECEBIDOS");
        console.log(data);
        const authenticed = true;
        return { authenticed }
    } catch (error) {
        const authenticed = false;
        return { authenticed }
    }

}