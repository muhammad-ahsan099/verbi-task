import {
  Pagination as MuiPagination,
  PaginationItem
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          components={{
            previous: ChevronLeftIcon,
            next: ChevronRightIcon
          }}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
