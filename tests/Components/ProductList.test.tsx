import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { worker } from "../../src/msw/worker";
import { http, HttpResponse } from "msw";
import ProductList from "../../src/components/ProductList";
import { describe, it, expect } from "vitest";

describe("ProductList", () => {
  it("displays loading state initially", () => {
    render(<ProductList />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("displays products after successful fetch", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("product1")).toBeInTheDocument();
      expect(screen.getByText("product2")).toBeInTheDocument();
    });
  });

  it("handles API errors", async () => {
    worker.use(
      http.get("/products", () => {
        return HttpResponse.error();
      })
    );

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    });

    worker.use(
      http.get("/products", () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );
    cleanup();

    render(<ProductList />);
    await waitFor(() => {
      expect(
        screen.getByText(/error: Request failed with status code 500/i)
      ).toBeInTheDocument();
    });
  });

  it("shows no products message when API returns an empty list", async () => {
    worker.use(
      http.get("/products", () => {
        return HttpResponse.json([]);
      })
    );

    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText(/no products/i)).toBeInTheDocument();
    });
  });
});
