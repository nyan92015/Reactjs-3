import { render, screen } from "@testing-library/react";
import Login from "../Components/Login";

describe("test login component", () => {
  test("render form", () => {
    render(<Login />);
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });

  test("render form-email", () => {
    render(<Login />);
    const email = screen.getByTestId("input-email");
    expect(email).toBeInTheDocument();
  });

  test("render form-password", () => {
    render(<Login />);
    const password = screen.getByTestId("input-password");
    expect(password).toBeInTheDocument();
  });

  test("render button", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
});
