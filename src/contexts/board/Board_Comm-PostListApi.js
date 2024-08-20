import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const getPosts = async (page = 1, searchTerm = '') => {
  try {
    const response = await axios.get(`${SpringbaseUrl}/board/freeboardlist`, {
      params: {
        page,
        search: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

