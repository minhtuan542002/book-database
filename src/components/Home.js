import React, { useState, useEffect } from 'react';
import FilterWrapper from './FilterWrapper';
import ComicList from './ComicList';
import { Container } from 'react-bootstrap';

function Home() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    filterPublisher: 'All',
    filterGenre: 'All',
    filterLength: 'All',
    filterScore: 'All',
    sortField: null,
    sortOrder: 'asc',
    filtersVisible: false,
    currentPage: 1,
    itemsPerPage: 10
  });
  return (
    <Container>
      <h1 className="text-center">My Favorite Comics</h1>,
      <FilterWrapper>
        <ComicList/>
      </FilterWrapper>
    </Container>
  );  
}

export default Home;