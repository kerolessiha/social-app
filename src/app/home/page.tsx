"use client";
import React from "react";
import CreatePost from "../creatpost/page";
import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
export default function Home() {
  return (
    <>
      <Grid container marginY={8} spacing={2}>
        <Grid size={3}></Grid>
        <Grid size={6}>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <CreatePost />
          </Paper>
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </>
  );
}
