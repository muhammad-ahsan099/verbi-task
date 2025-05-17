import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AppFooter = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <FeedIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="span">
                NewsTicker
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Stay informed with the latest news
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="inherit" aria-label="help">
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="settings">
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="account">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          &copy; {new Date().getFullYear()} NewsTicker. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default AppFooter;
