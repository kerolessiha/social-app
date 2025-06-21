import axios from "axios";
import { PostInterface } from "./../app/interfaces/PostInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk for fetching posts
export let getAllPosts = createAsyncThunk("post/allPosts",async (limit?: number) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token inside the function
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=${limit ? limit : 50}`,
        {
          headers: {
            token: token, // Pass the token in headers
          },
        }
      );

      // Return only the serializable data
      return response.data; // Ensure only `data` is returned
    } catch (error: any) {
    }
  }
);

export let getSinglePost = createAsyncThunk("post/singlePost",async (id:string) => {
  try {
    // console.log("DEBUG: get single 2");
    const token = localStorage.getItem("token"); 
    const response = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: token, // Pass the token in headers
        },
      }
    );

    // Return only the serializable data
    // console.log("DEBUG response ", response)
    return response; // Ensure only `data` is returned
  } catch (error: any) {
  }
}
);

// Define the initial state
let initialState: { allPosts: PostInterface[] | null; isLoading: boolean; error: string | null; singlePost:PostInterface | null} = {
  allPosts: null,
  isLoading: false,
  error: null, // Added `error` to handle rejection errors
  singlePost:null
};

// Define the slice
let postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload.posts; // Update state with fetched posts
        state.error = null; // Clear previous errors
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error while loading
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Store the error message
      });
      builder
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singlePost = action.payload?.data.post; // Update state with fetched posts
        state.error = null; // Clear previous errors
        
      })
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error while loading
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Store the error message
      });
  },
});

// Export the reducer
export const postReducer = postSlice.reducer;
