import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar Component", () => {
  test("renders navigation elements", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Test that logo link exists
    const logoLink = screen.getByRole("link");
    expect(logoLink).toBeInTheDocument();
  });

  test("displays cart quantity when items exist", () => {
    // This test should mock the useCart hook
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Test implementation would depend on cart state
  });
});
