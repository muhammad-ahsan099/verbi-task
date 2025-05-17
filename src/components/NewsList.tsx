import React, { useState, memo, useMemo, useCallback } from 'react';
import NewsCard from './NewsCard';
import Pagination from './Pagination';
import NewsModal from './NewsModal';
import type { NewsItem, NewsItemWithRelated } from '../types';

import {
  Typography,
  Box,
  Grid,
  Alert
} from '@mui/material';

interface NewsListProps {
  newsItems: NewsItem[];
  searchQuery: string;
}

const ITEMS_PER_PAGE = 9;

const NewsList: React.FC<NewsListProps> = ({ newsItems, searchQuery }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItemWithRelated | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

   // Filter news with memoization
  const filteredNewsItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return newsItems;

    return newsItems.filter(({ title, preview, category }) =>
      title.toLowerCase().includes(query) ||
      preview.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    );
  }, [newsItems, searchQuery]);

  const totalPages = useMemo(() => Math.ceil(filteredNewsItems.length / ITEMS_PER_PAGE), [filteredNewsItems]);
  const currentNewsItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNewsItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNewsItems, currentPage]);

  const handleNewsItemClick = useCallback((newsItem: NewsItem) => {
    setSelectedNewsItem(newsItem as NewsItemWithRelated);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Box mb={4}>
        <Typography color='primary' variant="h4" component="h2" gutterBottom>
          Latest News
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Stay updated with the most recent headlines
        </Typography>
      </Box>

      {filteredNewsItems.length === 0 ? (
        <Box display="flex" justifyContent="center" py={5}>
          <Alert severity="info">No news articles match your search.</Alert>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentNewsItems.map((newsItem) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }} key={newsItem.id}
              >
                <NewsCard
                  newsItem={newsItem}
                  onClick={handleNewsItemClick}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}

      {selectedNewsItem && (
        <NewsModal
          isOpen={isModalOpen}
          newsItem={selectedNewsItem}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default memo(NewsList);
