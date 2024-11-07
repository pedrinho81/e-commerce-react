import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with the current username when name is provided", () => {
    const userName = "Pedro";
    render(<Greet name={userName} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(new RegExp(userName, "i"));
  });
  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/login/i);
  });
});
