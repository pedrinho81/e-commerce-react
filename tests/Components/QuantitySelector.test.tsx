import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";
import QuantitySelector from "../../src/components/QuantitySelector";
import { useCart } from "../../src/hooks/useCart";
import { Product } from "../../src/entities";
import { Products } from "../../src/mocks";

vi.mock("../../src/hooks/useCart");

describe("QuantitySelector", () => {
  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockGetItem = vi.fn();

  const product: Product = { ...Products[0] };

  beforeEach(() => {
    vi.clearAllMocks();

    (useCart as Mock).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  const renderComponent = () => {
    const { rerender } = render(<QuantitySelector product={product} />);
    const status = () => screen.getByRole("status");
    const decrementButton = () => screen.getByRole("button", { name: "-" });
    const incrementButton = () => screen.getByRole("button", { name: "+" });
    const addButton = () =>
      screen.getByRole("button", { name: /add to cart/i });
    return {
      decrementButton,
      incrementButton,
      status,
      addButton,
      rerender,
    };
  };
  it("should renders 'Add to Cart' button when product is not in cart", () => {
    mockGetItem.mockReturnValue(null);

    const { addButton } = renderComponent();
    expect(addButton()).toBeInTheDocument();
  });

  it("should adds product to cart when 'Add to Cart' button is clicked", async () => {
    mockGetItem.mockReturnValue(null);

    const { addButton } = renderComponent();

    await userEvent.click(addButton());

    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

  it("should display quantity controls after adding a product to the cart", async () => {
    mockGetItem
      .mockReturnValueOnce(null)
      .mockReturnValue({ product, quantity: 1 });

    const { addButton, rerender, decrementButton, status, incrementButton } =
      renderComponent();

    await userEvent.click(addButton());

    rerender(<QuantitySelector product={product} />);

    expect(mockGetItem).toHaveBeenCalledTimes(2);

    expect(status()).toHaveTextContent("1");
    expect(decrementButton()).toBeInTheDocument();
    expect(incrementButton()).toBeInTheDocument();
  });

  it("should renders quantity controls when product is in cart", () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    const { decrementButton, status, incrementButton } = renderComponent();

    expect(status()).toHaveTextContent("2");
    expect(decrementButton()).toBeInTheDocument();
    expect(incrementButton()).toBeInTheDocument();
  });

  it("should increases quantity when '+' button is clicked", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    const { incrementButton } = renderComponent();

    await userEvent.click(incrementButton());

    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

  it("should decreases quantity when '-' button is clicked", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    const { decrementButton } = renderComponent();

    await userEvent.click(decrementButton());

    expect(mockRemoveFromCart).toHaveBeenCalledWith(product);
  });

  it("should removes product from cart when quantity reaches zero", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 1 });

    const { decrementButton } = renderComponent();

    await userEvent.click(decrementButton());

    expect(mockRemoveFromCart).toHaveBeenCalledWith(product);
  });
  it("should display add to cart button after removing a product from cart", async () => {
    mockGetItem
      .mockReturnValueOnce({ product, quantity: 1 })
      .mockReturnValue(null);

    const { addButton, rerender, decrementButton } = renderComponent();

    await userEvent.click(decrementButton());

    rerender(<QuantitySelector product={product} />);

    expect(mockGetItem).toHaveBeenCalledTimes(2);

    expect(addButton()).toBeInTheDocument();
  });
});
