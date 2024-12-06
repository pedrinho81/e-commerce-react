import { renderHook, act } from "@testing-library/react";
import { useCart } from "../../src/features/cart/hooks/useCart";
import { CartProvider } from "../../src/providers/CartProvider";
import { db } from "../mocks/db";
import { Product } from "../../src/entities";
describe("CartProvider", () => {
  let product: Product; 

  beforeAll(() => {
    product = db.product.create();
  })

  afterAll(() => {
    db.product.delete({ where: { id: { equals: product.id }}})
  })
  it("should initializes with an empty cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.getItemCount()).toBe(0);
  });

  it("should adds an item to the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.getItem(product)?.quantity).toBe(1);
  });

  it("should removes an item from the cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(product);
    });
    act(() => {
      result.current.removeFromCart(product);
    });
    expect(result.current.getItem(product)).toBeNull();
  });
  it("should correctly update item count after adding products", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const anotherProduct = db.product.create();
      act(() => {
        result.current.addToCart(product);
      });
      act(() => {
        result.current.addToCart(anotherProduct);
      });

    expect(result.current.getItemCount()).toBe(db.product.getAll().length);
  });

  it("should correctly calculate item count for duplicate products", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(product);
    });
    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.getItemCount()).toBe(2);
  });
});
