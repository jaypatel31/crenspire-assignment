import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  status: "idle",
  items: [],
  error: null,
}

export const getUsers = createAsyncThunk(
  "users/getusers",
  async (state, { rejectWithValue }) => {
    try {
      let data = {}
      if(state==="get"){
        data  = await axios.get(
          `http://www.mocky.io/v2/5d889c8a3300002c0ed7da42`,
        )
        data = data.data
      }
      else{
        console.log(state)
        data  = await axios.get(
          `http://www.mocky.io/v2/5d889c8a3300002c0ed7da42`,
        )
        data = data.data.items.filter(item => state.includes(item.type.toString()))
        data = {items:data}
      }
      
      return data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
export const getUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset(state,action){
        state.items = {}
        state.status="idle"
      }
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "loading"
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "succeeded"
      state.items = action.payload.items
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed"
      console.log(action.payload)
      state.error = action.payload.message
    },
  },
})

export const { reset } = getUserSlice.actions
export default getUserSlice.reducer 