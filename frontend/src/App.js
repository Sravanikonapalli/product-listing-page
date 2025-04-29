import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductsPage from "./components/ProductsPage";

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
