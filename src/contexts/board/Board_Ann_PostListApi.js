import axios from "axios";
import store from "../../redux/Store";

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const getAnnPosts = async (page = 1, searchTerm = "") => {
  try {
    const response = await axios.get(`${SpringbaseUrl}/board/annboardlist`, {
      params: {
        page,
        search: searchTerm,
        category_no: 2, // Announcements 카테고리 번호
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Announcement posts:", error);
    throw error;
  }
};
