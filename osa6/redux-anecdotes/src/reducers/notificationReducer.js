import { createSlice } from '@reduxjs/toolkit'

let notificationId

const initialState = {
  message: 'Notification comes here',
  visible: false,
  id: 0
}

// basic counter to make sure an earlier timeout does not hide newer notifications
//let nextId = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { visible: true, message: action.payload.message }
    },
    setHidden(state) {
      //const id = action.payload
      //if (id === state.id) {
      return { ...state, visible: false }
      //} else return state
    }
  }
})

export const setNotification = (message, duration = 5) => {
  return async dispatch => {
    //const id = nextId
    //nextId += 1;
    if (notificationId) {
      console.log('clearing timeout ' + notificationId)
      clearTimeout(notificationId)
    }
    dispatch(setMessage({ message }))
    notificationId = setTimeout( () => {
      dispatch(setHidden())
    }, duration * 1000 )
  }
}

export const { setMessage, setHidden } = notificationSlice.actions
export default notificationSlice.reducer
