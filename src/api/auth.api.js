import api from "./axios";

export const registerUser = (user) => {
    return api.post("/auth/register", user);
}
export const loginUser = (user) => {
    return api.post("/auth/login", user);
}
export const logoutUser = () => {
    return api.post("/auth/logout");
}



