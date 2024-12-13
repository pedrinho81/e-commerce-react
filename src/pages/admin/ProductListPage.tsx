import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ProductListAdmin } from "../../features/admin/product/ProductList";


export const AdminProductListPage = withAuthenticationRequired(() => {
  return (<ProductListAdmin />)
});


