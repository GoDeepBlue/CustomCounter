// This is the wrapper for a redux app and it automatically takes 
//    care of a lot of setup that was required in legacy Redux
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Automatically calls an internal function called combineCounterReducer which
    //    combines all reducer functions in to a single reducer.
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch