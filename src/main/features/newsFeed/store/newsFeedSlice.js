import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
};

const newsFeedSlice = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    toggleLike: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likedByCurrentUser = !post.likedByCurrentUser;
        post.likes += post.likedByCurrentUser ? 1 : -1;
      }
    },
    /* Reaction picker — sets or toggles off a named reaction on a post.
       Switching reactions keeps the likes count unchanged.
       Removing the same reaction decrements likes and clears likedByCurrentUser. */
    setReaction: (state, action) => {
      const { postId, reactionType } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return;

      if (post.selectedReaction === reactionType) {
        /* Same reaction clicked again → remove it */
        post.selectedReaction = null;
        post.likedByCurrentUser = false;
        post.likes = Math.max(0, post.likes - 1);
      } else {
        if (!post.likedByCurrentUser) {
          /* First reaction on this post → increment likes */
          post.likes += 1;
          post.likedByCurrentUser = true;
        }
        /* Set or change reaction (likes count stays the same when switching) */
        post.selectedReaction = reactionType;
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
  },
});

export const { setPosts, addPost, toggleLike, setReaction, addComment } =
  newsFeedSlice.actions;

export default newsFeedSlice.reducer;
