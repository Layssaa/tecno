import api from "./api"

export const login_USER = async (_user) => {
    try {
        const { data } = await api.post("/user/login", _user);
        const authentic = true;
        return { data, authentic };

    } catch (error) {
        const authentic = false;
        return { authentic }
    }

}

export const SignUp_USER = async (_user) => {
    try {
        const { data } = await api.post("/user/signup", _user);
        const authentic = true;
        return { data, authentic }
    } catch (error) {
        const authentic = false;
        return { authentic }

    }

}

export const AddEvent_USER = async (_event) => {
    const event = { id: _event }
    console.log("FAZENDO REQ")
    const response = await api.post("/user/addEvent", event);
    console.log("RESPOSTA");
    console.log(response.data);
    return response.data;
}