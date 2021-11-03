import api from "./api"

export const login_USER = async (_user) => {
    const response = await api.post("/user/login", _user);
    return response.data;
}

export const SignUp_USER = async (_user) => {
    const response = await api.post("/user/signup", _user);
    return response.data;
}

export const AddEvent_USER = async (_event) => {
    const event = { id: _event}
    const response = await api.post("/user/addEvent", event);
    console.log(response.data);
    return response.data;
}