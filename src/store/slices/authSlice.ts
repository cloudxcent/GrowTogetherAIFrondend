import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Child } from '../../types';

interface AuthState {
  user: User | null;
  children: Child[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  children: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.children = [];
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setChildren: (state, action: PayloadAction<Child[]>) => {
      state.children = action.payload;
    },
    addChild: (state, action: PayloadAction<Child>) => {
      state.children.push(action.payload);
    },
    updateChild: (state, action: PayloadAction<Child>) => {
      const index = state.children.findIndex(child => child.id === action.payload.id);
      if (index !== -1) {
        state.children[index] = action.payload;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setChildren,
  addChild,
  updateChild,
} = authSlice.actions;

export default authSlice.reducer;