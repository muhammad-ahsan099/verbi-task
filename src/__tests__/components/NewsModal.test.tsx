import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import NewsModal from '../../components/NewsModal';
import type { NewsItemWithRelated } from '../../types';

describe('NewsModal Component', () => {
  const mockNewsItem: NewsItemWithRelated = {
    id: 1,
    title: 'Test Modal News',
    preview: 'This is a test news preview for the modal.',
    content: '<p>This is the full content of the news article for testing the modal.</p><p>It includes multiple paragraphs.</p>',
    image: 'https://example.com/modal-test-image.jpg',
    date: 'June 20, 2023',
    author: 'Modal Test Author',
    category: 'Test Category',
    relatedNews: [
      { title: 'Related News 1', link: '#related1' },
      { title: 'Related News 2', link: '#related2' }
    ]
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(
      <NewsModal 
        isOpen={false} 
        newsItem={mockNewsItem} 
        onClose={mockOnClose} 
      />
    );
    
    // Modal should not be visible
    expect(screen.queryByText('Test Modal News')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <NewsModal 
        isOpen={true} 
        newsItem={mockNewsItem} 
        onClose={mockOnClose} 
      />
    );
    
    // Check if title, content, and metadata are rendered
    expect(screen.getByText('Test Modal News')).toBeInTheDocument();
    expect(screen.getByText('June 20, 2023')).toBeInTheDocument();
    expect(screen.getByText('Modal Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    
    expect(screen.getByText('This is the full content of the news article for testing the modal.')).toBeInTheDocument();
    expect(screen.getByText('It includes multiple paragraphs.')).toBeInTheDocument();

    
    // Check if related news items are rendered
    expect(screen.getByText('Related News')).toBeInTheDocument();
    expect(screen.getByText('Related News 1')).toBeInTheDocument();
    expect(screen.getByText('Related News 2')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <NewsModal 
        isOpen={true} 
        newsItem={mockNewsItem} 
        onClose={mockOnClose} 
      />
    );
    
    // Find and click close button in the header
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    
    // Verify onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Close button in the footer is clicked', () => {
    render(
      <NewsModal 
        isOpen={true} 
        newsItem={mockNewsItem} 
        onClose={mockOnClose} 
      />
    );
    
    // Find and click close button in footer
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    // Verify onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});