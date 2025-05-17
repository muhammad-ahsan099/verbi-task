import type { NewsItemWithRelated } from '../types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Link,
  Grid,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';

interface NewsModalProps {
  isOpen: boolean;
  newsItem: NewsItemWithRelated;
  onClose: () => void;
}

const NewsModal = ({ isOpen, newsItem, onClose }: NewsModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      fullWidth
      aria-labelledby="news-dialog-title"
    >
      <DialogTitle id="news-dialog-title" sx={{ pr: 6 }}>
        {newsItem.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box 
          component="img"
          src={newsItem.image}
          alt={newsItem.title}
          sx={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: 1,
            mb: 3 
          }}
        />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Chip 
            icon={<CalendarTodayIcon />} 
            label={newsItem.date} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            icon={<PersonIcon />} 
            label={newsItem.author} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            icon={<CategoryIcon />} 
            label={newsItem.category} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Box 
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
          sx={{ 
            typography: 'body1',
            '& h4': { mt: 3, mb: 2, fontWeight: 'bold' },
            '& ul': { pl: 2, mb: 2 },
            '& li': { mb: 1 },
            '& p': { mb: 2 }
          }}
        />
        
        {newsItem.relatedNews && newsItem.relatedNews.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Related News
            </Typography>
            <Grid container spacing={2}>
              {newsItem.relatedNews.map((related, index) => (
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <ArticleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Link href={related.link} color="primary" underline="hover">
                      {related.title}
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={onClose} 
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewsModal;
