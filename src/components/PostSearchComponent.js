import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import PostTable from './PostTable';
import '../styles/PostSearchComponent.css';

const PostSearchComponent = () => {
  const [orderBy, setOrderBy] = useState('userId');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputWarning, setInputWarning] = useState(true); //warning variable for minimum characters (3)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setAllPosts(response.data);
        setFilteredPosts(response.data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.length >= 3) {
      setInputWarning(false);
      const filteredResults = allPosts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.body.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // we filter by title AND body

      setFilteredPosts(filteredResults);
    } else {
      setInputWarning(true);
      setFilteredPosts([]);
    }
  };

  const handleSortBy = (orderByType) => {
    let sortedPosts = [...filteredPosts];

    if (orderByType === 'title') {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (orderByType === 'userId') {
      sortedPosts.sort((a, b) => a.userId - b.userId);
    }

    setOrderBy(orderByType);
    setFilteredPosts(sortedPosts);
  };

  const handlePostClick = (title, body) => {
    console.log(`Título del post seleccionado: ${title}`);
    console.log(`Contenido del post: ${body}`);
  };

  return (
    <div className='wrapper'>
      <SearchForm
        searchTerm={searchTerm}
        onSearchChange={handleInputChange}
        inputWarning={inputWarning}
        orderBy={orderBy}
        onSortBy={handleSortBy}
      />
      {!loading && searchTerm.length >= 3 && filteredPosts.length > 0 && (
        <PostTable posts={filteredPosts} onPostClick={handlePostClick} />
      )}
      {!loading && searchTerm.length >= 3 && filteredPosts.length === 0 && (
        <p>No se encontraron posts con estos carácteres.</p>
      )}
    </div>
  );
};

export default PostSearchComponent;
