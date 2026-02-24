import api from "./axios";

export const getTags = () => {
    return api.get("/tags");
}

export const createTag = (tagData) => {
    return api.post("/tags", tagData);
}

export const deleteTag = (id) => {
    return api.delete(`/tags/${id}`);
}
