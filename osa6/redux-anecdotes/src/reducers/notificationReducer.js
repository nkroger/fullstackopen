import { createSlice } from '@reduxjs/toolkit'

const notifyDuration = 5000

const initialState = {
  message: "Notification comes here",
  visible: false,
  id: 0
}

// basic counter to make sure an earlier timeout does not hide newer notifications
let nextId = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return {id: action.payload.id, visible: true, message: action.payload.message}
    },
    setHidden(state, action) {
      const id = action.payload
      if (id === state.id) {
        return {...state, visible: false}
      } else return state
    }
  }
})

export const setNotification = (message, duration = 5) => {
  return async dispatch => {
    const id = nextId
    nextId += 1;
    dispatch(setMessage({ id, message }))
    setTimeout( () => {
      dispatch(setHidden(id))
    }, duration * 1000 )
  }
}

export const { setMessage, setHidden } = notificationSlice.actions
export default notificationSlice.reducer
