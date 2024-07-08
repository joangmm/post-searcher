import React from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const SearchForm = ({ searchTerm, onSearchChange, inputWarning, orderBy, onSortBy }) => {
  return (
    <div className='search-container'>
      <div className='search-input'>
        <TextField
          id="outlined-basic"
          label="Busca un post..."
          variant="outlined"
          onChange={onSearchChange}
          value={searchTerm}
        />
        {inputWarning && (
          <p className="input-warning">Por favor, escribe al menos 3 carácteres para empezar a buscar.</p>
        )}
      </div>
      <div className='order-by'>
        <span className='order-text'>Ordenar por: </span>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Título"
            onClick={() => onSortBy('title')}
            color={orderBy === 'title' ? 'primary' : 'default'} //we set the color as primary in the selected option
          />
          <Chip
            label="ID de usuario"
            onClick={() => onSortBy('userId')}
            color={orderBy === 'userId' ? 'primary' : 'default'}
          />
        </Stack>
      </div>
    </div>
  );
};

export default SearchForm;
