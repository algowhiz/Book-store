import { createSlice } from '@reduxjs/toolkit';

const orderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState: {
    status: 'requested',
    orderId: '',
  },
  reducers: {
    setOrderStatus: (state, action) => {
      const { status, orderId } = action.payload;
      state.status = status;
      state.orderId = orderId;
    },
  },
});

export const { setOrderStatus } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
