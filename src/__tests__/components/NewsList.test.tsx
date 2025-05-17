import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import NewsList from '../../components/NewsList';
import type { NewsItemWithRelated } from '../../types';

describe('NewsList Component', () => {
  const mockNewsItems: NewsItemWithRelated[] = [
    {
      id: 1,
      title: 'First Test News',
      preview: 'This is the first test news preview.',
      content: '<p>First news content.</p>',
      image: 'https://example.com/image1.jpg',
      date: 'June 15, 2023',
      author: 'Author One',
      category: 'Politics',
      relatedNews: [
        { title: 'Related News 1', link: '#' }
      ]
    },
    {
      id: 2,
      title: 'Second Test News',
      preview: 'This is the second test news preview.',
      content: '<p>Second news content.</p>',
      image: 'https://example.com/image2.jpg',
      date: 'June 16, 2023',
      author: 'Author Two',
      category: 'Technology',
      relatedNews: [
        { title: 'Related News 2', link: '#' }
      ]
    },
    {
      id: 3,
      title: 'Third Test News',
      preview: 'This is the third test news preview.',
      content: '<p>Third news content.</p>',
      image: 'https://example.com/image3.jpg',
      date: 'June 17, 2023',
      author: 'Author Three',
      category: 'Health',
      relatedNews: [
        { title: 'Related News 3', link: '#' }
      ]
    }
  ];

  it('renders the news list with correct titles', () => {
    render(<NewsList newsItems={mockNewsItems} searchQuery="" />);
    
    // Check if all news titles are rendered
    expect(screen.getByText('First Test News')).toBeInTheDocument();
    expect(screen.getByText('Second Test News')).toBeInTheDocument();
    expect(screen.getByText('Third Test News')).toBeInTheDocument();
    
    // Check if the section title is rendered
    expect(screen.getByText('Latest News')).toBeInTheDocument();
  });

  it('filters news items based on search query', () => {
    render(<NewsList newsItems={mockNewsItems} searchQuery="first" />);
    
    // Only the first news item should be visible
    expect(screen.getByText('First Test News')).toBeInTheDocument();
    expect(screen.queryByText('Second Test News')).not.toBeInTheDocument();
    expect(screen.queryByText('Third Test News')).not.toBeInTheDocument();
  });

  it('filters news items by category', () => {
    render(<NewsList newsItems={mockNewsItems} searchQuery="technology" />);
    
    // Only the second news item should be visible
    expect(screen.queryByText('First Test News')).not.toBeInTheDocument();
    expect(screen.getByText('Second Test News')).toBeInTheDocument();
    expect(screen.queryByText('Third Test News')).not.toBeInTheDocument();
  });

  it('displays a message when no news items match the search query', () => {
    render(<NewsList newsItems={mockNewsItems} searchQuery="nonexistent" />);
    
    // No news items should be visible
    expect(screen.queryByText('First Test News')).not.toBeInTheDocument();
    expect(screen.queryByText('Second Test News')).not.toBeInTheDocument();
    expect(screen.queryByText('Third Test News')).not.toBeInTheDocument();
    
    // The no results message should be displayed
    expect(screen.getByText('No news articles match your search.')).toBeInTheDocument();
  });

  it('opens modal when a news item is clicked', () => {
    render(<NewsList newsItems={mockNewsItems} searchQuery="" />);
    
    // Find and click on the first news card
    const firstNewsCard = screen.getByText('First Test News').closest('button');
    fireEvent.click(firstNewsCard!);
    
    // The modal should open with the selected news item's content
    // Note: We'll need to check for dialog content, which might be in a portal
    // For simplicity, we can check if the title is shown in the dialog
    expect(screen.getAllByText('First Test News')[1]).toBeInTheDocument();
  });
});