import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";
  it("should render all text when is equal or less than 255 characters and not render button", () => {
    const text = "Short text";
    render(<ExpandableText text={text} />);
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(text);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
  it("should truncate text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });
  it("should toggle visibility when click button", async () => {
    render(<ExpandableText text={longText} />);
    const truncatedText = longText.substring(0, 255) + "...";

    const button = screen.getByRole("button");
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);

    await userEvent.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);

    await userEvent.click(button);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
