import api from "./axios";

export const followUser = (id) => {
    return api.post(`/follow/${id}/follow`);
};

export const unfollowUser = (id) => {
    return api.delete(`/follow/${id}/unfollow`);
};

export const getFollowers = (id) => {
    return api.get(`/follow/${id}/followers`);
};

export const getFollowing = (id) => {
    return api.get(`/follow/${id}/following`);
};
