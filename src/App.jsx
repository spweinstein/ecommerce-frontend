import { useContext } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "./contexts/UserContext.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ShopCreateForm from "./components/Shops/ShopCreateForm/ShopCreateForm.jsx";
import ShopDetails from "./components/Shops/ShopDetails/ShopDetails.jsx";
import ShopEditForm from "./components/Shops/ShopEditForm/ShopEditForm.jsx";
import ShopGrid from "./components/Shops/ShopGrid/ShopGrid.jsx";
import ProductGrid from "./components/Products/ProductGrid/ProductGrid.jsx";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails.jsx";
import ProductCreateForm from "./components/Products/ProductCreateForm/ProductCreateForm.jsx";
import ProductEditForm from "./components/Products/ProductEditForm/ProductEditForm.jsx";
import CartPage from "./components/Cart/CartPage.jsx";
import OrderTable from "./components/Orders/OrderTable.jsx";
import Unauthorized from "./components/Unauthorized/Unauthorized.jsx";
import UserOrderDetails from "./components/Orders/UserOrderDetails/UserOrderDetails.jsx";
import ShopOrderDetails from "./components/Orders/ShopOrderDetails/ShopOrderDetails.jsx";
import CheckoutPage from "./components/Checkout/CheckoutPage.jsx";

import "./App.css";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        <Route path="/shops" element={<ShopGrid />} />
        <Route path="/shops/new" element={<ShopCreateForm />} />
        <Route path="/shops/:shopId" element={<ShopDetails user={user} />} />
        <Route path="/shops/:shopId/orders" element={<OrderTable />} />

        <Route path="/shops/:shopId/edit" element={<ShopEditForm />} />

        <Route path="/products" element={<ProductGrid />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails user={user} />}
        />
        <Route path="/products/new" element={<ProductCreateForm />} />
        <Route path="/products/:productId/edit" element={<ProductEditForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderTable />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/orders/:orderId" element={<UserOrderDetails />} />
        <Route
          path="/shops/:shopId/orders/:orderId"
          element={<ShopOrderDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
