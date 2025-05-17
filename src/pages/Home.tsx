import React, { useState, useCallback, memo } from 'react';
import { Box, Container } from '@mui/material';
import AppHeader from '../components/AppHeader';
import NewsList from '../components/NewsList';
import AppFooter from '../components/AppFooter';
import { newsItems } from '../data/news';


const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = useCallback<(query: string) => void>((query) => {
    setSearchQuery(query.trim());
  }, []);

  return (
    <Box 
      component="div"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        // width: '100%',
        width: '100vw',
        bgcolor: 'background.default'
      }}
    >
      <AppHeader onSearch={handleSearch} />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{
            px: { xs: 0, sm: 2 }
          }}
        >
          <NewsList 
            newsItems={newsItems}
            searchQuery={searchQuery}
          />
        </Container>
      </Box>
      
      <AppFooter />
    </Box>
  );
};

export default memo(Home);