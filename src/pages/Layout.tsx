import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="prose max-w-screen-xl mx-auto p-4 ">
        <Outlet />
        <Toaster />
      </main>
    </>
  );
};

export default Layout;
