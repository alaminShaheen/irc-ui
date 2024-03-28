import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

type SidebarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

// Mock components
jest.mock("@/components/Footer", () => {
  const FooterMock = () => <div>Footer content</div>;
  FooterMock.displayName = "Footer";
  return FooterMock;
});

jest.mock("@/components/ui/Navbar", () => {
  const NavbarMock = () => <div>Navbar content</div>;
  NavbarMock.displayName = "Navbar";
  return NavbarMock;
});

jest.mock("@/components/BypassBlock", () => {
  const BypassBlockMock = () => <div>Bypass block content</div>;
  BypassBlockMock.displayName = "BypassBlock";
  return BypassBlockMock;
});

jest.mock("@/components/Sidebar", () => {
  const SideBar = ({ sidebarOpen }: SidebarProps) => (
    <div>Sidebar content {sidebarOpen ? "open" : "closed"}</div>
  );
  SideBar.displayName = "SideBar";
  return SideBar;
});

jest.mock("@/components/ui/Button", () => {
  const Button = ({ onClick, children }: ButtonProps) => (
    <button onClick={onClick}>{children}</button>
  );
  Button.displayName = "Button";
  return Button;
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Layout", () => {
  beforeEach(() => {
    render(<Layout>Child content</Layout>);
  });

  it("renders all child components correctly", () => {
    const bypassBlocks = screen.getAllByText("Bypass block content");
    expect(bypassBlocks.length).toBeGreaterThan(1);
    expect(screen.getByText("Navbar content")).toBeInTheDocument();
    expect(screen.getByText("Sidebar content closed")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});
