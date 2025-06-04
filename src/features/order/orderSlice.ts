import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  invoiceNo: string;
  date: string;
  totalAmount: number;
  status?: string;
  items: OrderItem[];
  email: string;
}

interface OrderState {
  history: Order[];
}

const initialState: OrderState = {
  history: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.history.push(action.payload);
    },
    clearOrders: (state) => {
      state.history = [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
