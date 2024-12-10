import { useParams } from "react-router-dom";
import { useProduct } from "../features/product/hooks/useProduct";
import { ProductNotFound } from "../features/product/components/ProductNotFound";
import Skeleton from "react-loading-skeleton";
import { ProductDetails } from "../features/product/components/ProductDetail";
import { RelatedProducts } from "../features/product/components/RelatedProducts";
import { useProducts } from "../features/product/hooks/useProducts";

export const ProductDetailPage = () => {
  const params = useParams();
  const productId = parseInt(params.id!);
  const { product, isProductLoading, productError } = useProduct(productId);
  const { products: relatedProducts } = useProducts({
    category: product?.category,
  });
  if (isProductLoading)
    return (
      <div className="lg:grid grid-cols-2 gap-10">
        <Skeleton width="w-full" height="500px" />
        <div className="hidden lg:block">
          <Skeleton width="w-full" height="340px" />
        </div>
      </div>
    );
  if (productError) return <div>Error: Unexpected error</div>;

  if (!product) return <ProductNotFound />;

  return (
    <>
      <ProductDetails product={product} />
      <hr className="mt-10 mb-6" />
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </>
  );
};
