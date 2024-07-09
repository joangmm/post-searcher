import axios from 'axios';

const fetchPosts = async () => {
  try {
    const dataLink = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.get(dataLink);
    return response.data;
  } catch (error) {
    console.error('We encountered an error fetching posts:', error);
    throw error;
  }
};

export default fetchPosts;
