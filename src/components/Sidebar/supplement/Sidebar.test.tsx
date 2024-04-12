import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../Sidebar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: () => new Promise(() => {}) },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

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
});
