import React, { useState, useEffect, useCallback } from 'react';
import fetchPosts from './FetchPostService';
import SearchForm from './SearchForm';
import PostTable from './PostTable';
import '../styles/PostSearchComponent.css';

const PostSearchComponent = () => {
  const [orderBy, setOrderBy] = useState('userId');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputWarning, setInputWarning] = useState(true); // warning variable for minimum characters (3)
  const [searchTerm, setSearchTerm] = useState('');

  const applySorting = useCallback((results) => {
    let sortedResults = [...results];
    if (orderBy === 'userId') {
      sortedResults.sort((a, b) => a.userId - b.userId);
    } else if (orderBy === 'title') {
      sortedResults.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFilteredPosts(sortedResults.slice(0, 10));
  }, [orderBy]);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        const posts = await fetchPosts();
        setAllPosts(posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAndSetPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setInputWarning(false);
      const filteredResults = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10); // we filter by title AND body
      applySorting(filteredResults);
    } else {
      setInputWarning(true);
      setFilteredPosts([]);
    }
  }, [searchTerm, allPosts, applySorting]);

  useEffect(() => {
    const handleSorting = () => {
      if (filteredPosts.length > 0) {
        applySorting(filteredPosts);
      }
    };

    handleSorting();
  }, [orderBy, filteredPosts, applySorting]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSortBy = (orderByType) => {
    setOrderBy(orderByType);
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
