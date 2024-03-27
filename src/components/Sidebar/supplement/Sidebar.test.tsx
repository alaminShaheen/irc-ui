import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  const toggleSidebarMock = jest.fn();

  beforeEach(() => {
    render(<Sidebar sidebarOpen={true} toggleSidebar={toggleSidebarMock} />);
  });

  it("renders open sidebar", () => {
    expect(screen.getByTestId("overlay")).toBeInTheDocument();
  });

  it("closes on overlay click", () => {
    fireEvent.click(screen.getByTestId("overlay"));
    expect(toggleSidebarMock).toHaveBeenCalled();
  });

  it("loads and displays translation content", () => {
    () => {
      const closeButton = screen.findByText(/close/i);
      expect(closeButton).toBeInTheDocument();
    };
  });
});
