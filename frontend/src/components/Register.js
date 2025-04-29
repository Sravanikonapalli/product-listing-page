import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../styles/login.css"; 

class Register extends Component {
  state = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    message: "",
    redirect: false,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = this.state;
    const res = await fetch("https://product-listing-page-aszv.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password }),
    });
  
    const data = await res.json();
    
    if (data.message === "User registered successfully") {
      this.setState({ redirect: true });
    } else {
      this.setState({ message: data.error || "Registration failed" });
    }
  };
  

  render() {
    const {message,redirect}=this.state
    if (redirect) return <Navigate to="/login" />;

    return (
      <div className="login-container">
        <h2>Register</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input name="name" placeholder="Name" onChange={this.handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={this.handleChange} required />
          <input name="mobile" placeholder="Mobile" onChange={this.handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange} required />
          <button type="submit">Register</button>
          <p>Already have an account <a href="/login">Login</a></p>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    );
  }
}

export default Register;
