import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container, 
  Box, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FeedIcon from '@mui/icons-material/Feed';
import SearchBar from './SearchBar';

interface AppHeaderProps {
  onSearch: (query: string) => void;
}

const AppHeader = ({ onSearch }: AppHeaderProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center">
            <FeedIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="h1">
              NewsTicker
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Desktop search */}
          {!isMobile && (
            <Box sx={{ width: '300px' }}>
              <SearchBar onSearch={onSearch} />
            </Box>
          )}
          
          {/* Mobile search toggle */}
          {isMobile && (
            <IconButton 
              color="inherit" 
              onClick={toggleMobileSearch}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          )}
        </Toolbar>
        
        {/* Mobile search (hidden by default) */}
        {isMobile && showMobileSearch && (
          <Box sx={{ pb: 2 }}>
            <SearchBar onSearch={onSearch} isMobile={true} />
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default AppHeader;
