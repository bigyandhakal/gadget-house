import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NavBar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

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
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
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
