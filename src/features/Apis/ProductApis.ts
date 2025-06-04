import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  Product} from "../../types/Product";

const BASE_URL = "http://localhost:3002/products"; // <-- match your controller route

// ✅ Fetch all products
export const fetchProductsAPI = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data; // Product[]
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

// ✅ Get a single product by ID
export const getProductByIdAPI = createAsyncThunk(
  "products/getById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data; // Product
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch product");
    }
  }
);

// ✅ Add a new product (with image upload)
export const addProductAPI = createAsyncThunk(
  "products/add",
  async (productData: Product, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price.toString());
      formData.append("cat", productData.cat);
      formData.append("brand", productData.brand);
      formData.append("color", productData.color);
      formData.append("pimg", productData.pimg); // File object

      const response = await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Product
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add product");
    }
  }
);

// ✅ Update a product by ID
export const updateProductAPI = createAsyncThunk(
  "products/update",
  async (
    { id, updatedData }: { id: string; updatedData: Partial<Product> },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
      return response.data; // Updated Product
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

// ✅ Delete a product by ID
export const deleteProductAPI = createAsyncThunk(
  "products/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id; // Returning deleted product ID
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);
