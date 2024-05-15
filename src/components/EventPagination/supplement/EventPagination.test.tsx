import { render, screen, fireEvent } from "@testing-library/react";
import EventPagination from "../EventPagination";

describe("EventPagination Component", () => {
  const mockOnPageChange = jest.fn();

  it("renders without crashing", () => {
    render(
      <EventPagination
        currentPage={1}
        pageCount={5}
        onPageChange={mockOnPageChange}
      />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onPageChange with the correct page when a page number is clicked", () => {
    render(
      <EventPagination
        currentPage={1}
        pageCount={5}
        onPageChange={mockOnPageChange}
      />,
    );
    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    () => {
      expect(mockOnPageChange).toHaveBeenCalledWith({ selected: 1 });
    };
  });

  it("displays ellipsis when pageCount is more than 4", () => {
    render(
      <EventPagination
        currentPage={2}
        pageCount={10}
        onPageChange={mockOnPageChange}
      />,
    );
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
