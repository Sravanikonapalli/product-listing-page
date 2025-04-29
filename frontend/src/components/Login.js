import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../styles/login.css"; 
class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    redirect: false,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const res = await fetch("https://product-listing-page-aszv.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      this.setState({ redirect: true });
    } else {
      this.setState({ message: data.error || "Login failed" });
    }
  };

  render() {
    const { message, redirect } = this.state;
    if (redirect) return <Navigate to="/products" />;

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    );
  }
}

export default Login;
