import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch logged-in user data
export const getUserLogged = createAsyncThunk('profile/getUserLogged', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
    headers: { token },
  });
  return response.data.user; // Assuming API response contains { user }
});

// Upload user photo
export const uploadUserPhoto = createAsyncThunk(
  'profile/uploadUserPhoto',
  async (file: File) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('photo', file);

    const response = await axios.put(
      'https://linked-posts.routemisr.com/users/upload-photo',
      formData,
      {
        headers: { token },
      }
    );

    return response.data.photo; // Assuming API response contains the new photo URL
  }
);

// Initial state
interface ProfileState {
  user: {
    name: string;
    email: string;
    photo: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogged.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserLogged.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserLogged.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to fetch user data';
      })
      .addCase(uploadUserPhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.photo = action.payload; // Update photo URL
        }
      })
      .addCase(uploadUserPhoto.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to upload photo';
      });
  },
});

export const profileReducer = profileSlice.reducer;
