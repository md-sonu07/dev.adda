import api from "./axios";

export const userProfile = () => {
    return api.get("/user/profile");
}
export const getAllUsers = () => {
    return api.get("/user/get-all-users");
}