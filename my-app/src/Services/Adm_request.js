import api from "./api"

export const Login_ADM = async (user) => {
    console.log(user);
    const response = await api.post("/admin/login", user, { withCredentials: true });
    return response.data;
};

export const SignUp_ADM = async (user) => {
    const response = await api.post("/admin/signup", user, { withCredentials: true });
    console.log(response.data);
    return response.data;
};

export const RegisterEvent_ADM = async (event) => {
    const response = await api.post("/admin/register-event", event, { withCredentials: true });
    console.log("======QR CODE======");
    console.log(response.data);
    return response.data;
};

export const Logout_REQ = async () => {
    await api.get("/logout", { withCredentials: true });
    return
}

export const verifyAuthentic_REQ = async () => {
    const response = await api.get("/verify", { withCredentials: true });
    console.log(response);
    return response.data
}