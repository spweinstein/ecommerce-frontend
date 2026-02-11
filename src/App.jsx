import { useContext } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "./contexts/UserContext.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

import ShopList from "./components/Shops/ShopList/ShopList.jsx";
import ShopCreateForm from "./components/Shops/ShopCreateForm/ShopCreateForm.jsx";
import ShopDetails from "./components/Shops/ShopDetails/ShopDetails.jsx";
import ShopEditForm from "./components/Shops/ShopEditForm/ShopEditForm.jsx";

import ProductList from "./components/Products/ProductList/ProductList.jsx";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails.jsx";
import ProductCreateForm from "./components/Products/ProductCreateForm/ProductCreateForm.jsx";
import ProductEditForm from "./components/Products/ProductEditForm/ProductEditForm.jsx";

import * as shopService from "./services/shopService.js";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        <Route path="/shops" element={<ShopList />} />
        <Route path="/shops/new" element={<ShopCreateForm />} />
        <Route path="/shops/:shopId" element={<ShopDetails user={user} />} />
        <Route path="/shops/:shopId/edit" element={<ShopEditForm />} />

        <Route path="/products" element={<ProductList />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails user={user} />}
        />
        <Route path="/products/new" element={<ProductCreateForm />} />
        <Route path="/products/:productId/edit" element={<ProductEditForm />} />
      </Routes>
    </>
  );
};

export default App;
