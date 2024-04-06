import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  test("renders a main", () => {
    render(<Page />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
