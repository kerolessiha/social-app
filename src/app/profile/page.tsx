"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { getUserLogged, uploadUserPhoto } from "@/lib/profileSlice";
import { dispatchType, stateType } from "@/lib/store";

export default function Profile() {
  const dispatch = useDispatch<dispatchType>();
  const { user, isLoading, error } = useSelector(
    (state: stateType) => state.profile
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getUserLogged());
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadUserPhoto(selectedFile));
      setSelectedFile(null); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={10}
        sx={{
          p: 4,
          mt: 10,
          borderRadius: "8px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {/* Display User Profile Information */}
        {!isLoading && user && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar
                alt={user.name}
                src={user.photo || "/default-avatar.png"}
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>

            {/* Upload Photo Section */}
            <Box sx={{ mt: 3 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <Button variant="outlined" component="span" sx={{ mr: 2 }}>
                  Select Photo
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Upload Photo
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
