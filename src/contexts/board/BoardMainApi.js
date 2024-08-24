import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const fetchPosts = async () => {
  try {
    const [announcementsResponse, communityPostsResponse] = await Promise.all([
      axios.get(`${SpringbaseUrl}/board/announcements6`),
      axios.get(`${SpringbaseUrl}/board/community6`)
    ]);
    console.log(communityPostsResponse.data.data);
    return {
      announcements: announcementsResponse.data.data,
      communityPosts: communityPostsResponse.data.data
    };
  } catch (error) {
    throw new Error('Error fetching posts: ' + error.message);
  }
};
