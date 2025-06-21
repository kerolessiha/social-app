"use client";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Post from "./posts/page";
import React, { useEffect } from "react";
import { getAllPosts } from "@/lib/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, stateType } from "@/lib/store";
import { PostInterface } from "./interfaces/PostInterface";
import CreatePost from "./creatpost/page";
import Loading from "./loading/page";


export default function Home() {
  let { allPosts, isLoading } = useSelector((state: stateType) => state.post);
  let dispatch = useDispatch<dispatchType>();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      <Grid container marginY={8} spacing={2}>
        <Grid size={3}></Grid>
        <Grid size={6}>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            {/* Render CreatePost */}
            <CreatePost />
          </Paper>
          <Paper>
            {allPosts ? (
              allPosts.map((postObj: PostInterface) => (
                <Post postdata={postObj} key={postObj._id} />
              ))
            ) : (
              <Loading />
            )}
          </Paper>
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </>
  );
}
