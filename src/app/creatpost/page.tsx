"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async () => {
    if (postContent || photo) {
      const formData = new FormData();
      formData.append("body", postContent);
      if (photo) {
        formData.append("image", photo);
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }

        const response = await axios.post(
          "https://linked-posts.routemisr.com/posts",
          formData,
          {
            headers: {
              token: token,
            },
          }
        );

        console.log("Post created:", response);
        alert("Post submitted successfully!");
        setPostContent("");
        setPhoto(null);
        setPhotoPreview(null);
      } catch (error) {
        console.error("Error submitting post:", error);
        alert("Failed to submit the post.");
      }
    } else {
      alert("Please add content or a photo before submitting.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create a Post
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCameraIcon />}
        >
          Upload Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>

      {photoPreview && (
        <Box sx={{ marginTop: 2, position: "relative" }}>
          <img
            src={photoPreview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "contain",
            }}
          />
          <Button
            onClick={handleRemovePhoto}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <CancelIcon />
          </Button>
        </Box>
      )}
    </Paper>
  );
}
