"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Paper,
} from "@mui/material";
// import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handlelogin } from "@/lib/authSlice";
import { dispatchType } from "@/lib/store";
import { stateType } from "@/lib/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading/page";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<dispatchType>();
  // const [apiError, setApiError] = useState<string | null>(null);
  const { token, isloading } = useSelector((state: stateType) => state.auth);

  // Formik validation schema
  // const validationSchema = Yup.object({
  //   email: Yup.string().email("Invalid email address").required("Email is required"),
  //   password: Yup.string().required("Password is required"),
  // });

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: { email: string; password: string }) => {
      dispatch(handlelogin(values)) // Dispatch the login action
        .then((res) => {
          if (res.payload.message === "success") {
            toast.success("Welcome back!");
            router.push("/"); // Redirect to home page on success
          } else {
            toast.error("Error: invalid email or password");
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
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
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <Box sx={{ mb: 2 }}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ mb: 2 }}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
            </Box>

            {/* API Error Message
            {apiError && (
              <Typography color="error" variant="body2" align="center" gutterBottom>
                {apiError}
              </Typography>
            )} */}

            {/* Submit Button */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isloading ? <Loading /> : "Login"}
              </Button>
            </Box>
          </form>

          {/* Register link */}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" passHref>
                <Button variant="text" color="primary">
                  Register here
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
