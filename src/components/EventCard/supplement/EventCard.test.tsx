import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../EventCard";

const mockContent = {
  edit: "Edit",
  removePolicy: "Remove Policy",
  showMore: "Show more details",
  showLess: "Show less details",
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("EventCard", () => {
  beforeEach(() => {
    render(<EventCard content={mockContent} />);
  });

  it("renders correctly", () => {
    const editButtons = screen.getAllByText("Edit");
    const removeButtons = screen.getAllByText("Remove Policy");

    expect(editButtons.length).toBeGreaterThan(0);
    expect(removeButtons.length).toBeGreaterThan(0);
    expect(
      screen.getByText("[Event name] - reoccurring activity"),
    ).toBeInTheDocument();
  });
  it("toggles more details on click", () => {
    const toggleButton = screen.getByText("Show more details");
    fireEvent.click(toggleButton);
    expect(screen.getByText("Show less details")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Show less details"));
    expect(screen.getByText("Show more details")).toBeInTheDocument();
  });

  it("has clickable edit and remove buttons", () => {
    const editButtons = screen.getAllByText("Edit");
    const removeButtons = screen.getAllByText("Remove Policy");

    expect(editButtons.length).toBeGreaterThan(0);
    editButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });

    expect(removeButtons.length).toBeGreaterThan(0);
    removeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
    });
  });
});
