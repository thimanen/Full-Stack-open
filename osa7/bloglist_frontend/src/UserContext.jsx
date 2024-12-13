import { createContext, useReducer } from "react"

const userReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return action.user
    }
    case "logout": {
      return null
    }
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
