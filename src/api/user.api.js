import api from "./axios";

export const userProfile = () => {
    return api.get("/user/profile");
}
export const getAllUsers = () => {
    return api.get("/user/get-all-users");
}
export const updateProfile = (userData) => {
    return api.patch("/user/profile", userData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export const updateUserRole = (userId, role) => {
    return api.patch(`/user/${userId}/role`, { role });
}
export const deleteUser = (userId) => {
    return api.delete(`/user/${userId}`);
}

export const getUserById = (id) => {
    return api.get(`/user/${id}`);
}