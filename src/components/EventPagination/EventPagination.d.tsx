export interface IEventPagination {
  currentPage: number;
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}
