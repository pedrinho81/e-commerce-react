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

  it("should renders 'Add to Cart' button when product is not in cart", () => {
    mockGetItem.mockReturnValue(null);

    render(<QuantitySelector product={product} />);
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("should adds product to cart when 'Add to Cart' button is clicked", async () => {
    mockGetItem.mockReturnValue(null);

    render(<QuantitySelector product={product} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

  it("should renders quantity controls when product is in cart", () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    render(<QuantitySelector product={product} />);

    expect(screen.getByRole("status")).toHaveTextContent("2");
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("should increases quantity when '+' button is clicked", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    render(<QuantitySelector product={product} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    await userEvent.click(incrementButton);

    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

  it("should decreases quantity when '-' button is clicked", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 2 });

    render(<QuantitySelector product={product} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    await userEvent.click(decrementButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(product);
  });

  it("should removes product from cart when quantity reaches zero", async () => {
    mockGetItem.mockReturnValue({ product, quantity: 1 });

    render(<QuantitySelector product={product} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    await userEvent.click(decrementButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(product);
  });
});
