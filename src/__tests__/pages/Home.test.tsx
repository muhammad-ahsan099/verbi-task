import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';
// import { newsItems } from '../data/news';

// In your test setup or at the top of your test file
vi.mock('lodash/debounce', () => ({
  default: (fn: any) => fn,
}));


// Mock the newsItems data
vi.mock('../../data/news', () => ({
  newsItems: [
    {
      id: 1,
      title: 'Integration Test News 1',
      preview: 'This is the first integration test news preview.',
      content: '<p>First integration test content.</p>',
      image: 'https://example.com/int-image1.jpg',
      date: 'July 1, 2023',
      author: 'Integration Author',
      category: 'Testing',
      relatedNews: [{ title: 'Related Int News', link: '#' }]
    },
    {
      id: 2,
      title: 'Integration Test News 2',
      preview: 'This is the second integration test news preview.',
      content: '<p>Second integration test content.</p>',
      image: 'https://example.com/int-image2.jpg',
      date: 'July 2, 2023',
      author: 'Integration Author 2',
      category: 'Testing',
      relatedNews: [{ title: 'Related Int News 2', link: '#' }]
    }
  ]
}));

describe('Home Page Integration', () => {
  it('renders the complete home page with header, news list, and footer', () => {
    render(<Home />);

    // Check if the header is rendered
    // expect(screen.getByText('NewsTicker')).toBeInTheDocument();
    expect(screen.getAllByText('NewsTicker').length).toBeGreaterThanOrEqual(1);


    // Check if search bar is rendered
    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument();

    // Check if news list is rendered with correct titles
    expect(screen.getByText('Latest News')).toBeInTheDocument();
    expect(screen.getByText('Integration Test News 1')).toBeInTheDocument();
    expect(screen.getByText('Integration Test News 2')).toBeInTheDocument();

    // Check if footer is rendered
    expect(screen.getByText(/NewsTicker. All rights reserved/)).toBeInTheDocument();
  });

  it('allows searching for news articles', async () => {
    render(<Home />);

    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search news...');

    // Type a search query that should match only the first article
    await userEvent.type(searchInput, 'first');

    // Wait for the debounced filter to apply
    await waitFor(() => {
      // The first article should be visible
      expect(screen.getByText('Integration Test News 1')).toBeInTheDocument();
      // The second article should not be visible
      expect(screen.queryByText('Integration Test News 2')).not.toBeInTheDocument();
    });
  });

  it('opens the news modal when a news card is clicked', () => {
    render(<Home />);

    // Find and click on the first news card
    const firstNewsCard = screen.getByText('Integration Test News 1').closest('button');
    fireEvent.click(firstNewsCard!);

    // The modal should be open with the article content
    expect(screen.getAllByText('Integration Test News 1')[1]).toBeInTheDocument();
    expect(screen.getByText('Integration Author')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();

    // Check if related news is shown
    expect(screen.getByText('Related News')).toBeInTheDocument();
    expect(screen.getByText('Related Int News')).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    // After closing, there should only be one instance of the title (in the card)
    expect(screen.queryAllByText('Integration Test News 1').length).toBe(1);
  });
});