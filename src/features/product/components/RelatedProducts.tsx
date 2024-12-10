import Slider from "react-slick";
import { Product } from "../../../entities";
import { Tooltip } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { priceFormat } from "../../../utils/priceFormat";
import { Translate } from "../../../components/Translate";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleFocusToTop = () => {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="related-products mb-10">
      <h2 className="text-2xl font-bold mb-4">
        <Translate labelId="related-products" />
      </h2>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <Link
              onClick={handleFocusToTop}
              to={`/products/${product.id}`}
              className="text-zinc-800 hover:text-blue-800"
            >
              <div
                key={index}
                className="p-4 text-center bg-white  rounded-md r-10"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4 rounded-md"
                />
                <Tooltip content={product.title}>
                  <h3 className="font-semibold text-lg line-clamp-2 text-ellipsis">
                    {product.title}
                  </h3>
                </Tooltip>
                <p className="text-gray-600">{priceFormat(product.price)}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
