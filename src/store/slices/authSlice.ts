import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Child } from '../../types';

interface AuthState {
  user: User | null;
  children: Child[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Load persisted auth state from localStorage
const persistedAuth = (() => {
  try {
    const data = localStorage.getItem('auth');
    if (data) return JSON.parse(data);
  } catch {}
  return null;
})();

const initialState: AuthState = {
  user: persistedAuth?.user || null,
  children: [],
  isAuthenticated: persistedAuth?.isAuthenticated || false,
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
      // Persist to localStorage
      localStorage.setItem('auth', JSON.stringify({ user: state.user, isAuthenticated: true }));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
    logout: (state) => {
      state.user = null;
      state.children = [];
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('auth');
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