import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../ProfileAvatar";
import ROUTES from "@/constants/Routes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProfileAvatar", () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);
    mockedNavigate.mockClear();
    render(
      <Router>
        <ProfileAvatar fullName="John Bobby" />
      </Router>,
    );
  });

  it("renders the avatar with correct initials", () => {
    const initials = screen.getByText("JB");
    expect(initials).toBeInTheDocument();
  });

  it("renders the sign out link", () => {
    const signOutLink = screen.getByText("common.signout");
    expect(signOutLink).toBeInTheDocument();
  });

  it("checks if the avatar displays initials based on different names", () => {
    render(
      <Router>
        <ProfileAvatar fullName="Emily Ratajkowski" />
      </Router>,
    );
    const initialsER = screen.getByText("ER");
    expect(initialsER).toBeInTheDocument();
  });

  it("checks navigation when clicking on sign out", async () => {
    const signOutLink = screen.getByText("common.signout").closest("a");
    if (signOutLink) {
      await userEvent.click(signOutLink);
      () => {
        expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.SIGNIN);
      };
    }
  });
});
