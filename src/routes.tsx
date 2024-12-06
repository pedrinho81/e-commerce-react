import { RouteObject } from "react-router-dom";
import { App } from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.tsx";
import { AdminHomePage } from "./pages/admin/AdminHomePage.tsx";
import { AdminLayout } from "./pages/admin/AdminLayout.tsx";
import { EditProductPage } from "./pages/admin/EditProductPage.tsx";
import { NewProductPage } from "./pages/admin/NewProductPage.tsx";
import { AdminProductListPage } from "./pages/admin/ProductListPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />,  },
      { path: "products/:id", element: <ProductDetailPage /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "products", element: <AdminProductListPage /> },
          { path: "products/new", element: <NewProductPage /> },
          { path: "products/:id/edit", element: <EditProductPage /> },
        ],
      },
    ],
  },
];

export default routes;
