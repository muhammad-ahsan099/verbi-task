import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the search bar correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search news...');
    expect(searchInput).toBeInTheDocument();

    // Check if search icon is visible
    const searchIcon = screen.getByLabelText('search');
    expect(searchIcon).toBeInTheDocument();
  });
  it('calls onSearch when text is entered', async () => {
    const spy = vi.fn();
    render(<SearchBar onSearch={spy} />);

    const input = screen.getByPlaceholderText('Search news...');

    await userEvent.type(input, 'search');

    // Wait for debounce to complete and onSearch to be called
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    // Expect only 1 call because debounce delays multiple calls
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('renders correctly in mobile view', () => {
    render(<SearchBar onSearch={mockOnSearch} isMobile={true} />);

    const searchInput = screen.getByPlaceholderText('Search news...');
    expect(searchInput).toBeInTheDocument();

    const mobileWrapper = screen.getByTestId('mobile-searchbar');
    expect(mobileWrapper).toBeInTheDocument();
  });



});