import api from "./axios";

export const toggleLike = (postId) => {
    return api.post(`/likes/${postId}`);
};

export const getPostLikes = (postId) => {
    return api.get(`/likes/${postId}`);
};
