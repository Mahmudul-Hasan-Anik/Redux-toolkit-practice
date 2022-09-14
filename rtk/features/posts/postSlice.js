const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios").default;

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const fatchPost = createAsyncThunk("post/fatchPost", async (postID) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postID}`
  );
  const posts = response.data;
  //   console.log(posts.title.split(" "));
  return posts;
});

const postSlice = createSlice({
  name: "post",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fatchPost.pending, (state, action) => {
      (state.loading = true), (state.error = "");
    });
    builder.addCase(fatchPost.fulfilled, (state, action) => {
      (state.loading = false),
        (state.posts = action.payload),
        (state.error = "");
    });
    builder.addCase(fatchPost.rejected, (state, action) => {
      (state.loading = false),
        (state.posts = []),
        (state.error = action.error.message);
    });
  },
});

module.exports = postSlice.reducer;
module.exports.fatchPost = fatchPost;
