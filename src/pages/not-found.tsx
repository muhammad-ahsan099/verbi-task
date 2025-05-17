import { 
  Box, 
  Typography, 
  Paper,
  Container
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4,
            mx: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="h1" fontWeight="bold">
              404 Page Not Found
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Did you forget to add the page to the router?
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
