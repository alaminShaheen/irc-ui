import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

const mockContent = {
  poweredBy: "Powered by XYZ",
  body: "Sample footer text",
  privacyPolicy: "Privacy Policy",
  copyright: "Copyright © {{year}} Company Name",
  logoAltText: "Logo",
};

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer content={mockContent} />);
  });

  it("renders powered by text", () => {
    expect(screen.getByText(mockContent.poweredBy)).toBeInTheDocument();
  });

  it("renders the body text", () => {
    expect(screen.getByText(mockContent.body)).toBeInTheDocument();
  });

  it("renders the privacy policy link", () => {
    expect(screen.getByText(mockContent.privacyPolicy)).toBeInTheDocument();
    expect(
      screen.getByText(mockContent.privacyPolicy).closest("a"),
    ).toHaveAttribute("href");
  });

  it("displays the logo", () => {
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("renders the correct copyright year", () => {
    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(`Copyright © ${currentYear} Company Name`),
    ).toBeInTheDocument();
  });
});
