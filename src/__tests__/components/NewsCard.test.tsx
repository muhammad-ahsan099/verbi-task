import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import NewsCard from '../../components/NewsCard';
import type { NewsItem } from '../../types';

describe('NewsCard Component', () => {
  const mockNewsItem: NewsItem = {
    id: 1,
    title: 'Test News Title',
    preview: 'This is a test news preview text that will be shown in the card.',
    content: '<p>This is the full content of the news article.</p>',
    image: 'https://example.com/test-image.jpg',
    date: 'June 15, 2023',
    author: 'Test Author',
    category: 'Test Category'
  };

  const mockOnClick = vi.fn();

  it('renders the news card with correct content', () => {
    render(<NewsCard newsItem={mockNewsItem} onClick={mockOnClick} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    
    // Check if preview text is rendered
    expect(screen.getByText('This is a test news preview text that will be shown in the card.')).toBeInTheDocument();
    
    // Check if date is rendered
    expect(screen.getByText('June 15, 2023')).toBeInTheDocument();
    
    // Check if read more button is rendered
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(<NewsCard newsItem={mockNewsItem} onClick={mockOnClick} />);
    
    // Find and click the card action area
    const cardActionArea = screen.getByText('Test News Title').closest('button');
    fireEvent.click(cardActionArea!);
    
    // Verify that onClick was called with the news item
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockNewsItem);
  });

  it('calls onClick when the read more button is clicked', () => {
    render(<NewsCard newsItem={mockNewsItem} onClick={mockOnClick} />);
    
    // Find and click the read more button
    const readMoreButton = screen.getByText('Read more');
    fireEvent.click(readMoreButton);
    
    // Verify that onClick was called with the news item
    expect(mockOnClick).toHaveBeenCalledTimes(2);
    expect(mockOnClick).toHaveBeenCalledWith(mockNewsItem);
  });
});