"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { RegisterValues } from "@/app/interfaces/Userinterface";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      console.log("Registration successful:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        my: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Sign Up Now:
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              rePassword: "",
              dateOfBirth: "",
              gender: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
            }: FormikProps<any>) => (
              <Form>
                {/* Name */}
                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="name"
                    label="Enter Your Name"
                    type="name"
                    fullWidth
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                  />
                </Box>

                {/* Email */}
                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="email"
                    label="Enter Your Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="password"
                    label="Enter Your Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="rePassword"
                    label="Confirm Your Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.rePassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rePassword && Boolean(errors.rePassword)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="dateOfBirth"
                    label="Enter Your Birthday"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TextField
                    name="gender"
                    label="Gender"
                    type="gender"
                    select
                    fullWidth
                    variant="outlined"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && Boolean(errors.gender)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Sign Up"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" passHref>
                <Button variant="text" color="primary">
                  Log in
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
