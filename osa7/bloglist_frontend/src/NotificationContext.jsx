import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "info": {
      return {
        body: action.notification,
        type: "info"
      }
    }
    case "error": {
      return {
        body: action.notification,
        type: "error"
      }
    }
    case "hide": {
      return {
        body: '',
        type: ''
      }
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, [])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext