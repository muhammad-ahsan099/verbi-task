import type { NewsItem } from '../types';
import { 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  // Box, 
  Button,
  CardActions
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface NewsCardProps {
  newsItem: NewsItem;
  onClick: (newsItem: NewsItem) => void;
}

const NewsCard = ({ newsItem, onClick }: NewsCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
        }
      }}
    >
      <CardActionArea onClick={() => onClick(newsItem)}>
        <CardMedia
          component="img"
          height="200"
          image={newsItem.image}
          alt={newsItem.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3">
            {newsItem.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2
            }}
          >
            {newsItem.preview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {newsItem.date}
        </Typography>
        <Button 
          size="small" 
          color="primary" 
          endIcon={<ArrowForwardIcon />}
          onClick={() => onClick(newsItem)}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
