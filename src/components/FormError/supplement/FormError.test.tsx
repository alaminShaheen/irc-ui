import { render, screen } from "@testing-library/react";
import FormError from "../FormError";

describe("FormError component", () => {
  beforeEach(() => {
    render(<FormError id="error" errorMessage="Error" />);
  });

  it("renders error message correctly", () => {
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders with the correct id", () => {
    expect(screen.getByTestId("formError-body")).toHaveAttribute("id", "error");
  });

  it("renders the AlertDanger icon", () => {
    expect(screen.getByTestId("formError-alert")).toBeInTheDocument();
  });

  it("renders with aria-live attribute", () => {
    expect(screen.getByTestId("formError-body")).toHaveAttribute(
      "aria-live",
      "assertive",
    );
  });
});
