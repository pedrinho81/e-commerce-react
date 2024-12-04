import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const AdminHomePage = withAuthenticationRequired(() => {
  return (
    <div>
      <h1>Admin Area</h1>
      <Link to="products">Products</Link>
    </div>
  );
});
