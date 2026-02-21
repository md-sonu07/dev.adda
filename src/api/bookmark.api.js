import api from "./axios";

export const toggleBookmark = (postId) => {
    return api.post(`/bookmarks/${postId}`);
};

export const getMyBookmarks = () => {
    return api.get("/bookmarks/my-bookmarks");
};
