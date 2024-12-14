import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../features/admin/product/ProductForm";
import { AdminProductService } from "../../features/admin/services/product.service";

export const NewProductPage = withAuthenticationRequired(
  () => {
    const navigate = useNavigate();

    return (
      <div>
        <Heading mb="4">New Product</Heading>
        <ProductForm 
          onSubmit={async (product) => {
            await AdminProductService.Create(product)
            navigate("/admin/products");
          }}
        />
      </div>
    );
  },
  {
    onRedirecting: () => <p>Loading auth...</p>,
  }
);

