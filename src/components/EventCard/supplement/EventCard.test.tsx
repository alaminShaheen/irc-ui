import { render, screen } from "@testing-library/react";
import EventCard from "../EventCard";

// Mock data for the component props
const mockContent = {
  edit: "Edit",
  removePolicy: "Remove",
};

describe("EventCard", () => {
  it("renders correctly", () => {
    render(<EventCard content={mockContent} />);

    // expect(screen.getByText("Edit")).toBeInTheDocument();
    // expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(
      screen.getByText("[Event name] - reocuring activity"),
    ).toBeInTheDocument();
  });

  //   it("toggles more details on click", () => {
  //     render(<EventCard content={mockContent} />);
  //     const toggleButton = screen.getByText("Show more details");
  //     fireEvent.click(toggleButton);

  //     expect(toggleButton).toHaveTextContent("Show less details");
  //     fireEvent.click(toggleButton);
  //     expect(toggleButton).toHaveTextContent("Show more details");
  //   });

  //   it("has clickable edit and remove buttons", () => {
  //     render(<EventCard content={mockContent} />);
  //     const editButton = screen.getByText("Edit");
  //     const removeButton = screen.getByText("Remove");

  //     expect(editButton).toBeInTheDocument();
  //     expect(removeButton).toBeInTheDocument();
  //   });
});
