import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Heading } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../../features/admin/product/ProductForm";
import { useProduct } from "../../features/product/hooks/useProduct";
import { AdminProductService } from "../../features/admin/services/product.service";
import { Translate } from "../../components/Translate";

export const EditProductPage = withAuthenticationRequired(() => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = parseInt(params.id!);
  const { product, isProductLoading, productError } = useProduct(productId);

  if (isProductLoading) return <div>Loading...</div>;

  if (productError) return <div>Error: {!productError}</div>;

  if (!product) return <div>The given product was not found.</div>;

  return (
    <div>
      <Heading mb="4"><Translate labelId="edit-product" /> </Heading>
      <ProductForm
        product={product}
        onSubmit={async (product) => {
          await AdminProductService.Update(product);
          navigate("/admin/products");
        }}
      />
    </div>
  );
});
