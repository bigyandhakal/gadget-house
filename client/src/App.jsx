import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import { CheckoutPage } from "./components/CheckoutStatus";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import NavBar from "./layouts/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Admin Routes
import Dashboard from "./pages/admin/Products";
import AdminProducts from "./pages/admin/Products";

import { PrivateRoute } from "./components/Routes";

const adminRoutes = [
  { path: "/dashboard", component: <Dashboard />, role: "admin" },
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
];

export default function App() {
  return (
    <>
      <div className="d-flex flex-column h-100vh">
        <BrowserRouter>
          <NavBar />
          <main className="flex-shrink-0 vh-100">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetail/>}/>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/checkout/failed"
                  element={<CheckoutPage
                    type="failed"
                    msgHeader="Transaction Failed"
                    msg="Something went wrong. Try again"
                  />}
                />
                <Route path="/checkout/success" element={<CheckoutPage />} />
                {adminRoutes
                  ? adminRoutes.map((route, index) => {
                      return (
                        <Route
                          key={index}
                          path={`/admin${route?.path}`}
                          element={
                            <PrivateRoute role={route?.role ?? ""}>
                              {route?.component}
                            </PrivateRoute>
                          }
                        />
                      );
                    })
                  : null}
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}
