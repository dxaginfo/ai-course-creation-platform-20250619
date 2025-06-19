import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  drawerOpen: boolean;
  notification: {
    open: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  };
}

const initialState: UiState = {
  drawerOpen: false,
  notification: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'info' | 'warning' | 'error' }>) => {
      state.notification.open = true;
      state.notification.message = action.payload.message;
      state.notification.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
  },
});

export const { setDrawerOpen, showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;
