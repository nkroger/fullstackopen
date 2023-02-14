import { createSlice } from "@reduxjs/toolkit"

let successId
let errorId

const notifySlice = createSlice({
  name: "notification",
  initialState: {
    success: null,
    error: null,
  },
  reducers: {
    setSuccess(state, action) {
      state.success = action.payload
    },
    clearSuccess(state) {
      state.success = null
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const setSuccessMsg = (message, duration = 5) => {
  return async (dispatch) => {
    if (successId) {
      clearTimeout(successId)
    }
    dispatch(setSuccess(message))
    successId = setTimeout(() => {
      dispatch(clearSuccess())
    }, duration * 1000)
  }
}

export const setErrorMsg = (message, duration = 5) => {
  return async (dispatch) => {
    if (errorId) {
      clearTimeout(errorId)
    }
    dispatch(setError(message))
    errorId = setTimeout(() => {
      dispatch(clearError())
    }, duration * 1000)
  }
}

export const { setSuccess, clearSuccess, setError, clearError } =
  notifySlice.actions
export default notifySlice.reducer
