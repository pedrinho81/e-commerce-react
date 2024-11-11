import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    screen.debug(container);
    expect(container).toBeEmptyDOMElement();
  });
  it("should render a list of image urls", () => {
    const imageUrls: string[] = ["http://test1.com", "http://test2.com"];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrls.length);
    imageUrls.forEach((url, i) => {
      expect(images[i]).toHaveAttribute("src", url);
    });
  });
});
