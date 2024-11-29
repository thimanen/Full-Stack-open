import { createContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case "show": {
      return action.notification
    }
    case "hide": {
      return ''
    }
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext