import { useState, useEffect, useMemo } from 'react';
import {
  InputBase,
  Paper,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isMobile?: boolean;
}

const DEBOUNCE_DELAY = 300; // ms

const SearchBar = ({ onSearch, isMobile = false }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Trigger search on debounced value change
  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  const placeholderColor = useMemo(() => (
    isMobile ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)'
  ), [isMobile]);

  return (
    <Paper
      component="form"
      data-testid={isMobile ? 'mobile-searchbar' : 'desktop-searchbar'}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: isMobile ? 'white' : 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
          backgroundColor: isMobile ? 'white' : 'rgba(255, 255, 255, 0.25)'
        },
        borderRadius: 2
      }}
      elevation={0}
      onSubmit={(e) => e.preventDefault()}
    >
      <IconButton
        sx={{ p: '10px', color: isMobile ? 'primary.main' : 'white' }}
        aria-label="search"
        disabled
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: isMobile ? 'inherit' : 'white',
          '& .MuiInputBase-input::placeholder': {
            color: placeholderColor,
            opacity: 1
          }
        }}
        placeholder="Search news..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        inputProps={{ 'aria-label': 'search news' }}
      />
    </Paper>
  );
};

export default SearchBar;
