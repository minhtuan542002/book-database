import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>Email: </label>
        <input type="email" />
        <br />
        <label>Password: </label>
        <input type="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
