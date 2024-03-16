import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import validator from "validator";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    let newErrors: { [key: string]: string } = {};

    // Email validation
    if (!validator.isEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    } else {
      newErrors.email = "";
    }

    if (formData.pass.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 2) {
      try {
        let response = await axios.post("https://worldrefbackend-cel069hya-blackcode1996.vercel.app/user/login", formData);
        toast.success("Login successful");
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
        localStorage.setItem("token",JSON.stringify(response.data.token));
        navigate("/");
      } catch (error: any) {
        toast.error(`Login failed: ${error.response.data.message}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <Form
              style={{ width: "80%", maxWidth: 600 }}
              onSubmit={handleSubmit}
            >
              <h1 style={{ color: "blueviolet" }} className="text-center">
                Account login
              </h1>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Form.Text className="error-message">
                    {errors.email}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="pass"
                  value={formData.pass}
                  onChange={handleChange}
                />
                {errors.password && (
                  <Form.Text className="error-message">
                    {errors.password}
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                type="submit"
                style={{ backgroundColor: "blueviolet" }}
                disabled={isLoading}
              >
                {isLoading ? "Logging you in..." : "Login in"}
              </Button>
            </Form>
            <ToastContainer position="bottom-right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
