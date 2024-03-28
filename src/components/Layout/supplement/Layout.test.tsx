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
jest.mock("@/components/Footer", () => () => <div>Footer content</div>);
jest.mock("@/components/ui/Navbar", () => () => <div>Navbar content</div>);
jest.mock("@/components/BypassBlock", () => () => (
  <div>Bypass block content</div>
));

jest.mock("@/components/Sidebar", () => ({ sidebarOpen }: SidebarProps) => (
  <div>Sidebar content {sidebarOpen ? "open" : "closed"}</div>
));
jest.mock(
  "@/components/ui/Button",
  () =>
    ({ onClick, children }: ButtonProps) => (
      <button onClick={onClick}>{children}</button>
    ),
);

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

  // it("toggles the sidebar when button is clicked", () => {
  //   fireEvent.click(screen.getByText("common.menu"));
  //   () => {
  //     expect(screen.getByText("Sidebar content open")).toBeInTheDocument();
  //   };
  // });
});
