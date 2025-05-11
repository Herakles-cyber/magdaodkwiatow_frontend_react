import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserAccountPage from "../pages/UserAccountPage";
import ContactPage from "../pages/ContactPage";
import BlogPage from "../pages/BlogPage";
import TestAddToCart from "../components/TestAddToCart";
import ProductCategory from "../pages/ProductCategory";
import ProductsPage from "../pages/ProductsPage";
import SuccessPage from "../pages/SuccessPage"; // 👈 dodane
import ResetPasswordPage from "../pages/ResetPasswordPage";
// import NewPasswordPage from "@/pages/NewPasswordPage";
import AuthActionHandler from "@/pages/auth/AuthActionHandler";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/produkt/:id" element={<ProductPage />} />
      <Route path="/koszyk" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />{" "}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/konto" element={<UserAccountPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/test-koszyk" element={<TestAddToCart />} />
      <Route path="/produkty/:category" element={<ProductCategory />} />
      <Route path="/produkty" element={<ProductsPage />} />
      <Route path="/success" element={<SuccessPage />} />{" "}
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* <Route path="/reset-hasla" element={<NewPasswordPage />} /> */}
      <Route path="/auth-handler" element={<AuthActionHandler />} />
    </Routes>
  );
}
