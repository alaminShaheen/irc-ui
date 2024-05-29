import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import SidebarProfile from "../SidebarProfile";
import ROUTES from "@/constants/Routes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("SidebarProfile", () => {
  const fullName = "John Doe";

  it("renders the full name", () => {
    render(
      <Router>
        <SidebarProfile fullName={fullName} />
      </Router>,
    );

    expect(screen.getByText(fullName)).toBeInTheDocument();
  });

  it("renders the application history link with correct text", () => {
    render(
      <Router>
        <SidebarProfile fullName={fullName} />
      </Router>,
    );

    expect(
      screen.getByText("common.sidebar.applicationHistory"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("common.sidebar.applicationHistory").closest("a"),
    ).toHaveAttribute(
      "href",
      "https://demo.instantriskcoverage.com/account/policies/",
    );
  });

  it("renders the signout link with correct text and route", () => {
    render(
      <Router>
        <SidebarProfile fullName={fullName} />
      </Router>,
    );

    expect(screen.getByText("common.signout")).toBeInTheDocument();
    expect(screen.getByText("common.signout").closest("a")).toHaveAttribute(
      "href",
      ROUTES.SIGNIN,
    );
  });
});
