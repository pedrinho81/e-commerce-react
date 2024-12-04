import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../features/order/components/products/ProductForm";

export const NewProductPage = withAuthenticationRequired(
  () => {
    const navigate = useNavigate();

    return (
      <div>
        <Heading mb="4">New Product</Heading>
        <ProductForm
          onSubmit={async (product) => {
            await axios.post("/products", product);
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

