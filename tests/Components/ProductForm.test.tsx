import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../../src/components/ProductForm";
import toast from "react-hot-toast";
import { vi, it } from "vitest";
import ReactQueryProvider from "../../src/providers/ReactQueryProvider";

import { Theme } from "@radix-ui/themes";
import { Categories } from "../../src/mocks";
import { act } from "react-dom/test-utils";

// Mock the `useCategories` hook

vi.mock("../../src/hooks/useCategories", () => ({
  default: vi.fn(() => ({
    data: Categories,
    isLoading: false,
  })),
}));

const mockOnSubmit = vi.fn();
const renderComponent = (props = {}) => {
  //NECESSARY MOCK TO TEST SELECT/DROPDOWN RADIX UI
  Object.assign(window.HTMLElement.prototype, {
    scrollIntoView: vi.fn(),
    releasePointerCapture: vi.fn(),
    hasPointerCapture: vi.fn(),
  });

  render(
    <ReactQueryProvider>
      <Theme>
        <ProductForm onSubmit={mockOnSubmit} {...props} />
      </Theme>
    </ReactQueryProvider>
  );
  const categorySelect = screen.getByRole("combobox");

  return {
    categorySelect,
  };
};

it("should renders the form with all fields", async () => {
  const { categorySelect } = renderComponent();
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(screen.getByText);

  Categories.forEach((category) => {
    const categoryOption = screen.getByText(category.name);
    expect(categoryOption).toBeInTheDocument();
    expect(categoryOption).toHaveValue(String(category.id));
  });
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

it("should allows user to fill out the form", async () => {
  const { categorySelect } = renderComponent();

  const nameInput = screen.getByPlaceholderText(/name/i);
  const priceInput = screen.getByPlaceholderText(/price/i);

  await userEvent.type(nameInput, "Test Product");
  await userEvent.type(priceInput, "100");
  await userEvent.click(categorySelect);
  const categoryOption = screen.getByRole("option", {
    name: Categories[0].name,
  });
  await userEvent.click(categoryOption);

  expect(nameInput).toHaveValue("Test Product");
  expect(priceInput).toHaveValue("100");
  expect(categorySelect).toHaveTextContent(Categories[0].name);
});

it("should displays validation errors for empty fields", async () => {
  renderComponent();

  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price is required/i)).toBeInTheDocument();
    expect(screen.getByText(/category is required/i)).toBeInTheDocument();
  });
});

it("should submits the form successfully", async () => {
  const { categorySelect } = renderComponent();

  const nameInput = screen.getByPlaceholderText(/name/i);
  const priceInput = screen.getByPlaceholderText(/price/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(nameInput, "Test Product");
  await userEvent.type(priceInput, "100");
  await userEvent.click(categorySelect);
  const categoryOption = screen.getByRole("option", {
    name: Categories[0].name,
  });

  await act(() => userEvent.click(categoryOption));
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(mockOnSubmit).toBeCalledWith({
      name: "Test Product",
      price: 100,
      categoryId: Categories[0].id,
    });
  });
});

it("should handles submission errors gracefully", async () => {
  mockOnSubmit.mockRejectedValueOnce(new Error("Submission failed"));
  vi.spyOn(toast, "error");

  const { categorySelect } = renderComponent();

  const nameInput = screen.getByPlaceholderText(/name/i);
  const priceInput = screen.getByPlaceholderText(/price/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(nameInput, "Test Product");
  await userEvent.type(priceInput, "100");
  await userEvent.click(categorySelect);
  const categoryOption = screen.getByRole("option", {
    name: Categories[0].name,
  });

  await act(() => userEvent.click(categoryOption));

  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("An unexpected error occurred");
  });
});
