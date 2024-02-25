import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "../Assets/CSS/AdminLogin.css";
import adminApis from "../apis/AdminApis";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAdmin();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (successMessage === "Log In Successfull.") {
      setTimeout(() => {
        navigate("/admin/dashboard/");
      }, 1000);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminApis.login(email, password);

      if (response.status === 200) {
        localStorage.setItem("adminId", response.data.admin._id);
        localStorage.setItem("adminName", response.data.admin.userName);
        localStorage.setItem("isLoggedAdminIn", true);

        const { _id, userName, email } = response.data.admin;
        setAdmin({ id: _id, userName, email });

        setSuccessMessage("Log In Successfull.");
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed.");
      setSuccessMessage("");
    }
  };
  return (
    <>
      <div className="bg bg-opacity-25">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="border rounded-3 p-4 bg-light shadow-lg">
              <form method="POST" onSubmit={handleSubmit}>
                <h1
                  className="text-center mb-3"
                  style={{ fontFamily: "josheph" }}
                >
                  ADMIN LOG-IN
                </h1>

                {/* error & success msg */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {successMessage && (
                  <p className="alert alert-success">{successMessage}</p>
                )}

                <label htmlFor="email" className="input-label mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="password" className="input-label mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-3"
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-end">
                  <input
                    id="showPassword"
                    type="checkbox"
                    className="form-check-input"
                    onClick={togglePasswordVisibility}
                  />
                  <label
                    htmlFor="showPassword"
                    className="input-label mb-2 ms-1"
                  >
                    Show Password
                  </label>
                </div>

                <button className="btn mt-1 w-100" id="logIn" type="submit">
                  Log In
                </button>

                <p className="hrline text-center my-3">OR</p>

                <div className="text-center mb-3">
                  <Link className="btn forgot text-primary" to={"/admin/"}>
                    <u> Terms & Conditions</u>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
