import { api } from "@/api/axios";
import { IResponse } from "@/types/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchData = createAsyncThunk("data/fetchData", async () => {
//   const response = await api.get("/replay");
//   return response.data;
// });

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const coefficient = await api.get<IResponse>("/replay");
      return new Promise<IResponse>((resolve) => {
        setTimeout(() => {
          resolve(coefficient.data);
        }, 2000);
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
type DataSlice = {
  data: IResponse | null;
  loading: boolean;
  error: string | null;
};

const initalState: DataSlice = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        // console.log(action.error, "error");
        state.loading = false;
        state.error = "Ошибка";
      });
  },
});

export default dataSlice.reducer;
