import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Signup_lottie from "../../assests/signup_lottie.json";
import Lottie from "lottie-react";
import validator from "validator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking submission status
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    validateField(fieldName, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((field) => {
      const fieldName = field as keyof FormData;
      validateField(fieldName, formData[fieldName]);
    });

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true); 
      try {
        const response = await fetch("http://localhost:8080/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to register user");
        }
        setFormData({ name: "", email: "", password: "" });
        toast.success("User registered successfully");
        navigate("/login");
      } catch (error: any) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred");
        }
      } finally {
        setIsSubmitting(false); 
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateField = (fieldName: keyof FormData, value: string): void => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "email":
        newErrors.email = validator.isEmail(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        newErrors.password = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validatePassword = (value: string): string => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!validator.isStrongPassword(value)) {
      return "Password must contain at least 8 characters, one special character, one capital letter, and one digit";
    }
    return "";
  };

 
  return (
    <Container fluid>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 600 }} onSubmit={handleSubmit}>
            <h1 style={{ color: "blueviolet" }} className="text-center">
              Create account
            </h1>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.name && (
              <Form.Text className="error-message">{errors.name}</Form.Text>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.email && (
              <Form.Text className="error-message">{errors.email}</Form.Text>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div style={{ margin: "10px" }}>
              {errors.password && (
                <Form.Text
                  className="error-message"
                  style={{ color: "blueviolet" }}
                >
                  {errors.password}
                </Form.Text>
              )}
            </div>

            <Button type="submit" style={{ backgroundColor: "blueviolet" }}>
              {isSubmitting ? "Signing you up..." : "Signup"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account ?{" "}
                <a
                  style={{ cursor: "pointer", color: "blueviolet" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </p>
            </div>
          </Form>
          <ToastContainer position="bottom-right" />
        </Col>
        <Col md={5} className="signup_bg">
          <Lottie animationData={Signup_lottie} />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
