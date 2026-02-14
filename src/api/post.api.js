import api from "./axios";

export const createPost = (postData) => {
    return api.post("/posts/articles", postData);
}

export const getPosts = () => {
    return api.get("/posts/articles");
}

export const getMyPosts = () => {
    return api.get("/posts/my-articles");
}

export const getPostById = (id) => {
    return api.get(`/posts/articles/${id}`);
}

export const updatePost = (id, postData) => {
    return api.put(`/posts/articles/${id}`, postData);
}

export const deletePost = (id) => {
    return api.delete(`/posts/articles/${id}`);
}

export const updatePostStatus = (id, status) => {
    return api.put(`/posts/articles/${id}/status`, { status });
}