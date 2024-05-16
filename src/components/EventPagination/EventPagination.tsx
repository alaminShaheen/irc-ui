import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IEventPagination } from "@/components/EventPagination/EventPagination.d";
import AppConstants from "@/constants/AppConstants";

const EventPagination = (props: IEventPagination) => {
  const { currentPage, pageCount, onPageChange } = props;
  const marginPages = pageCount > AppConstants.PAGINATION_DISPLAY_COUNT ? 1 : 0;
  const pageRange =
    pageCount > AppConstants.PAGINATION_DISPLAY_COUNT ? 2 : pageCount;
  return (
    <ReactPaginate
      previousLabel={
        <span className="flex h-8 w-8 items-center justify-center">
          <IoIosArrowBack size={18} />
        </span>
      }
      nextLabel={
        <span className="flex h-8 w-8 items-center justify-center">
          <IoIosArrowForward size={18} />
        </span>
      }
      breakLabel={"..."}
      forcePage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex list-none gap-3 mt-3 justify-center items-center text-primary"
      pageLinkClassName="block w-8 h-8 leading-8 text-center rounded-full bg-transparent hover:bg-primary-50 font-semibold hover:text-primary"
      previousLinkClassName="block w-8 h-8 leading-8 text-center rounded-full bg-transparent"
      nextLinkClassName="block w-8 h-8 leading-8 text-center rounded-full bg-transparent"
      breakLinkClassName="block w-8 h-8 leading-8 text-center text-primary"
      activeClassName="bg-secondary rounded-full text-white"
      disabledClassName="opacity-50 cursor-not-allowed"
      marginPagesDisplayed={marginPages}
      pageRangeDisplayed={pageRange}
    />
  );
};

export default EventPagination;